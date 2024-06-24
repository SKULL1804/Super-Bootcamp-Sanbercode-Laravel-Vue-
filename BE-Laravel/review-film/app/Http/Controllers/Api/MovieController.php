<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MovieRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function store(MovieRequest $request) : JsonResponse {
        return response()->json([
            'message' => 'success'
        ], 200);
    }
}