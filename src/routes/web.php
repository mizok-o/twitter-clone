<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use App\Models\Follows;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

    Route::post('/follow/{userId}', [UserController::class, 'follow']);
    Route::post('/unfollow/{userId}', [UserController::class, 'unfollow']);
    Route::post('/authuser', [UserController::class, 'getAuthuserInfo']);

    Route::post('/checkFollowing/{userId}', [UserController::class, 'checkFollowing']);
    Route::post('/checkFollowed/{userId}', [UserController::class, 'checkFollowed']);
});

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
