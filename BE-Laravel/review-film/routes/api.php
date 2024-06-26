<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CastController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\MovieController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/movie', [MovieController::class, 'store']);
    Route::apiResource('cast', CastController::class);
    Route::apiResource('genre', GenreController::class);
});
