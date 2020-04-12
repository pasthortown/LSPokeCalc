<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nature extends Model
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

    function Pokemon()
    {
       return $this->belongsTo('App\Pokemon');
    }

}