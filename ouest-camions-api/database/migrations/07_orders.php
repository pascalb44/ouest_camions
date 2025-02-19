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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('order_number');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->decimal('amount', 10, 2);
            $table->string('method_payment');
            $table->dateTime('date_payment');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade'); //FK to "users"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');

    }
};
