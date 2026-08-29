<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
    'email',
    'password',
    'otp',
    'otp_expires_at',
    'role',
])]

#[Hidden([
    'password',
    'remember_token',
    'otp',
    'otp_expires_at',
])]

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'otp_expires_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function orders(): HasMany
{
    return $this->hasMany(Order::class);
}
}
