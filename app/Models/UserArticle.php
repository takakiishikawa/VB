<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_theme_id',
        'segment_id',
        'article',
        'read_count'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function articleTheme(){
        return $this->belongsTo(ArticleTheme::class, 'article_theme_id');
    }

    public function segment(){
        return $this->belongsTo(Segment::class, 'segment_id');
    }

    public function userWords(){
        return $this->hasMany(UserWord::class, 'user_article_id');
    }
}
