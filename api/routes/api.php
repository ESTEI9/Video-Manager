<?php

use App\Http\Controllers\VideoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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

Route::get('videos/{video}', [VideoController::class, 'getVideo']);
Route::get('videos/user/{userid}', [VideoController::class, 'getVideos']);
Route::post('shared', [VideoController::class, 'getSharedVideos']);
Route::post('videos', [VideoController::class, 'saveVideo']);
Route::post('edit', [VideoController::class, 'editVideo']);
Route::post('share', [VideoController::class, 'shareVideo']);
Route::post('login', [UserController::class, 'loginUser']);
Route::post('createUser', [UserController::class, 'createUser']);
Route::delete('delete/{videoId}', [VideoController::class, 'deleteVideo']);
