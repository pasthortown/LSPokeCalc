<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StatisticType extends Model
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

    function Statistic()
    {
       return $this->belongsTo('App\Statistic');
    }

}