<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| apiの関数を追加する際はここに追記していく
|
*/

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{userId}', [UserController::class, 'show']);
