<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordToParse extends Model
{
    use HasFactory;

    protected $fillable = [
        'word_id',
        'parse_id'
    ];

    public function word() {
        return $this->belongsTo(Word::class, 'word_id');
    }

    public function parse() {
        return $this->belongsTo(Parse::class, 'parse_id');
    }
}
