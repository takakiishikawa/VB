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
        Schema::create('user_words', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('user_article_id');
            $table->foreign('user_article_id')->references('id')->on('user_articles');
            $table->unsignedBigInteger('word_id');
            $table->foreign('word_id')->references('id')->on('words');
            $table->unsignedBigInteger('segment_id');
            $table->foreign('segment_id')->references('id')->on('segments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_words');
    }
};
