<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSegmentStatus extends Model
{
    use HasFactory;

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