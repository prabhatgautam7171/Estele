<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->delete();

        $categories = [
            [
                'name' => 'Earrings',
                'slug' => 'earrings',
                'image' => '/storage/categories/earrings.webp',
            ],
            [
                'name' => 'Necklaces',
                'slug' => 'necklaces',
                'image' => '/storage/categories/necklaces.webp',
            ],
            [
                'name' => 'Rings',
                'slug' => 'rings',
                'image' => '/storage/categories/rings.jpg',
            ],
            [
                'name' => 'Bracelets',
                'slug' => 'bracelets',
                'image' => '/storage/categories/bracelets.jpg',
            ],
            [
                'name' => 'Bangles',
                'slug' => 'bangles',
                'image' => '/storage/categories/bangles.webp',
            ],
            [
                'name' => 'Pendants',
                'slug' => 'pendants',
                'image' => '/storage/categories/pendants.webp',
            ],
            [
                'name' => 'Jewellery Sets',
                'slug' => 'jewellery-sets',
                'image' => '/storage/categories/jewellery-sets.webp',
            ],
            [
                'name' => 'Mangalsutra',
                'slug' => 'mangalsutra',
                'image' => '/storage/categories/mangalsutra.jpg',
            ],
            [
                'name' => 'Maang Tikka',
                'slug' => 'maang-tikka',
                'image' => '/storage/categories/maang-tikka.jpg',
            ],
            [
                'name' => 'Nose Pins',
                'slug' => 'nose-pins',
                'image' => '/storage/categories/nose-pins.webp',
            ],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                ...$category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
