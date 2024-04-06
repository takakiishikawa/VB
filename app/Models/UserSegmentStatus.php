<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSegmentStatus extends Model
{
    use HasFactory;

    const STATUS_GENERATE = 1;
    const STATUS_READ = 2;
    const STATUS_WORD = 3;
    const STATUS_COMPLETED = 4;

    protected $fillable = [
        'user_id',
        'segment_id',
        'status'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function segment(){
        return $this->belongsTo(Segment::class, 'segment_id');
    }
}