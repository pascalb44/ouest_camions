<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['email_contact', 'subject', 'message',];


    public function users()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
