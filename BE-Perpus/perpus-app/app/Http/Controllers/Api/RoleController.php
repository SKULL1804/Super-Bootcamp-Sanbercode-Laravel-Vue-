<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\RoleRequest;
use App\Http\Controllers\Controller;
use Illuminate\Routing\Controllers\HasMiddleware;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth:api',
            'isOwner',
        ];
    }

    public function index() : JsonResponse {
        $role = Role::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $role
        ]);
    }

    public function store(RoleRequest $request): JsonResponse
    {
        $role = Role::create($request->all());

        return response()->json([
            'message' => 'Data berhasil dibuat.',
            'data' => $role
        ], 201);
    }

    public function update(RoleRequest $request, $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                "error" => "Role tidak di temukan",
            ], 404);
        }

        $role->fill($request->only(['name']));

        $role->save();

        return response()->json([
            "message" => "Yeah data berhasil Diupdate",
            'data' => $role
        ], 201);
    }

    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                "error" => "Role tidak di temukan",
            ], 404);
        }

        $role->delete();

        return response()->json([
            "message" => "Hore data kehapus",
        ], 200);
    }


}
