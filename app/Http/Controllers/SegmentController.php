<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Segment;
use App\Models\MajorSegment;
use App\Models\UserSegmentStatus;
use App\Models\ArticleTheme;
use App\Models\Word;
use App\Models\UserWord;
use App\Models\UserArticle;
use App\Models\UserSegmentTest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class SegmentController extends Controller
{
    public function index($id) {
        $majorSegment = MajorSegment::find($id);
        $major_segment_id = $majorSegment->id;
        $segments = Segment::where('major_segment_id', $major_segment_id)->get('id');
        
        return response()->json(['segments' => $segments]);
    }
    
    public function userMajorSegmentStatus($major_segment_id) {
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

        return response()->json(['user_segment_statuses' => $user_segment_statuses]);
    }

    public function generateArticle($segmentId) {
        try {
            $response = $this->generateArticleApi($segmentId);
            
            if ($response['error']){
                return response()->json(['error' => $response['message']], 400);
            }
            return response()->json(['message' => 'Article generated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unexpected error occurred while generating the article.'], 500);
        }
    }

    public function generateArticleApi($segmentId) {
        //前準備
        $userId = Auth::id();
        \Log::info('userId', ['userId' => $userId]);

        $segmentId = Segment::find($segmentId)->id;
        \Log::info('segmentId', ['segmentId' => $segmentId]);
        $selectWordCount = 100;
        $articleCount = 0;
        $tryCount = 0;

        //記事生成開始
        while ($articleCount < 10 && $tryCount < 15) {
            //prompt準備
            $articleTheme = ArticleTheme::inRandomOrder()->first();
            \Log::info('articleTheme', ['articleTheme' => $articleTheme]);

            $userWordIdList = UserWord::where('user_id', $userId)->pluck('word_id')->toArray();
            $wordList = Word::whereNotIn('id', $userWordIdList)
                ->orderByDesc('frequency')
                ->limit($selectWordCount)
                ->pluck('name')
                ->toArray();
            $promptWordList = implode(', ', $wordList);

            //prompt生成
            $prompt = "Create a simple English article with the following details:\n" .
            "- Topic: {$articleTheme->name}\n" .
            "- Use at least 10 words from this list: {$promptWordList}\n" .
            "- This article used should be easy to understand, using simple vocabulary and grammar structures.\n" .
            "- Keep the article under 500 characters in length.\n" .
            "Only return a JSON with 'title' and 'article'.\n" .
            '{"title": "Your Article Title Here", "article": "Your article content goes here."}';

            \Log::info('prompt', ['prompt' => $prompt]);

            //chat GPT API実行
            $url = "https://api.openai.com/v1/chat/completions";

            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY')
            ])->withOptions(['timeout' => 300])->post($url, [
                'model' => 'gpt-4',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
                'temperature' => 0.7
            ]);

            \Log::info('response', ['response' => $response]);

            $jsonResponse = $response->json();

            //API実行後データ処理
            $beforeDecodeContent = preg_replace('/[\x00-\x1F\x7F]/u', '', $jsonResponse['choices'][0]['message']['content']);
            $content = json_decode($beforeDecodeContent, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Log::info('JSONデコードエラー');
                $tryCount++;
                continue;
            }
            $titleData = $content['title'];
            $articleData = $content['article'];
            \Log::info('titleData', ['titleData' => $titleData]);
            \Log::info('articleData', ['articleData' => $articleData]);

            //記事生成に使用した英単語取得
            $articleWordAll = preg_split('/[\s,\.]+/', $articleData, -1, PREG_SPLIT_NO_EMPTY);
            $articleWordList = array_intersect($articleWordAll, $wordList);
            \Log::info('articleWordAll', ['articleWordAll' => $articleWordAll]);
            \Log::info('wordList', ['wordList' => $wordList]);
            \Log::info('articleWordList', ['articleWordList' => $articleWordList]);

            //error handling
            if (count($articleWordList) < 10) {
                \Log::info('10以下のエラー');
                $tryCount++;
                continue;
            }
            
            if (!$articleData || !$titleData) {
                \Log::info('記事生成エラー');
                $tryCount++;
                continue;            
            }

            //DB保存
            $UserArticle = UserArticle::create([
                'user_id' => $userId,
                'article_theme_id' => $articleTheme->id,
                'segment_id' => $segmentId,
                'article' => $articleData,
                'title' => $titleData,
                'read_count' => 0
            ]);

            $selectedWordList = array_slice($articleWordList, 0, 10);
            foreach ($selectedWordList as $word) {
                $wordId = Word::where('name', $word)->value('id');
                UserWord::create([
                    'user_id' => $userId,
                    'user_article_id' => $UserArticle->id,
                    'word_id' => $wordId,
                    'segment_id' => $segmentId
                ]);
            }
            \Log::info('記事生成成功');
            \Log::info("現在のtry回数: $tryCount, 現在の記事数: $articleCount");
            $articleCount++;
            $tryCount++;
        }

        //status更新
        $userSegmentStatus = UserSegmentStatus::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->first();

        $userSegmentStatus->status = $userSegmentStatus->status+1;
        $userSegmentStatus->save();

        if ($articleCount >= 10) {
            \Log::info("Successfully created 10 articles.");
        } else {
            \Log::info("Exceeded maximum tries without creating 10 articles. Tries: $tryCount");
        }

        \Log::info("try回数: $tryCount");
        
        return;
    }

    public function readingStatus($segmentId) {
        $userId = Auth::user()->id;
        $userArticleArray = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->with(['articleTheme' => function($query) {
                $query->select('id', 'name');
            }])
            ->get(['title', 'article_theme_id', 'read_status']);

        $userArticleList = $userArticleArray->map(function ($userArticle) {
            return [
                'title' => $userArticle->title,
                'article_theme' => $userArticle->articleTheme->name,
                'read_status' => $userArticle->read_status
            ];
        });

        return response()->json(['userArticleList' => $userArticleList]);
    }

    public function userSegmentCycle($segmentId) {
        $userId = Auth::user()->id;
        $userSegmentCycle = UserSegmentStatus::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->select('cycle')
            ->first();

        return response()->json(['userSegmentCycle' => $userSegmentCycle]);
    }

    public function updateReadingStatus($segmentId) {
        //update read_status
        $userId = Auth::user()->id;
        $userArticle = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->where('read_status', 1)
            ->get();

        foreach ($userArticle as $article) {
            $article->read_status = 0;
            $article->save();
        }

        //update cycle
        $userSegmentStatus = UserSegmentStatus::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->first();
        
        $userSegmentStatus->cycle = $userSegmentStatus->cycle+1;
        if ($userSegmentStatus->cycle == 4) {
            $userSegmentStatus->status = $userSegmentStatus->status+1;
        }
        
        $userSegmentStatus->save();

        $userArticleList = $this->readingStatus($segmentId);
        $userSegmentCycle = $this->userSegmentCycle($segmentId);

        $userArticleList = $userArticleList->original['userArticleList'];
        $userSegmentCycle = $userSegmentCycle->original['userSegmentCycle'];

        return response()->json([
            'userArticleList' => $userArticleList,
            'userSegmentCycle' => $userSegmentCycle
        ]);
    }

    public function updateMiddleReadingStatus($segmentId, $articleCount) {
        $userId = Auth::user()->id;

        DB::transaction(function () use ($userId, $segmentId, $articleCount) {
            $userArticle = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->where('read_status', 0)
            ->limit($articleCount)
            ->get();
            
        foreach ($userArticle as $article) {
            $article->read_status = 1;
            $article->save();
        }});
        
        $userArticleList = $this->readingStatus($segmentId);
        $userArticleList = $userArticleList->original['userArticleList'];

        return response()->json(['userArticleList' => $userArticleList]);
    }

    public function wordResult($segmentId) {
        $userId = Auth::user()->id;
        $wordResult = UserSegmentTest::where('segment_id', $segmentId)
            ->where('user_id', $userId)
            ->select('test_score')
            ->get();

        return response()->json(['wordResult' => $wordResult]);
    }
}