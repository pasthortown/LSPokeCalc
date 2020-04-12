<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvantagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('advantages', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->integer('pokemon_type_id_owner')->nullable($value = true);
          $table->integer('pokemon_type_id_enemy')->nullable($value = true);
          $table->double('factor',8,2)->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('advantages');
    }
}