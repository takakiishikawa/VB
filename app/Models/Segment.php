<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Segment extends Model
{
    use HasFactory;

    protected $fillable = [
        'major_segment_id'
    ];

    public function majorSegment(){
        return $this->belongsTo(MajorSegment::class, 'major_segment_id');
    }

    public function userWord(){
        return $this->hasMany(UserWord::class, 'segment_id');
    }

    public function userSegmentTest(){
        return $this->hasMany(UserSegmentTest::class, 'segment_id');
    }

    public function userSegmentStatus(){
        return $this->hasMany(UserSegmentStatus::class, 'segment_id');
    }

    public function userArticle(){
        return $this->hasMany(UserArticle::class, 'segment_id');
    }
}
