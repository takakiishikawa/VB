<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\UserArticle;
use App\Models\Segment;
use App\Models\UserWord;
use App\Models\Word;
use App\Models\Parse;
use App\Models\ArticleTheme;
use App\Models\WordToParse;

class ArticleController extends Controller
{
    public function index($segmentId, $articleId) {
        $userId = Auth::user()->id;
        \Log::info($userId, ['userId' => $userId]);
        \Log::info($segmentId, ['segmentId' => $segmentId]);
        \Log::info($articleId, ['articleId' => $articleId]);

        //UserArticle関連取得
        $userArticleArray = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->where('read_status', 0)
            ->with(['articleTheme' => function ($query) {
                $query->select('id', 'name');
            }])
            ->get(['id', 'title', 'article', 'article_theme_id']);

        //$articleIdをxとする。UserArticleにおいて、user_id,segment_idが一致するレコードの中から、照準にx番目のidを取得する
        $userArticleId = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->orderBy('id')
            ->skip($articleId -1)
            ->first()
            ->id;

        //選択された記事を先頭 + 他ランダム表示
        $specificArticle = $userArticleArray->firstWhere('id', $userArticleId);
        $otherArticle = $userArticleArray->where('id', '!=', $userArticleId)->shuffle();
        $mergedArticle = collect([$specificArticle])->merge($otherArticle);

        //UserWord関連取得
        $userArticleIdArray = $mergedArticle->pluck('id');
        $userWordArray = UserWord::whereIn('user_article_id', $userArticleIdArray)
            ->with([
                'word' => function ($query) {
                    $query->select('id', 'name', 'jp', 'meaning');
                },
                'word.wordToParse.parse' => function ($query) {
                    $query->select('id', 'name');
                }
            ])
            ->get();
        
        //統合
        $articleList = $mergedArticle->map(function ($userArticle) use ($userWordArray) {
            \Log::info($userArticle, ['userArticle' => $userArticle]);
            return [
                'title' => $userArticle->title,
                'article' => $userArticle->article,
                'article_theme' => $userArticle->articleTheme->name,
                'wordList' => $userWordArray->filter(function ($userWord) use ($userArticle) {
                    return $userWord->user_article_id === $userArticle->id;
                })->map(function ($userWord) {
                    $parseList = $userWord->word->wordToParse->map(function ($wordToParse) {
                        return $wordToParse->parse->name;
                    });
                    return [
                        'word' => $userWord->word->name,
                        'jp' => $userWord->word->jp,
                        'meaning' => $userWord->word->meaning,
                        'parse' => $parseList,
                    ];
                })->toArray()
            ];
        })->toArray();

        return response()->json(['articleList' => $articleList]);
    }
}


