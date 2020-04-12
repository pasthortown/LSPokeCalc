<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePokemonPokemonTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('pokemon_pokemon_type', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('pokemon_type_id');
          $table->foreign('pokemon_type_id')->references('id')->on('pokemon_types')->onDelete('cascade');
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
       Schema::dropIfExists('pokemon_pokemon_type');
    }
}