<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class truck extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_truck',
        'name_truck',
        'description_truck',
        'color_truck',
        'length_truck',
        'width_truck',
        'height_truck',
        'load_truck',
        'km_truck',
        'image_truck',
        'duration_truck',
        'price_day_truck',
        'price_week_truck',
        'price_month_truck',
        'price_year_truck', 
        'id_category_truck',
    ];



    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_truck', 'id_truck', 'id_order');
    }

    public function categories_trucks()
    {
        return $this->belongsTo(CategoryTruck::class, 'id_category_truck');
    }
}
