<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Auth::routes();

// Route::apiResource('users', UserController::class);

Route::get('/{any}', function () {
    return view('home');
})->where('any', '.*');
