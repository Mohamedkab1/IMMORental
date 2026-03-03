<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BienImmobilier extends Model
{
    //
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }

    public function reservations(){
        return $this->hasMany(Reservation::class);
    }
}
