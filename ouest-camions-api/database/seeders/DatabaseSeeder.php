<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
     
    public function run(): void // to create only the admin without userFactory 
    {
        User::factory()->create([
            'first_name' => 'Pascal',
            'last_name' => 'Dev',
            'email' => 'admin@ouestcamions.fr',
            'password' => Hash::make('test123'),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'company' => 'ouestcamions',
            'siren' => '503000000',
            'address' => '13 rue de Brest',
            'postalCode' => '44000',
            'town' => 'Nantes',
            'telephone' => '0123456789',   
            'id_role' => '1', // = admin  
        ]);
    }
}
