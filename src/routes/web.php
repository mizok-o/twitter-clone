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
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{userId}', [UserController::class, 'show']);

    Route::get('/count-follows/{userId}', [UserController::class, 'countFollows']);
    Route::get('/count-followers/{userId}', [UserController::class, 'countFollowers']);

    Route::get('/tweets', [TweetController::class, 'index']);
    Route::get('/tweets/{userId}', [TweetController::class, 'show']);
    Route::post('/post-tweet', [TweetController::class, 'store']);

    Route::post('/follow-{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow-{userId}', [UserController::class, 'unfollow']);
    Route::post('/auth-user', [UserController::class, 'getAuthuserInfo']);
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
