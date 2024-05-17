<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Cars\CarController;
use App\Http\Controllers\Finances\FinanceController;

/*
|--------------------------------------------------------------------------
| Finance Routes
|--------------------------------------------------------------------------
|
| Here is where you can register finance routes for your application.
|
*/

Route::prefix('/v1/jobson')->group(function () {
    Route::prefix('/finances')->group(function () {
        Route::get('/', [FinanceController::class, 'index']);
        Route::post('/', [FinanceController::class, 'store']);
        Route::get('/{id}', [FinanceController::class, 'show']);
        Route::put('/{id}', [FinanceController::class, 'update']);
        Route::delete('/{id}', [FinanceController::class, 'destroy']);
    });
});
