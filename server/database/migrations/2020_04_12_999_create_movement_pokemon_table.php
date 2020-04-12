<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementPokemonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('movement_pokemon', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('movement_id');
          $table->foreign('movement_id')->references('id')->on('movements')->onDelete('cascade');
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
       Schema::dropIfExists('movement_pokemon');
    }
}