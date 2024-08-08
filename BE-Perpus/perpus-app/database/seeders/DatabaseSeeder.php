<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RoleSeeder::class,
        ]);

        $role = Role::where('name', 'owner')->first();

        User::factory()->create([
            'name' => 'owner',
            'email' => 'owner@gmail.com',
            'role_id' => $role->id,
            'password' => Hash::make('password'),
        ]);
    }
}