<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MajorSegment;

class MajorSegmentController extends Controller
{
    public function index() {
        $major_segments = MajorSegment::orderByDesc('id')->get('id')->toArray();
        return response()->json(["major_segments" => $major_segments]);
    }
}

