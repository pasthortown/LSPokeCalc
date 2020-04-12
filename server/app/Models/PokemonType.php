<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PokemonType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Pokemons()
    {
       return $this->belongsToMany('App\Pokemon')->withTimestamps();
    }

}