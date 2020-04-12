<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Advantage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'pokemon_type_id_owner','pokemon_type_id_enemy','factor',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

}