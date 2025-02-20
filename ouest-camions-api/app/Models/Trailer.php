<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Trailer extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_trailer',
        'name_trailer',
        'description_trailer',
        'color_trailer',
        'length_trailer',
        'width_trailer',
        'height_trailer',
        'load_trailer',
        'image_trailer',
        'duration_trailer',
        'price_day_trailer',
        'price_week_trailer',
        'price_month_trailer',
        'price_year_trailer',
        'id_category_trailer',
    ];

    
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_trailer', 'id_trailer', 'id_order');
    }

    public function categories_trailers()
    {
        return $this->belongsTo(CategoryTrailer::class, 'id_category_trailer', 'id_category_trailer');    }
}
