<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\User;
use App\Models\OtpCode;
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

        $user->generateOtpCode();

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "User berhasil register",
            "user" => $user,
            "token" => $token
        ]);
    }

    public function generateOtpCode(Request $request) : JsonResponse {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        $user->generateOtpCode();

        return response()->json([
            "message" => "Berhasil generate ulang otp",
            "data" => $user,
        ]);
    }

    public function verifikasi(Request $request) : JsonResponse {
        $request->validate([
            'otp' => 'required'
        ]);

        $otp_code = OtpCode::where('otp', $request->otp)->first();

        if (!$otp_code) {
            return response()->json([
                'message' => 'Otp Code tidak ditemukan'
            ], 401);
        }

        $now = Carbon::now();

        if ($now > $otp_code->valid_until) {
            return response()->json([
                'message' => 'Otp sudah kadaluarsa silahkan generate ulang'
            ], 400);
        }

        $user = User::find($otp_code->user_id);
        $user->email_verified_at = $now;

        $user->save();

        $otp_code-> delete();

        return response()->json([
            "message" => "Berhasil verifikasi akun",
            "data" => $user,
        ], 201);
    }

    public function login(Request $request) : JsonResponse {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $request['email'])->first();

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'user invalid'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "success login",
            "user" => $user,
            "token" => $token
        ], 201);
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

        $currentUser = auth()->user()->id;

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