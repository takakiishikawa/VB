<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Segment;
use App\Models\MajorSegment;


class SegmentController extends Controller
{
    public function index($id) {
        $majorSegment = MajorSegment::find($id);
        $major_segment_id = $majorSegment->id;
        $segments = Segment::where('major_segment_id', $major_segment_id)->get('id');
        
        return response()->json(['segments' => $segments]);
    }
}
