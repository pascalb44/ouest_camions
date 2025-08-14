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
        Schema::create('trailers', function (Blueprint $table) {
            $table->id();
            $table->string('brand_trailer',50);
            $table->string('name_trailer', 50);
            $table->string('description_trailer', 500);
            $table->string('color_trailer',50);
            $table->string('length_trailer',50);
            $table->string('width_trailer',50);
            $table->string('height_trailer',50);
            $table->string('load_trailer',50);
            $table->string('image_trailer');
            $table->string('duration_trailer');
            $table->string('price_day_trailer');
            $table->string('price_week_trailer');
            $table->string('price_month_trailer');
            $table->string('price_year_trailer');
            $table->foreignId('id_category_trailer',20)->constrained('categories_trailers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trailers');
    }
};
