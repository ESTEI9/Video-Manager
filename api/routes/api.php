<?php

use App\Http\Controllers\VideoController;
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
Route::get('videos', [VideoController::class, 'getAllVideos']);
Route::post('videos', [VideoController::class, 'saveVideo']);
