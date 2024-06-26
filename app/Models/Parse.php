<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function wordToParse() {
        return $this->hasMany(WordToParse::class, 'parse_id');
    }
}
