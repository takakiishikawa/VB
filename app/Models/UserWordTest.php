<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWordTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_word_id',
        'test_pass'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userWord(){
        return $this->belongsTo(UserWord::class, 'user_word_id');
    }
}