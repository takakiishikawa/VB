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
        Schema::create('word_to_parses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('word_id');
            $table->foreign('word_id')->references('id')->on('words');
            $table->unsignedBigInteger('parse_id');
            $table->foreign('parse_id')->references('id')->on('parses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('word_to_parses');
    }
};
