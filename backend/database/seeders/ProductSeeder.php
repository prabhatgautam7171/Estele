<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->delete();

        $categories = DB::table('categories')->pluck('id', 'slug');

        $products = [

            // ================= EARRINGS =================
            [
                'category' => 'earrings',
                'name' => 'Classic Gold Jhumka Earrings',
                'slug' => 'classic-gold-jhumka-earrings',
                'price' => 1299,
                'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            ],
            [
                'category' => 'earrings',
                'name' => 'Pearl Drop Earrings',
                'slug' => 'pearl-drop-earrings',
                'price' => 1499,
                'image' => 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800',
            ],
            [
                'category' => 'earrings',
                'name' => 'Rose Gold Stud Earrings',
                'slug' => 'rose-gold-stud-earrings',
                'price' => 999,
                'image' => 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
            ],
            [
                'category' => 'earrings',
                'name' => 'Crystal Drop Earrings',
                'slug' => 'crystal-drop-earrings',
                'price' => 1199,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'earrings',
                'name' => 'Elegant Gold Earrings',
                'slug' => 'elegant-gold-earrings',
                'price' => 1599,
                'image' => 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800',
            ],

            // ================= NECKLACES =================
            [
                'category' => 'necklaces',
                'name' => 'Royal Gold Necklace',
                'slug' => 'royal-gold-necklace',
                'price' => 3499,
                'image' => 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800',
            ],
            [
                'category' => 'necklaces',
                'name' => 'Pearl Layered Necklace',
                'slug' => 'pearl-layered-necklace',
                'price' => 2899,
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
            ],
            [
                'category' => 'necklaces',
                'name' => 'Elegant Diamond Necklace',
                'slug' => 'elegant-diamond-necklace',
                'price' => 4299,
                'image' => 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=800',
            ],
            [
                'category' => 'necklaces',
                'name' => 'Floral Gold Necklace',
                'slug' => 'floral-gold-necklace',
                'price' => 3199,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'necklaces',
                'name' => 'Modern Statement Necklace',
                'slug' => 'modern-statement-necklace',
                'price' => 3799,
                'image' => 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
            ],

            // ================= RINGS =================
            [
                'category' => 'rings',
                'name' => 'Classic Solitaire Ring',
                'slug' => 'classic-solitaire-ring',
                'price' => 1899,
                'image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            ],
            [
                'category' => 'rings',
                'name' => 'Rose Gold Stone Ring',
                'slug' => 'rose-gold-stone-ring',
                'price' => 1499,
                'image' => 'https://images.unsplash.com/photo-1603561596112-db9c9e1c7f3e?w=800',
            ],
            [
                'category' => 'rings',
                'name' => 'Elegant Diamond Ring',
                'slug' => 'elegant-diamond-ring',
                'price' => 2499,
                'image' => 'https://images.unsplash.com/photo-1627293509201-cd1d2f4b5b0b?w=800',
            ],
            [
                'category' => 'rings',
                'name' => 'Minimal Gold Ring',
                'slug' => 'minimal-gold-ring',
                'price' => 899,
                'image' => 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
            ],
            [
                'category' => 'rings',
                'name' => 'Pearl Statement Ring',
                'slug' => 'pearl-statement-ring',
                'price' => 1699,
                'image' => 'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800',
            ],

            // ================= BRACELETS =================
            [
                'category' => 'bracelets',
                'name' => 'Classic Gold Bracelet',
                'slug' => 'classic-gold-bracelet',
                'price' => 1999,
                'image' => 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
            ],
            [
                'category' => 'bracelets',
                'name' => 'Pearl Charm Bracelet',
                'slug' => 'pearl-charm-bracelet',
                'price' => 1599,
                'image' => 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
            ],
            [
                'category' => 'bracelets',
                'name' => 'Elegant Chain Bracelet',
                'slug' => 'elegant-chain-bracelet',
                'price' => 1799,
                'image' => 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=800',
            ],
            [
                'category' => 'bracelets',
                'name' => 'Crystal Tennis Bracelet',
                'slug' => 'crystal-tennis-bracelet',
                'price' => 2299,
                'image' => 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800',
            ],
            [
                'category' => 'bracelets',
                'name' => 'Rose Gold Bracelet',
                'slug' => 'rose-gold-bracelet',
                'price' => 1899,
                'image' => 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800',
            ],

            // ================= BANGLES =================
            [
                'category' => 'bangles',
                'name' => 'Traditional Gold Bangle',
                'slug' => 'traditional-gold-bangle',
                'price' => 2199,
                'image' => 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
            ],
            [
                'category' => 'bangles',
                'name' => 'Kundan Stone Bangle',
                'slug' => 'kundan-stone-bangle',
                'price' => 2499,
                'image' => 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
            ],
            [
                'category' => 'bangles',
                'name' => 'Rose Gold Bangle',
                'slug' => 'rose-gold-bangle',
                'price' => 1799,
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
            ],
            [
                'category' => 'bangles',
                'name' => 'Pearl Designer Bangle',
                'slug' => 'pearl-designer-bangle',
                'price' => 1999,
                'image' => 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
            ],
            [
                'category' => 'bangles',
                'name' => 'Bridal Gold Bangle',
                'slug' => 'bridal-gold-bangle',
                'price' => 2999,
                'image' => 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
            ],

            // ================= PENDANTS =================
            [
                'category' => 'pendants',
                'name' => 'Heart Gold Pendant',
                'slug' => 'heart-gold-pendant',
                'price' => 1299,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'pendants',
                'name' => 'Pearl Pendant',
                'slug' => 'pearl-pendant',
                'price' => 1399,
                'image' => 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
            ],
            [
                'category' => 'pendants',
                'name' => 'Floral Gold Pendant',
                'slug' => 'floral-gold-pendant',
                'price' => 1499,
                'image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            ],
            [
                'category' => 'pendants',
                'name' => 'Diamond Look Pendant',
                'slug' => 'diamond-look-pendant',
                'price' => 1699,
                'image' => 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=800',
            ],
            [
                'category' => 'pendants',
                'name' => 'Minimal Heart Pendant',
                'slug' => 'minimal-heart-pendant',
                'price' => 999,
                'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            ],

            // ================= JEWELLERY SETS =================
            [
                'category' => 'jewellery-sets',
                'name' => 'Royal Bridal Jewellery Set',
                'slug' => 'royal-bridal-jewellery-set',
                'price' => 5999,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'jewellery-sets',
                'name' => 'Kundan Necklace Set',
                'slug' => 'kundan-necklace-set',
                'price' => 4999,
                'image' => 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
            ],
            [
                'category' => 'jewellery-sets',
                'name' => 'Pearl Jewellery Set',
                'slug' => 'pearl-jewellery-set',
                'price' => 3999,
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
            ],
            [
                'category' => 'jewellery-sets',
                'name' => 'Rose Gold Jewellery Set',
                'slug' => 'rose-gold-jewellery-set',
                'price' => 4499,
                'image' => 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=800',
            ],
            [
                'category' => 'jewellery-sets',
                'name' => 'Elegant Party Wear Set',
                'slug' => 'elegant-party-wear-set',
                'price' => 3599,
                'image' => 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800',
            ],

            // ================= MANGALSUTRA =================
            [
                'category' => 'mangalsutra',
                'name' => 'Classic Gold Mangalsutra',
                'slug' => 'classic-gold-mangalsutra',
                'price' => 2299,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'mangalsutra',
                'name' => 'Diamond Mangalsutra',
                'slug' => 'diamond-mangalsutra',
                'price' => 2999,
                'image' => 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=800',
            ],
            [
                'category' => 'mangalsutra',
                'name' => 'Minimal Mangalsutra',
                'slug' => 'minimal-mangalsutra',
                'price' => 1799,
                'image' => 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
            ],
            [
                'category' => 'mangalsutra',
                'name' => 'Pearl Mangalsutra',
                'slug' => 'pearl-mangalsutra',
                'price' => 2499,
                'image' => 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
            ],
            [
                'category' => 'mangalsutra',
                'name' => 'Modern Black Bead Mangalsutra',
                'slug' => 'modern-black-bead-mangalsutra',
                'price' => 1999,
                'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            ],

            // ================= MAANG TIKKA =================
            [
                'category' => 'maang-tikka',
                'name' => 'Traditional Kundan Maang Tikka',
                'slug' => 'traditional-kundan-maang-tikka',
                'price' => 1699,
                'image' => 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800',
            ],
            [
                'category' => 'maang-tikka',
                'name' => 'Pearl Maang Tikka',
                'slug' => 'pearl-maang-tikka',
                'price' => 1499,
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
            ],
            [
                'category' => 'maang-tikka',
                'name' => 'Bridal Gold Maang Tikka',
                'slug' => 'bridal-gold-maang-tikka',
                'price' => 2199,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
            [
                'category' => 'maang-tikka',
                'name' => 'Floral Maang Tikka',
                'slug' => 'floral-maang-tikka',
                'price' => 1399,
                'image' => 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800',
            ],
            [
                'category' => 'maang-tikka',
                'name' => 'Crystal Maang Tikka',
                'slug' => 'crystal-maang-tikka',
                'price' => 1599,
                'image' => 'https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?w=800',
            ],

            // ================= NOSE PINS =================
            [
                'category' => 'nose-pins',
                'name' => 'Classic Gold Nose Pin',
                'slug' => 'classic-gold-nose-pin',
                'price' => 699,
                'image' => 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800',
            ],
            [
                'category' => 'nose-pins',
                'name' => 'Diamond Look Nose Pin',
                'slug' => 'diamond-look-nose-pin',
                'price' => 899,
                'image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
            ],
            [
                'category' => 'nose-pins',
                'name' => 'Floral Gold Nose Pin',
                'slug' => 'floral-gold-nose-pin',
                'price' => 799,
                'image' => 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
            ],
            [
                'category' => 'nose-pins',
                'name' => 'Pearl Nose Pin',
                'slug' => 'pearl-nose-pin',
                'price' => 749,
                'image' => 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800',
            ],
            [
                'category' => 'nose-pins',
                'name' => 'Elegant Stone Nose Pin',
                'slug' => 'elegant-stone-nose-pin',
                'price' => 849,
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert([
                'category_id' => $categories[$product['category']],
                'name' => $product['name'],
                'slug' => $product['slug'],
                'price' => $product['price'],
                'image' => $product['image'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
