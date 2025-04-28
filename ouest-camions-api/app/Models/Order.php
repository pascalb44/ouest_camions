<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['order_number' ,'start_date', 'end_date','amount', 'method_payment', 'date_payment' ];

    public function trucks()
    {
        return $this->belongsToMany(Truck::class, 'order_truck', 'id_order', 'id_truck');
    }

    public function trailers()
{
    return $this->belongsToMany(Trailer::class, 'order_trailer', 'id_order', 'id_trailer');
}


    public function users()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
