<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (DB::table('users')->count() === 0) {
            User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        }
        $this->call([
            MajorSegmentSeeder::class,
            ParseSeeder::class,
            SegmentSeeder::class,
        ]);
    }
}
