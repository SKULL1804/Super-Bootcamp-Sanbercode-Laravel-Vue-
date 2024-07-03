<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        if ($user && $user->role && $user->role->name === 'admin') {
            return $next($request);
        }

        return response()->json([
            "message" => "Anda tidak bisa mengakses halaman admin",
        ], 401);

        return $next($request);
    }
}