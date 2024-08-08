<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'age' => 'required|integer',
            'biodata' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $currentUser = auth()->user()->id;

        $profile = Profile::updateOrCreate(
            ['user_id' => $currentUser],
            [
                'age' => $request['age'],
                'biodata' => $request['biodata'],
                'user_id' => $currentUser,
            ]
        );

        return response()->json([
            "message" => "Profile berhasil diubah",
            "data" => $profile
        ], 201);
    }
}