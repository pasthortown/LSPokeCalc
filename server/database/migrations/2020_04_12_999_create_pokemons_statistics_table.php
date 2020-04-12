<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePokemonStatisticTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('pokemon_statistic', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('statistic_id');
          $table->foreign('statistic_id')->references('id')->on('statistics')->onDelete('cascade');
          $table->unsignedInteger('pokemon_id');
          $table->foreign('pokemon_id')->references('id')->on('pokemons')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('pokemon_statistic');
    }
}