<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BorrowsController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\CategoryController;

Route::prefix('v1')->group(function () {
    Route::apiResource('role', RoleController::class);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('borrow', BorrowsController::class);
    Route::apiResource('book', BookController::class);
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    });

    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::post('/profile', [ProfileController::class, 'store'])->middleware('auth:api');
    Route::get('/history/{id}', [BorrowsController::class, 'show'])->middleware('auth:api');
    Route::post('/borrow', [BorrowsController::class, 'store'])->middleware('auth:api');
    Route::post('/borrow/{id}/return', [BorrowsController::class, 'returnBook'])->middleware('auth:api');
});