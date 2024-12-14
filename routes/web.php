<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MajorSegmentController;
use App\Http\Controllers\SegmentController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\WordController;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//auth
require __DIR__.'/auth.php';

//user_api
Route::prefix('/api')->group(function () {
    Route::get('/user',[UserController::class, 'index']);
    Route::prefix('/major-segment')->group(function () {
        Route::get('/',[MajorSegmentController::class, 'index']);
        Route::get('/statuses',[MajorSegmentController::class, 'userMajorSegmentStatus']);
    });
    Route::prefix('/segment')->group(function () {
        Route::get('/{id}',[SegmentController::class, 'index']);
        Route::get('/statuses/{id}', [SegmentController::class, 'userMajorSegmentStatus']);
        Route::post('/generate/{id}', [SegmentController::class, 'generateArticle']);
        Route::get('/reading-status/{id}', [SegmentController::class, 'readingStatus']);
        Route::get('/cycle/{id}', [SegmentController::class, 'userSegmentCycle']);
        Route::get('/update-reading-status/{segmentId}', [SegmentController::class, 'updateReadingStatus']);
        Route::get('/update-middle-reading-status/{segmentId}/{articleCount}', [SegmentController::class, 'updateMiddleReadingStatus']);
        Route::get('/word-result/{segmentId}', [SegmentController::class, 'wordResult']);
    });
    Route::prefix('/article')->group(function () {
        Route::get('/{segmentId}/{articleId}',[ArticleController::class,'index']);
    });
    Route::prefix('/word')->group(function () {
        Route::get('/{segmentId}', [WordController::class, 'index']);
        Route::post('/answer/{segmentId}', [WordController::class, 'saveAnswer']);
    });
});

Route::post('/text-to-speech', [TextToSpeechController::class, 'convert']);

//apiを通すために、最後の記述する
Route::get('/{reactRoutes?}', function () {
    return view('top');
})->where('reactRoutes', '.*')->middleware(['auth', 'verified'])->name('top');



