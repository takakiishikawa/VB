<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Segment;
use App\Models\MajorSegment;
use App\Models\UserSegmentStatus;
use Illuminate\Support\Facades\Auth;


class SegmentController extends Controller
{
    public function index($id) {
        $majorSegment = MajorSegment::find($id);
        \Log::info('majorSegment', ['majorSegment' => $majorSegment]);
        $major_segment_id = $majorSegment->id;
        $segments = Segment::where('major_segment_id', $major_segment_id)->get('id');
        
        return response()->json(['segments' => $segments]);
    }
    
    public function userMajorSegmentStatus($major_segment_id) {
        \Log::info('1', ['major_segment_id' => $major_segment_id]);
        $user = Auth::user();
        $segmentList = Segment::where('major_segment_id', $major_segment_id)->get('id');
        //segmentListのidと一致するuser_segment_statusesのsegment_idとstatusを取得
        $user_segment_statuses = [];
        foreach($segmentList as $segment) {
            $user_segment_status = UserSegmentStatus::where('user_id', $user->id)
                ->where('segment_id', $segment->id)
                ->select('segment_id', 'status')
                ->first();
            if ($user_segment_status) {
                $user_segment_statuses[$user_segment_status->segment_id] = $user_segment_status->status;
            } else {
                $user_segment_statuses[$segment->id] = null;
            }
        }

        \Log::info('user_segment_statuses', ['user_segment_statuses' => $user_segment_statuses]);
        return response()->json(['user_segment_statuses' => $user_segment_statuses]);
    }
}

