<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define 5 different car brands
        $brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'];

        // Generate descriptions for each brand
        $descriptions = [
            'Toyota' => 'Toyota is one of the leading car manufacturers in the world, known for its reliability and innovation.',
            'Honda' => 'Honda is renowned for its fuel-efficient vehicles and cutting-edge technology.',
            'Ford' => 'Ford has a long history of producing durable trucks and SUVs, along with its iconic Mustang sports car.',
            'Chevrolet' => 'Chevrolet offers a diverse lineup of vehicles, from compact cars to full-size trucks, known for their performance and value.',
            'Volkswagen' => 'Volkswagen is famous for its range of quality vehicles, including the iconic Beetle and versatile Golf.',
        ];

        // Create 10 different cars
        for ($i = 0; $i < 10; $i++) {
            $brandIndex = array_rand($brands);
            $brand = $brands[$brandIndex];
            $description = $descriptions[$brand];

            Car::create([
                'code' => 'CAR' . ($i + 1),
                'photo' => 'example_photo_' . ($i + 1) . '.jpg',
                'city' => 'City ' . ($i + 1),
                'brand' => $brand,
                'model' => 'Model ' . ($i + 1),
                'description' => $description,
                'year' => rand(2000, 2022),
                'mileage' => rand(10000, 200000) / 100,
                'gearbox_type' => 'Manual',
                'store_phone_number' => '123456789',
                'value' => rand(10000, 100000) / 100,
            ]);
        }
    }
}
