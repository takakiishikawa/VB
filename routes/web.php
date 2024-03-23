<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


//user
Route::get('/user',[UserController::class, 'index']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});









//admin


//apiを通すために、最後の記述する
Route::get('/{reactRoutes?}', function () {
    return view('top');
})->where('reactRoutes', '.*')->middleware(['auth', 'verified'])->name('top');


require __DIR__.'/auth.php';
