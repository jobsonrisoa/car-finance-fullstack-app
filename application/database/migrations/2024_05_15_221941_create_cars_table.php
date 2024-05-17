<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->string('photo');
            $table->string('city');
            $table->string('brand');
            $table->string('model');
            $table->text('description');
            $table->integer('year');
            $table->decimal('mileage', 10, 2);
            $table->string('gearbox_type');
            $table->string('store_phone_number');
            $table->decimal('value', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cars');
    }
};
