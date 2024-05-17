<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Cars\CarController;

/*
|--------------------------------------------------------------------------
| Car Routes
|--------------------------------------------------------------------------
|
| Here is where you can register car routes for your application.
|
*/

Route::prefix('/v1/jobson')->group(function () {
    Route::prefix('/cars')->group(function () {
        Route::get('/', [CarController::class, 'index']);
        Route::post('/', [CarController::class, 'store']);
        Route::get('/{id}', [CarController::class, 'show']);
        Route::put('/{id}', [CarController::class, 'update']);
        Route::delete('/{id}', [CarController::class, 'destroy']);
    });
});
