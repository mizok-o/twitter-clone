<?php

use App\Http\Controllers\TweetController;
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
    // ユーザー
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{userId}', [UserController::class, 'show']);
    Route::get('/auth-user-id', [UserController::class, 'getAuthUserId']);
    Route::post('/auth-user', [UserController::class, 'getAuthuserInfo']);
    Route::post('/edit-user/{userId}', [UserController::class, 'update']);
    // フォロー
    Route::get('/count-follows/{userId}', [UserController::class, 'countFollows']);
    Route::get('/count-followers/{userId}', [UserController::class, 'countFollowers']);
    Route::post('/follow-{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow-{userId}', [UserController::class, 'unfollow']);

    // ツイート
    Route::get('/tweets', [TweetController::class, 'index']);
    Route::get('/tweets/{userId}', [TweetController::class, 'show']);
    Route::post('/post-tweet', [TweetController::class, 'store']);
    Route::post('/edit-tweet/{tweetId}', [TweetController::class, 'update']);
    Route::post('/destroy-tweet/{tweetId}', [TweetController::class, 'destroy']);
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
