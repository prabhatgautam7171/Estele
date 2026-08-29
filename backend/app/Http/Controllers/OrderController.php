<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

  public function index(Request $request): JsonResponse
  {
      $orders = $request->user()
          ->orders()
          ->with('items.product')
          ->latest()
          ->get();

      return response()->json([
          'orders' => $orders,
      ]);
  }
  
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json([
                'message' => 'Your cart is empty.',
            ], 422);
        }

        $order = DB::transaction(function () use ($cart, $user) {
            $totalAmount = $cart->items->sum(function ($item) {
                return $item->quantity * $item->product->price;
            });

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending',
            ]);

            foreach ($cart->items as $cartItem) {
                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);
            }

            $cart->items()->delete();

            return $order;
        });

        $order->load('items.product');

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => $order,
        ], 201);
    }
}
