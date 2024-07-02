<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CastController;
use App\Http\Controllers\Api\GenreController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\RoleController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::apiResource('movie', MovieController::class);
    Route::apiResource('cast', CastController::class);
    Route::apiResource('genre', GenreController::class);
    Route::middleware(['auth:api', 'isAdmin'])->group(function () {
        Route::apiResource('role', RoleController::class);
    });
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
        Route::post('/generate-otp-code', [AuthController::class, 'generateOtpCode']);
        Route::post('/verifikasi-akun', [AuthController::class, 'verifikasi'])->middleware('auth:api');
    });
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::post('/update-users', [AuthController::class, 'update'])->middleware('auth:api', 'isVerificationAccount');
});