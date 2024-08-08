<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\BookRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class BookController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(['auth:api', 'isOwner'], only: ['store', 'update', 'destroy']),
        ];
    }

    public function index(Request $request): JsonResponse
    {
        $category = $request->query('category');
        if ($category) {
            $categoryModel = Category::where('name', $category)->first();
            $book = Book::where('category_id', $categoryModel->id)->get();
        } else {
            $book = Book::orderBy('created_at', 'desc')->get();
        }

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $book
        ]);
    }

    public function store(BookRequest $request): JsonResponse
    {
        $data = $request->validated();

        // $imagePath  = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();

        // $data['image'] = $imagePath;

        if ($request->hasFile('image')) {

            $imageName = time() . '.' . $request->image->extension();

            $request->image->storeAs('public/img/cover', $imageName);

            $url = url('storage/img/cover/' . $imageName);

            $data['image'] = $url;
        }

        $book = Book::create($data);

        return response()->json([
            "message" => "Data berhasil ditambahkan",
            "data" => $book,
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $book = Book::with('category', 'listBorrows.user')->find($id);

        if (!$book) {
            return response()->json([
                "error" => "Buku tidak ditemukan"
            ], 404);
        }

        return response()->json([
            "message" => "Data berhasil ditampilkan",
            "data" => $book,
        ], 200);
    }

    public function update(BookRequest $request, $id): JsonResponse
    {
        $data = $request->validated();

        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        if ($request->hasFile('image')) {

            if ($book->image) {

                $oldImagePath = str_replace('/storage', 'public', $book->image);

                Storage::delete($oldImagePath);
            }

            $imageName = time() . '.' . $request->image->extension();

            $request->image->storeAs('public/img/cover', $imageName);

            $url = url('storage/img/cover/' . $imageName);

            $data['image'] = $url;
        }

        $book->update($data);

        return response()->json([
            "message" => "Data berhasil diupdate",
            "data" => $book,
        ]);
    }

    public function destroy(string $id)
    {
        $book = Book::find($id);

        if (!$book) {
            return response()->json([
                "error" => "Buku tidak di temukan",
            ], 404);
        }

        if ($book->image) {

            $imagePath = str_replace(url('storage') . '/', '', $book->image);

            if (Storage::exists('public/' . $imagePath)) {
                Storage::delete('public/' . $imagePath);
            }
        }
        $book->delete();

        return response()->json([
            "message" => "Data berhasil dihapus",
        ], 200);
    }
}