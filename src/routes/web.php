<?php

use App\Http\Controllers\ReplyController;
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

Route::group(['middleware' => 'auth'], function () {
    Route::get('/home/{any}', function () {
        return view('home');
    })->where('any', '.*');

    /*
    ユーザー
    */
    Route::get('/auth-user', [UserController::class, 'getAuthUser']);
    Route::get('/auth-user/follows', [UserController::class, 'getAuthUserFollows']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users-all', [UserController::class, 'getAllUsers']);
    Route::get('/users/{userId}', [UserController::class, 'show']);
    Route::post('/edit-user/{userId}', [UserController::class, 'update']);

    /*
    フォロー
    */
    Route::get('/users-follows/{userId}', [UserController::class, 'getFollowUsers']);
    Route::get('/users-followers/{userId}', [UserController::class, 'getFollowedUsers']);
    Route::get('/count-follows/{userId}', [UserController::class, 'countFollows']);
    Route::get('/count-followers/{userId}', [UserController::class, 'countFollowers']);
    Route::post('/follow-{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow-{userId}', [UserController::class, 'unfollow']);

    /*
    ツイート
    */
    Route::get('/tweets', [TweetController::class, 'index']);
    Route::get('/tweets/{tweetId}', [TweetController::class, 'show']);
    Route::get('/tweets-list/{userId}', [TweetController::class, 'getUserTweets']);
    Route::get('/tweets-only-follows', [TweetController::class, 'getAllTweets']);
    Route::post('/tweet', [TweetController::class, 'store']);
    Route::put('/tweet/{tweetId}', [TweetController::class, 'update']);
    Route::delete('/tweet/{tweetId}', [TweetController::class, 'destroy']);

    /*
    リプライ
    */
    Route::get('/replys/{tweetId}', [ReplyController::class, 'getRepliesByTweetId']);
    Route::post('/reply/{tweetId}', [ReplyController::class, 'store']);
    Route::put('/reply/{replyId}', [ReplyController::class, 'update']);
    Route::delete('/reply/{replyId}', [ReplyController::class, 'destroy']);

    /*
    いいね
    */
    Route::get('/favs/{tweetId}', [FavoriteController::class, 'showTweetFav']);
    Route::post('/fav/{tweetId}', [FavoriteController::class, 'store']);
    Route::delete('/fav/{favId}', [FavoriteController::class, 'destroy']);
});

Route::get('/', function () {
    return view('auth');
});

Route::get('/', function () {
    return redirect('/register');
});
