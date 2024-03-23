<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MajorSegmentController;

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
    Route::get('/major-segment',[MajorSegmentController::class, 'index']);
});

//apiを通すために、最後の記述する
Route::get('/{reactRoutes?}', function () {
    return view('top');
})->where('reactRoutes', '.*')->middleware(['auth', 'verified'])->name('top');


