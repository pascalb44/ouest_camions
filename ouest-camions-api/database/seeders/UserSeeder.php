<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run()
    {
        // take ID of user role
        $roleId = Role::where('name_role', 'user')->first()->id;

        // Créate 10 users with user role
        User::factory()->count(10)->create([
            'id_role' => $roleId, 
        ]);
    }
}