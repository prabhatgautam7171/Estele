<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\CartController;

Route::post('/auth/send-otp', [AuthController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp']);

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
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
});
