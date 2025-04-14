<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['first_name','last_name', 'company', 'email_contact', 'subject', 'message','id_user'];


    public function users()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
