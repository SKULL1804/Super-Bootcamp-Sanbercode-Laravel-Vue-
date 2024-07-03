<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReviewRequest $request)
    {
        $user = auth()->user();

        $review = Review::updateOrCreate(
            ['user_id' => $user->id],
            [
                'critic' => $request['critic'],
                'rating' => $request['rating'],
                'movie_id' => $request['movie_id'],
                'user_id' => $user->id
            ]
        );

        return response()->json([
            "message" => "Review berhasil dibuat",
            "data" => $review
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}