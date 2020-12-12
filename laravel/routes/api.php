<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PasswordResetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', function (Request $request) {
    //return $request->user();
    Auth::logout();
    return ['success' => true];
});

//Return details of logged in user
Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('events/get-details', [AuthController::class, 'getDetails']);
});


// Password Reset Routes...
Route::post('password/reset', [PasswordResetController::class, 'reset']);
Route::post('password/email', [PasswordResetController::class, 'sendResetLinkEmail']);



