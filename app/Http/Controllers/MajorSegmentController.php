<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MajorSegment;

class MajorSegmentController extends Controller
{
    public function index() {

        //major_segmentの全レコードを取得　idのみ取得
        $major_segments = MajorSegment::all('id');
        \Log::info('major-segment', ['major_segments' => $major_segments]);
        return response()->json(["major_segments" => $major_segments]);
    }
}

