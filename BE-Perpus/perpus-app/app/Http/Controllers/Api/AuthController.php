<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
    public function me(): JsonResponse
    {
        $currentUser = User::with('role','profile')->find(auth()->id());

        return response()->json([
            "message" => "Profile berhasil ditampilkan",
            "user" => $currentUser
        ]);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $role = Role::where('name', 'user')->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "User berhasil register",
            "user" => $user->load('role'),
            "token" => $token
        ]);
    }

    public function login(LoginRequest $request) : JsonResponse {
        $credentials = $request->only(
            'email',
            'password',
        );

        $user = User::with('role')->where('email', $request['email'])->first();

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'User invalid'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "success login",
            "user" => $user,
            "token" => $token
        ], 201);
    }


    public function logout(): JsonResponse
    {
        auth()->logout();

        return response()->json([
            "message" => "Anda berhasil logout"
        ]);
    }
}
