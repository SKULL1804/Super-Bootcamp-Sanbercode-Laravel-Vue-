<?php

namespace App\Http\Controllers\Api;

use App\Models\Cast;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CastRequest;
use Illuminate\Http\JsonResponse;

class CastController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse
    {
        $cast = Cast::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $cast
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CastRequest $request) : JsonResponse
    {
        $cast = Cast::create($request->all());

        return response()->json([
            "message" => "success",
            "body" => $cast
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $cast = Cast::find($id);

        if (!$cast) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil di tampilkan : $id",
            "data" => $cast
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CastRequest $request, string $id) : JsonResponse
    {
        $cast = Cast::find($id);

        if (!$cast) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $cast->fill($request->only(['name', 'age', 'biodata']));

        $cast->save();

        return response()->json([
            "message" => "update data berhasil di tampilkan : $id",
            "body" => $cast
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cast = Cast::find($id);

        if (!$cast) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $cast->delete();

        return response()->json([
            "message" => "data id : $id berhasil terhapus",
        ], 200);
    }
}