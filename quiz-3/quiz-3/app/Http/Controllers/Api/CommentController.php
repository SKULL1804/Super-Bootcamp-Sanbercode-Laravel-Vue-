<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comment = Comment::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $comment
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
        $data = $request->validated();

        $comment = Comment::create($data);

        return response()->json([
            "message" => "success",
            "body" => $comment,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        return response()->json([
            "message" => "detail data berhasil di tampilkan : $id",
            "data" => $comment
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommentRequest $request, string $id)
    {
        $data = $request->validated();

        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $comment->update($data);

        return response()->json([
            "message" => "update data berhasil ditampilkan : $id",
            "body" => $comment,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $comment->delete();

        return response()->json([
            "message" => "data id : $id berhasil terhapus",
        ], 200);
    }
}