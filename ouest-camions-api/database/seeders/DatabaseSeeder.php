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
     
    public function run(): void // to create only the admin 
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);

        /*
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
        */
    }
}
