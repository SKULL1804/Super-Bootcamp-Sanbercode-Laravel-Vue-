<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{

    public function me() : JsonResponse {
        $currentUser = auth()->user();

        return response()->json([
            "message" => "Profile berhasil ditampilkan",
            "user" => $currentUser
        ]);
    }

    public function register(RegisterRequest $request) : JsonResponse {

        $role = Role::where('name', 'user')->first();

        if (!$role) {
            return response()->json([
                "message" => "Role 'user' tidak ditemukan"
            ], 404);
        }

        $user = User::create([
            'name' => $request->name,
            'email'=> $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "User berhasil register",
            "user" => $user,
            "token" => $token
        ]);
    }

    public function login(Request $request) : JsonResponse {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request['email'])->first();

        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json([
                'error' => 'user invalid'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "success login",
            "user" => $user,
            "token" => $token
        ]);
    }

    public function update(Request $request) : JsonResponse {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users',
            'password' => 'sometimes|required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $currentUser = auth('api')->user()->id;

        if (!$currentUser) {
            return response()->json([
                "message" => "user invalid"
            ], 401);
        }

        $user = User::find($currentUser);

        $user->fill($request->only(['name', 'email', 'password']));

        $user->save();

        return response()->json([
            "message" => "update data berhasil di tampilkan : $currentUser",
            "body" => "name : $user->name "
        ], 201);

    }

    public function logout() : JsonResponse {
        auth()->logout();

        return response()->json([
            "message" => "Yeah berhasil logout"
        ]);
    }
}
