<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Get current user's cart
     */
    public function index(Request $request)
{
    $cart = Cart::firstOrCreate([
        'user_id' => $request->user()->id,
    ]);

    return response()->json([
        'success' => true,
        'cart' => $this->cartResponse($cart),
    ]);
}

    /**
     * Add product to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $quantity = $request->quantity ?? 1;

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        $product = Product::findOrFail($request->product_id);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
            ]);
        }

        return response()->json([
          'success' => true,
          'message' => 'Product added to cart.',
          'cart' => $this->cartResponse($cart),
      ]);
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found in cart.',
            ], 404);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json([
          'success' => true,
          'message' => 'Cart updated successfully.',
          'cart' => $this->cartResponse($cart),
      ]);
    }

    /**
     * Remove product from cart
     */
    public function destroy(Request $request, $productId)
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found in cart.',
            ], 404);
        }

        $cartItem->delete();

return response()->json([
    'success' => true,
    'message' => 'Product removed from cart.',
    'cart' => $this->cartResponse($cart),
]);
    }

    /**
     * Clear entire cart
     */
    public function clear(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->first();

        if (!$cart) {
            return response()->json([
                'success' => true,
                'message' => 'Cart is already empty.',
                'cart' => [
                    'id' => null,
                    'items' => [],
                    'total_items' => 0,
                    'subtotal' => 0,
                ],
            ]);
        }

        $cart->items()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully.',
            'cart' => $this->cartResponse($cart),
        ]);
    }

    private function cartResponse(Cart $cart)
{
    $cart->load('items.product');

    $items = $cart->items->map(function ($item) {
        return [
            'id' => $item->id,
            'product_id' => $item->product_id,
            'name' => $item->product->name,
            'image' => $item->product->image,
            'price' => (float) $item->product->price,
            'quantity' => $item->quantity,
            'subtotal' => (float) $item->product->price * $item->quantity,
        ];
    });

    return [
        'id' => $cart->id,
        'items' => $items->values(),
        'total_items' => $items->sum('quantity'),
        'subtotal' => $items->sum('subtotal'),
    ];
}
}
