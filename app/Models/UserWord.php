<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_article_id',
        'word_id',
        'segment_id'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userArticle(){
        return $this->belongsTo(UserArticle::class, 'user_article_id');
    }

    public function word(){
        return $this->belongsTo(Word::class, 'word_id');
    }

    public function segment(){
        return $this->belongsTo(Segment::class, 'segment_id');
    }

    public function userWordTest(){
        return $this->hasMany(UserWordTest::class, 'user_word_id');
    }
}