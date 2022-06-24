<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Auth::routes();


Route::middleware('auth')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{userId}', [UserController::class, 'show']);
    // フォロー数カウント
    Route::get('/countFollows/{userId}', [UserController::class, 'countFollows']);
    Route::get('/countFollowers/{userId}', [UserController::class, 'countFollowers']);

    Route::post('/follow/{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow/{userId}', [UserController::class, 'unfollow']);
    Route::post('/authuser', [UserController::class, 'getAuthuserInfo']);
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
