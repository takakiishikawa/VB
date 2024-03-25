<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMajorSegmentStatus extends Model
{
    use HasFactory;

    const STATUS_OPEN = 1;
    const STATUS_COMPLETED = 2;

    protected $fillable = [
        'user_id',
        'major_segment_id',
        'status'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function majorSegment(){
        return $this->belongsTo(MajorSegment::class, 'major_segment_id');
    }
}
