<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','effect','power','accurancy',
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