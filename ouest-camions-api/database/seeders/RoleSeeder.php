<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'user'];

        foreach ($roles as $role) {
            // Vérifiez si le rôle existe déjà avant de le créer
            if (!Role::where('name_role', $role)->exists()) {
                Role::create(['name_role' => $role]);
            }
        }
    }
}
