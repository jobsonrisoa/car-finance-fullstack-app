<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__.'/../routes/web.php',
        // commands: __DIR__.'/../routes/console.php',
        // health: '/up',
        // then: function () {
        //     Route::middleware('api')
        //         ->prefix('webhooks')
        //         ->name('webhooks.')
        //         ->group(base_path('routes/car-routes.php'));
        // },
        commands: __DIR__.'/../routes/console.php',
        using: function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/car-routes.php'));

            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/finance-routes.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
