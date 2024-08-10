<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\BookRequest;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class BookController extends Controller implements HasMiddleware
{
    protected $cloudinary;

    public static function middleware(): array
    {
        return [
            new Middleware(['auth:api', 'isOwner'], only: ['store', 'update', 'destroy']),
        ];
    }

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
        ]);
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

        $imagePath = Cloudinary::upload($request->file('image')->getRealPath(), [
            'folder' => 'cover',
        ])->getSecurePath();

        $data['image'] = $imagePath;

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
                $oldImagePublicId = $this->getPublicIdFromUrl($book->image);
                Cloudinary::destroy($oldImagePublicId);
            }

            $image = $request->file('image');
            $upload = Cloudinary::upload($image->getRealPath(), [
                    'folder' => 'cover',
                ])->getSecurePath();
            $data['image'] = $upload;
        }


        $book->update($data);

        return response()->json([
            "message" => "Data berhasil diupdate",
            "data" => $book,
        ]);
    }


    private function getPublicIdFromUrl($url)
    {
        $parts = parse_url($url);
        $path = $parts['path'] ?? '';
        $path = ltrim($path, '/');
        $segments = explode('/', $path);
        $filename = array_pop($segments);
        $publicId = pathinfo($filename, PATHINFO_FILENAME);
        return $publicId;
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
            $oldImagePublicId = $this->getPublicIdFromUrl($book->image);
            Cloudinary::destroy($oldImagePublicId);
        }

        $book->delete();

        return response()->json([
            "message" => "Data berhasil dihapus",
        ], 200);
    }
}