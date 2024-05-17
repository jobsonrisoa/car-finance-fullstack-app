<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CarRepository;
use App\Repositories\FinanceRepository;
use App\Models\Car;
use App\Models\Finance;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(CarRepository::class, function ($app) {
            return new CarRepository(new Car());
        });

        $this->app->bind(FinanceRepository::class, function ($app) {
            return new FinanceRepository(new Finance());
        });
    }
}
