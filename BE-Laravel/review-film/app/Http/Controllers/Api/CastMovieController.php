<?php

namespace App\Http\Controllers\Api;

use App\Models\CastMovie;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CastMovieRequest;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class CastMovieController extends Controller implements HasMiddleware
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
            $castMovie = CastMovie::all();

            return response()->json([
                "message" => "data berhasil ditampilkan",
                "data" => $castMovie
            ]);
        }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CastMovieRequest $request) : JsonResponse
    {
        $castMovie = CastMovie::create($request->all());

        return response()->json([
            "message" => "Yeah berhasil ditambahkan",
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $castMovie = CastMovie::with('movie', 'cast')->find($id);

        if (!$castMovie) {
            return response()->json([
                "error" => "id tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil ditampilkan : $id",
            "data" => $castMovie,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CastMovieRequest $request, string $id)
    {
        $castMovie = CastMovie::find($id);

        if (!$castMovie) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $castMovie->fill($request->only(['name', 'cast_id', 'movie-id']));

        $castMovie->save();

        return response()->json([
            "message" => "update data berhasil di tampilkan : $id",
            "body" => $castMovie
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $castMovie = CastMovie::find($id);

        if (!$castMovie) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $castMovie->delete();

        return response()->json([
            "message" => "Hore berhasil ke hapus",
        ], 200);
    }
}