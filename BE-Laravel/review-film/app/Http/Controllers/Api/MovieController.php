<?php

namespace App\Http\Controllers\Api;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Api\MovieRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class MovieController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(['auth:api', 'isAdmin'], only: ['store', 'update', 'destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        $movie = Movie::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $movie
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MovieRequest $request) : JsonResponse
    {
        $data = $request->validated();

        // Jika gambar diinput
        if ($request->hasFile('poster')) {

            // unique name pada gambar
            $imageName = time().'.'.$request->poster->extension();

            // simpan gambar ke storage
            $path = $request->poster->storeAs('public/img/poster', $imageName);

            // Mendapatkan URL dari path yang disimpan
            $url = Storage::url($path);

            // Simpan path poster dalam data
            $data['poster'] = $url;
        }

        // Buat movie baru (asumsi Anda memiliki model Movie)
        $movie = Movie::create($data);

        return response()->json([
            "message" => "success",
            "body" => $movie,
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $movie = Movie::with('genre', 'listCast', 'listReview')->find($id);

        if (!$movie) {
            return response()->json([
                "error" => "id tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil ditampilkan : $id",
            "data" => $movie,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MovieRequest $request, string $id) : JsonResponse
    {
        $data = $request->validated();

        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        if ($request->hasFile('poster')) {

            // Hapus gambar yang lama jika ada
            if ($movie->poster) {
                // Mendapatkan path dari poster lama
                $oldPosterPath = str_replace('/storage', 'public', $movie->poster);

                // Hapus file poster lama dari storage
                Storage::delete($oldPosterPath);
            }

            // unique name pada gambar
            $imageName = time().'.'.$request->poster->extension();

            // simpan gambar ke storage
            $path = $request->poster->storeAs('public/img/poster', $imageName);

            // Mendapatkan URL dari path yang disimpan
            $url = Storage::url($path);

            // Simpan path poster dalam data
            $data['poster'] = $url;

        }

        $movie->update($data);

        return response()->json([
            "message" => "update data berhasil ditampilkan : $id",
            "body" => $movie,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie =  Movie::find($id);

        if (!$movie) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        // Hapus gambar yang lama jika ada
        if ($movie->poster) {
            // Mendapatkan path dari poster lama
            $oldPosterPath = str_replace('/storage', 'public', $movie->poster);

            // Hapus file poster lama dari storage
            Storage::delete($oldPosterPath);
        }

        $movie->delete();

        return response()->json([
            "message" => "data id : $id berhasil terhapus",
        ], 200);

    }
}