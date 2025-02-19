<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trucks', function (Blueprint $table) {
            $table->id();
            $table->string('brand_truck');
            $table->string('name_truck');
            $table->string('description_truck');
            $table->string('color_truck');
            $table->string('length_truck');
            $table->string('width_truck');
            $table->string('height_truck');
            $table->string('load_truck');
            $table->integer('km_truck');
            $table->string('image_truck');
            $table->string('duration_truck');
            $table->string('price_day_truck');
            $table->string('price_week_truck');
            $table->string('price_month_truck');
            $table->string('price_year_truck');   
            $table->foreignId('id_category_truck')->constrained('categories_trucks')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trucks');
    }
};
