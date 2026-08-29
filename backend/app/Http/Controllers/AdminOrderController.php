<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminOrderController extends Controller
{
    /**
     * Get all orders placed by normal users.
     */
    public function index(): JsonResponse
    {
        $orders = Order::with([
            'user:id,name,email,role',
            'items.product:id,name',
        ])
        ->whereHas('user', function ($query) {
            $query->where('role', 'user');
        })
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'orders' => $orders,
        ]);
    }

    /**
     * Get details of a specific user order.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load([
            'user:id,name,email,role',
            'items.product:id,name',
        ]);

        // Admin should only be able to manage orders
        // belonging to normal users.
        if ($order->user?->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Order not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'order' => $order,
        ]);
    }

    /**
     * Update order status.
     */
    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        if ($order->user?->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Order not found.',
            ], 404);
        }

        $validated = $request->validate([
            'status' => [
                'required',
                Rule::in([
                    'pending',
                    'confirmed',
                    'processing',
                    'shipped',
                    'delivered',
                    'cancelled',
                ]),
            ],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Order status updated successfully.',
            'order' => $order->fresh([
                'user:id,name,email,role',
                'items.product:id,name',
            ]),
        ]);
    }
}
