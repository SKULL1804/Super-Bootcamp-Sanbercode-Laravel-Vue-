<?php

namespace App\Http\Controllers\Api;

use App\Models\Book;
use App\Models\Borrow;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;

class BorrowsController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(['auth:api', 'isOwner'], only: ['index']),
        ];
    }

    public function index(): JsonResponse
    {
        $borrows = Borrow::with('user', 'book')->get();

        return response()->json([
            "message" => "Data berhasil ditampilkan",
            "data" => $borrows
        ], 200);
    }

    public function show($id): JsonResponse
    {
        $borrows = Borrow::where('user_id', $id)->with('book')->get();

        return response()->json([
            "message" => "Data peminjaman berhasil ditampilkan",
            "data" => $borrows
        ], 200);
    }


    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'load_date' => 'required|date',
            'borrow_date' => 'required|date',
            'book_id' => 'required|exists:books,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = auth()->user();
        $book = Book::find($request['book_id']);
        if ($book->stok <= 0) {
            return response()->json(['error' => 'Stok buku tidak tersedia.'], 422);
        }

        $book->stok -= 1;
        $book->save();


        $borrows = Borrow::updateOrCreate(
            [
                'user_id' => $user->id

            ],
            [
                'load_date' => $request['load_date'],
                'borrow_date' => $request['borrow_date'],
                'book_id' => $request['book_id'],
                'user_id' => $user->id,
                'returned' => false
            ]
        );

        return response()->json([
            "message" => "Pemijaman berhasil dibuat/diubah",
            "data" => $borrows
        ], 201);
    }

    public function returnBook($id): JsonResponse
    {
        $borrows = Borrow::find($id);
        if (!$borrows) {
            return response()->json(['error' => 'Pinjaman tidak ditemukan.'], 404);
        }

        if ($borrows->returned) {
            return response()->json(['error' => 'Buku sudah dikembalikan.'], 400);
        }

        $book = Book::find($borrows->book_id);
        if (!$book) {
            return response()->json(['error' => 'Buku tidak ditemukan.'], 404);
        }

        $borrows->returned = true;
        $borrows->save();

        $book->stok += 1;
        $book->save();

        return response()->json([
            'message' => 'Buku berhasil dikembalikan.',
            'data' => $borrows
        ], 200);
    }
}