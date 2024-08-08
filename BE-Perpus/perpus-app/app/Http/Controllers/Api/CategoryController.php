<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CategoryController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(['auth:api', 'isOwner'], only: ['store', 'update', 'destroy']),
        ];
    }

    public function index() : JsonResponse {
        $category = Category::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $category
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::create($request->all());

        return response()->json([
            "message" => "success",
            "data" => $category
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $category = Category::with('listBook')->find($id);

        if (!$category) {
            return response()->json([
                "error" => "Category tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "message" => "Detail berhasil ditampilkan",
            "data" => $category,
        ], 200);
    }


    public function update(Request $request, $id) : JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                "error" => "Category tidak di temukan",
            ], 404);
        }

        $category->fill($request->only(['name']));

        $category->save();

        return response()->json([
            "message" => "Update data berhasil",
            "data" => $category
        ], 201);
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                "error" => "Category tidak di temukan",
            ], 404);
        }

        $category->delete();

        return response()->json([
            "message" => "berhasil terhapus",
        ], 200);
    }
}