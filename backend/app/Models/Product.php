<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'category_id',
    'name',
    'slug',
    'description',
    'price',
    'image',
    'stock',
])]
class Product extends Model
{

  // use Illuminate\Database\Eloquent\Relations\HasMany;

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
