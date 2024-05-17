<?php

namespace App\Services;

use App\Models\Car;
use App\Repositories\CarRepository;

class CarService
{
    protected CarRepository $carRepository;

    public function __construct(CarRepository $carRepository)
    {
        $this->carRepository = $carRepository;
    }

    public function getAll()
    {
        return $this->carRepository->getAll();
    }

    public function getById($id)
    {
        return $this->carRepository->getById($id);
    }

    public function create($request)
    {
        return $this->carRepository->create($request);
    }

    public function update($id, $request)
    {
        return $this->carRepository->update($id, $request);
    }

    public function delete($id)
    {
        return $this->carRepository->delete($id);
    }
}
