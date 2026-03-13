<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'nom',
        'email',
        'message',
        'bien_id',
    ];

    public function bien()
    {
        return $this->belongsTo(Bien::class);
    }   
}
