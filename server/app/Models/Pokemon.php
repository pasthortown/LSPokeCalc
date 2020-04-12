<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','level','experience','next_level','pokedex_kanto_id','pokedex_national_id',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function User()
    {
       return $this->hasOne('App\User');
    }

    function PokemonTypes()
    {
       return $this->belongsToMany('App\PokemonType')->withTimestamps();
    }

    function Statistics()
    {
       return $this->belongsToMany('App\Statistic')->withTimestamps();
    }

    function Nature()
    {
       return $this->hasOne('App\Nature');
    }

    function Ability()
    {
       return $this->hasOne('App\Ability');
    }

    function Movements()
    {
       return $this->belongsToMany('App\Movement')->withTimestamps();
    }

}