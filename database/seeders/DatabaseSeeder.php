<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DataKeluarMasuk;
use App\Models\DataKtp;
use App\Models\StatusPintu;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'user']);
        $user = User::create(['name' => 'admin', 'email' => 'admin@gmail.com', 'password' => bcrypt('admin123')])->assignRole('admin');

        DataKtp::create([
            'user_id' => $user->id,
            'kode_ktp' => '1122334455'
        ]);
        StatusPintu::create(['status' => 'buka']);
        StatusPintu::create(['status' => 'tutup']);
        DataKtp::factory(10)->hasUser()->create();
        DataKeluarMasuk::factory(100)->create();
    }
}
