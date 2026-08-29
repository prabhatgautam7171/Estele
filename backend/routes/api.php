<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

Route::post('/auth/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

Route::prefix('admin')->group(function () {

  // Admin authentication
  Route::post('/login', [AdminAuthController::class, 'login']);
  Route::post('/register', [AdminAuthController::class, 'register']);

  // Protected admin routes
  Route::middleware(['auth:sanctum', 'admin'])->group(function () {

      Route::get('/user', [AdminAuthController::class, 'user']);
      Route::post('/logout', [AdminAuthController::class, 'logout']);

  });

});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::get(
    '/categories/{category}/products',
    [ProductController::class, 'categoryProducts']
);

Route::middleware('auth:sanctum')->group(function () {

  Route::get('/cart', [CartController::class, 'index']);

  Route::post('/cart', [CartController::class, 'store']);

  Route::patch('/cart/{productId}', [CartController::class, 'update']);

  Route::delete('/cart/{productId}', [CartController::class, 'destroy']);

  Route::delete('/cart', [CartController::class, 'clear']);

});

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
  Route::get('/orders', [OrderController::class, 'index']);
  Route::post('/orders', [OrderController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
  Route::get('/orders', [AdminOrderController::class, 'index']);
  Route::get('/orders/{order}', [AdminOrderController::class, 'show']);
  Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
