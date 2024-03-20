<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MajorSegment extends Model
{
    use HasFactory;

    public function segment(){
        return $this->hasMany(Segment::class, 'major_segment_id');
    }

    public function userMajorSegmentStatus(){
        return $this->hasMany(UserMajorSegmentStatus::class, 'major_segment_id');
    }
}
