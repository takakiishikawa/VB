<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MajorSegment;
use App\Models\UserMajorSegmentStatus;
use Illuminate\Support\Facades\Auth;

class MajorSegmentController extends Controller
{
    public function index() {
        $major_segments = MajorSegment::orderByDesc('id')->get('id')->toArray();
        return response()->json(["major_segments" => $major_segments]);
    }

    public function userMajorSegmentStatus() {
        $user = Auth::user();
        $user_major_segment_statuses = UserMajorSegmentStatus::where('user_id', $user->id)
            ->select('major_segment_id', 'status')
            ->get();
        return response()->json(['user_major_segment_statuses' => $user_major_segment_statuses]);
    }
}
