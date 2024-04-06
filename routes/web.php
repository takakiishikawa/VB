<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MajorSegmentController;
use App\Http\Controllers\SegmentController;

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
    });
});

//apiを通すために、最後の記述する
Route::get('/{reactRoutes?}', function () {
    return view('top');
})->where('reactRoutes', '.*')->middleware(['auth', 'verified'])->name('top');


