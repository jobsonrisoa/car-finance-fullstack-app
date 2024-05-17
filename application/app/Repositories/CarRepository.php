<?php

namespace App\Repositories;

use App\Models\Car;
use Illuminate\Support\Facades\Hash;

class CarRepository
{
    const DATE_FORMAT = 'Y-m-d H:i:s';

    protected $car;

    public function __construct(Car $car)
    {
        $this->car = $car;
    }

    public function getAll()
    {
        return $this->car->all();
    }

    public function getById($id)
    {
        return $this->car->find($id);
    }

    public function create($request)
    {
        $car = new Car;
        $car->fill($request->only([
            'code',
            'photo',
            'city',
            'brand',
            'model',
            'description',
            'year',
            'mileage',
            'gearbox_type',
            'store_phone_number',
            'value',
        ]));
        $car->save();
        return $car;
    }

    public function update($id, $request)
    {
        $car = $this->model->find($id);

        if (!$car) {
            return null;
        }

        $car->fill($car->only([
            'code',
            'photo',
            'city',
            'brand',
            'model',
            'description',
            'year',
            'mileage',
            'gearbox_type',
            'store_phone_number',
            'value',
        ]));
        $car->save();
        return $car;
    }

    public function delete($id)
    {
        $car = $this->car->find($id);
        if ($car) {
            $car->delete();
            return true;
        }
        return false;
    }
}
