<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePokemonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('pokemons', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',255)->nullable($value = true);
          $table->integer('level')->nullable($value = true);
          $table->integer('experience')->nullable($value = true);
          $table->integer('next_level')->nullable($value = true);
          $table->integer('pokedex_kanto_id')->nullable($value = true);
          $table->string('pokedex_national_id',0)->nullable($value = true);
          $table->unsignedInteger('user_id');
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
          $table->unsignedInteger('nature_id');
          $table->foreign('nature_id')->references('id')->on('natures')->onDelete('cascade');
          $table->unsignedInteger('ability_id');
          $table->foreign('ability_id')->references('id')->on('abilities')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('pokemons');
    }
}