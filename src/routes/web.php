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
    Route::get('/auth-user', [UserController::class, 'getAuthUser']);
    Route::get('/auth-user/follows', [UserController::class, 'getAuthUserFollows']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{userId}', [UserController::class, 'show']);
    Route::put('/edit-user/{tweetId}', [UserController::class, 'update']);

    Route::get('/count-follows/{userId}', [UserController::class, 'countFollows']);
    Route::get('/count-followers/{userId}', [UserController::class, 'countFollowers']);

    Route::get('/tweets', [TweetController::class, 'index']);
    Route::get('/tweets/{userId}', [TweetController::class, 'show']);

    Route::post('/post-tweet', [TweetController::class, 'store']);
    Route::put('/edit-tweet/{tweetId}', [TweetController::class, 'update']);
    Route::delete('/destroy-tweet/{tweetId}', [TweetController::class, 'destroy']);

    Route::post('/follow-{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow-{userId}', [UserController::class, 'unfollow']);
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
