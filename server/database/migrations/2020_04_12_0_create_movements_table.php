<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('movements', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',255)->nullable($value = true);
          $table->longText('effect')->nullable($value = true);
          $table->integer('power')->nullable($value = true);
          $table->integer('accurancy')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('movements');
    }
}