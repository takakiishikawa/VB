<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'jp',
        'frequency',
        'parse',
        'meaning'
    ];

    public function userWord(){
        return $this->hasMany(UserWord::class, 'word_id');
    }

    public function wordToParse(){
        return $this->hasMany(WordToParse::class, 'word_id');
    }
}