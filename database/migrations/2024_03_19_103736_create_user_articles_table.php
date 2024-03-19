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
        Schema::create('user_articles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('article_theme_id');
            $table->foreign('article_theme_id')->references('id')->on('article_themes');
            $table->unsignedBigInteger('segment_id');
            $table->foreign('segment_id')->references('id')->on('segments');
            $table->text('article');
            $table->integer('read_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_articles');
    }
};
