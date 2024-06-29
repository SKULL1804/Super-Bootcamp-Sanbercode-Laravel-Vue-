<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $post = Post::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $post
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        $data = $request->validated();

        $post = Post::create($data);

        return response()->json([
            "message" => "success",
            "body" => $post,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil di tampilkan : $id",
            "data" => $post
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id)
    {
        $data = $request->validated();

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $post->update($data);

        return response()->json([
            "message" => "update data berhasil ditampilkan : $id",
            "body" => $post,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $post->delete();

        return response()->json([
            "message" => "data id : $id berhasil terhapus",
        ], 200);
    }
}