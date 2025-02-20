<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategoryTruck  extends Model
{
    use HasFactory;

    protected $table = 'categories_trucks'; 
    protected $fillable = ['name_category_truck', 'image_category_truck'];

    public function trucks()
    {

        return $this->hasMany(Truck::class, 'id_category_truck', 'id_category_truck');
    }
}
