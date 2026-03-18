<?php
// app/Models/Demande.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type_demande',
        'budget',
        'ville',
        'message',
        'statut',
        'autres_informations'
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'autres_informations' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}