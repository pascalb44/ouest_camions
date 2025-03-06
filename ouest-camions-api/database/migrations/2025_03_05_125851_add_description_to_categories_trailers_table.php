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
        Schema::table('categories_trailers', function (Blueprint $table) {
            $table->string('description', 500)->nullable()->after('image_category_trailer');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('categories_trailers', function (Blueprint $table) {
            $table->dropColumn('description');
        });
    }
};
