<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataKeluarMasuk>
 */
class DataKeluarMasukFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis = ['keluar', 'masuk'];
        return [
            'nama' => $this->faker->name(),
            'jenis' => $jenis[rand(0, 1)],
            'jam' => $this->faker->time(),
            'tanggal' => $this->faker->date(),
        ];
    }
}
