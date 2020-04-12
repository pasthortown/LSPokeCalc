<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'hp','attack','defense','special_attack','special_defense','speed',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function StatisticType()
    {
       return $this->hasOne('App\StatisticType');
    }

    function Pokemons()
    {
       return $this->belongsToMany('App\Pokemon')->withTimestamps();
    }

}