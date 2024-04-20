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

        \Log::info('segmentId', ['segmentId' => $segmentId]);
        \Log::info('articleId', ['articleId' => $articleId]);
        
        //UserArticle関連取得
        $userArticleArray = UserArticle::where('user_id', $userId)
            ->where('segment_id', $segmentId)
            ->where('read_status', 0)
            ->with(['articleTheme' => function ($query) {
                $query->select('id', 'name');
            }])
            ->get(['id', 'title', 'article', 'article_theme_id']);

        //選択された記事を先頭 + 他ランダム表示
        $specificArticle = $userArticleArray->firstWhere('id', $articleId);
        \Log::info('specificArticle', ['specificArticle' => $specificArticle]);
        $otherArticle = $userArticleArray->where('id', '!=', $articleId)->shuffle();
        \Log::info('otherArticle', ['otherArticle' => $otherArticle]);
        $mergedArticle = collect([$specificArticle])->merge($otherArticle);

        \Log::info('mergedArticle', ['mergedArticle' => $mergedArticle]);

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
            \Log::info('userArticle', ['userArticle' => $userArticle]);
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

        \Log::info('articleList', ['articleList' => $articleList]);

        return response()->json(['articleList' => $articleList]);
    }
}


