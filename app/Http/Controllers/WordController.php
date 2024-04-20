<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserWord;
use App\Models\UserArticle;
use App\Models\Word;
use App\Models\Parse;
use App\Models\WordToParse;


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
            \Log::info($parse, ['parse' => $parse]);

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
                'user_article_id' => $userWord->user_article_id
            ];
        });

        \Log::info($wordList, ['wordList' => $wordList]);
        return response()->json(['wordList' => $wordList]);
    }
}
