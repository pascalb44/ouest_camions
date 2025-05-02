<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


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

        User::factory()->create([
            'first_name' => 'Pascal',
            'last_name' => 'Alouest',
            'email' => 'admin@ouestcamions.fr',
            'password' => Hash::make('AdminOuest123!'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'company' => 'ouestcamions',
            'siren' => '503121733',
            'address' => '29 rue de Brest',
            'postal_code' => '44000',
            'town' => 'Nantes',
            'phone' => '0123456789',   
            'id_role' => '1', // = admin  
        ]);

        User::factory()->create([
            'first_name' => 'Robert',
            'last_name' => 'Lenantais',
            'email' => 'robert@transportslenantais.fr',
            'password' => Hash::make('robert44'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'company' => 'transports Robert',
            'siren' => '172217914',
            'address' => '1234 rue d\'Angers',
            'postal_code' => '44000',
            'town' => 'Nantes',
            'phone' => '0200000000',
            'id_role' => '2',
        ]);
    }
}