<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CategoryTrailer  extends Model
{
    use HasFactory;

    protected $table = 'categories_trailers'; 
    protected $fillable = ['name_category_trailer', 'image_category_trailer'];

    public function trailers()
    {

        return $this->hasMany(Trailer::class, 'id_category_trailer', 'id_category_trailer');
    }
}
