<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserWord;
use App\Models\UserArticle;
use App\Models\Word;
use App\Models\Parse;
use App\Models\WordToParse;
use App\Models\UserWordTest;
use App\Models\UserSegmentTest;
use App\Models\UserSegmentStatus;
use App\Models\Segment;
use App\Models\UserMajorSegmentStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class WordController extends Controller
{
    public function index($segmentId) {
        $userId = Auth::user()->id;

        $userWordList = UserWord::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->with([
                'word' => function ($query) {
                    $query->select('id', 'name', 'jp');
                },
                'word.wordToParse.parse' => function ($query) {
                    $query->select('id', 'name');
                }
            ])
            ->get();
        
        //word他選択肢および統合
        $wordList = $userWordList->map(function ($userWord) {
            $word = $userWord->word;
            $parse = $word->wordToParse->first()->parse ?? null;

            if ($parse) {
                $similarWordList = Word::whereHas('wordToParse.parse', function ($query) use ($parse) {
                    $query->where('name', $parse->name);
                })
                ->where('id', '!=', $word->id)
                ->select('id', 'jp', 'name')
                ->take(2)
                ->get();
    
                $parseList = $word->wordToParse->pluck('parse.name');
            } else {
                $similarWordList = Word::where('id', '!=', $word->id)
                    ->select('id', 'jp', 'name')
                    ->take(2)
                    ->get();
                
                $parseList = collect([null]);
            }

            $jpList = $similarWordList->map(function ($similarWord) {
                return [
                    'jp' => $similarWord->jp,
                    'name' => $similarWord->name
                ];
            })->push(['jp' => $word->jp, 'name' => $word->name])->shuffle();

            return [
                'word' => $word->name,
                'parseList' => $parseList,
                'jpList' => $jpList,
                'userArticleId' => $userWord->user_article_id
            ];
        });

        return response()->json(['wordList' => $wordList]);
    }

    public function saveAnswer($segmentId, Request $request) {
        $answerList = $request->input('answerList');
        \Log::info($answerList, ['answerList' => $answerList]);
        \Log::info($segmentId, ['segmentId' => $segmentId]);
        $userId = Auth::user()->id;

        //user_word_tests更新
        foreach ($answerList as $answer) {
            //answer['name']と一致するword tableのword idと連携するuser_word_idを取得
            $userWordId = UserWord::where('user_id', $userId)
                ->whereHas('word', function ($query) use ($answer) {
                    $query->where('name', $answer['word']);
                })
                ->first()
                ->id;

            UserWordTest::create([
                'user_id' => $userId,
                'user_word_id' => $userWordId,
                'test_pass' => $answer['testPass']
            ]);
        } 

        //use_segment_test更新 testPassがtrueの数をカウント
        $testScore = count(array_filter($answerList, function ($answer) {
            return $answer['testPass'] == true;
        }));
        UserSegmentTest::create([
            'user_id' => $userId,
            'segment_id' => $segmentId,
            'test_score' => $testScore
        ]);

        //user_segment_status更新
        $userSegmentStatus = UserSegmentStatus::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->first();

        //cycle completed
        if ($userSegmentStatus->cycle == 6) {
            //current recordのstatus更新
            $userSegmentStatus->status = 4;
            $userSegmentStatus->save();

            //同segmentのカウントが9以下の時、next segment追加
            $majorSegmentId = Segment::find($segmentId)->major_segment_id;
            //$majorSemgnetIdと一致するSegment tableのrecordの中から、user_segment_statusのsegment_idが一致するもの数をカウントする
            $segmentCount = Segment::where('major_segment_id', $majorSegmentId)
                ->whereHas('UserSegmentStatus', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->count();
            \Log::info($segmentCount, ['segmentCount' => $segmentCount]);
            
            if ($segmentCount < 10) {
                UserSegmentStatus::create([
                    'user_id' => $userId,
                    'segment_id' => $segmentId + 1,
                    'status' => 1,
                    'cycle' => 1
                ]);
            };

            //同segmentのカウントが10の時、major_segment_statuses更新&追加
            $majorSegmentStatus = UserMajorSegmentStatus::where('user_id', $userId)
                ->where('major_segment_id', $majorSegmentId)
                ->first();
            if ($segmentCount == 10) {
                $majorSegmentStatus->status = 2;
                $majorSegmentStatus->save();

                if ($majorSegmentStatus->major_segment_id < 12) {
                    UserMajorSegmentStatus::create([
                        'user_id' => $userId,
                        'major_segment_id' => $majorSegmentId + 1,
                        'status' => 1
                    ]);
                };
            };
        } else if ($userSegmentStatus->cycle < 6) {
            $userSegmentStatus->cycle += 1;
            $userSegmentStatus->save();
        } 

        return;
    }
}
