<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Get all products.
     */
    public function index()
    {
        $products = Product::with('category')
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'products' => $products,
        ]);
    }

    /**
     * Get a single product.
     */
    public function show(Product $product)
    {
        $product->load('category');

        return response()->json([
            'success' => true,
            'product' => $product,
        ]);
    }

    /**
     * Get products belonging to a category.
     */
    public function categoryProducts(Category $category)
    {
        $products = $category->products()
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'category' => $category->only([
                'id',
                'name',
                'slug',
                'image',
            ]),
            'products' => $products,
        ]);
    }
}
