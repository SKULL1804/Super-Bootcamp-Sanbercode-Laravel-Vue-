<?php

namespace App\Http\Controllers\Api;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\GenreRequest;
use App\Http\Controllers\Controller;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        $genre = Genre::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $genre
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(GenreRequest $request) : JsonResponse
    {
        $genre = Genre::create($request->all());

        return response()->json([
            "message" => "success",
            "body" => $genre
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil di tampilkan : $id",
            "data" => $genre
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(GenreRequest $request, string $id) : JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $genre->fill($request->only(['name']));

        $genre->save();

        return response()->json([
            "message" => "update data berhasil di tampilkan : $id",
            "body" => $genre
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $genre->delete();

        return response()->json([
            "message" => "data id : $id berhasil terhapus",
        ], 200);
    }
}