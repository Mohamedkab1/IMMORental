<?php
// app/Models/Bien.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bien extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'prix',
        'surface',
        'type',
        'ville',
        'code_postal',
        'statut',
        'nb_pieces',
        'user_id'
    ];

    protected $casts = [
        'prix' => 'decimal:2',
        'surface' => 'integer',
        'nb_pieces' => 'integer'
    ];
}

class Bien extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'prix',
        'surface',
        'type',
        'ville'
    ];

    public function user()
{
return $this->belongsTo(User::class);
}
}