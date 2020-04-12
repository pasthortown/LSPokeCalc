<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('statistics', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->double('hp',8,2)->nullable($value = true);
          $table->double('attack',8,2)->nullable($value = true);
          $table->double('defense',8,2)->nullable($value = true);
          $table->double('special_attack',8,2)->nullable($value = true);
          $table->double('special_defense',8,2)->nullable($value = true);
          $table->double('speed',8,2)->nullable($value = true);
          $table->unsignedInteger('statistic_type_id');
          $table->foreign('statistic_type_id')->references('id')->on('statistic_types')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('statistics');
    }
}