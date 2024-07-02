<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index() : JsonResponse {
        $role = Role::all();

        return response()->json([
            "message" => "data berhasil ditampilkan",
            "data" => $role
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request): JsonResponse
    {
        Role::create($request->all());

        return response()->json([
            'message' => 'Role berhasil dibuat.',
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
    public function update(RoleRequest $request, string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $role->fill($request->only(['name']));

        $role->save();

        return response()->json([
            "message" => "Yeah data berhasil Diupdate",
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                "error" => "id tidak di temukan",
            ], 404);
        }

        $role->delete();

        return response()->json([
            "message" => "Hore data kehapus",
        ], 200);
    }
}
