<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use App\Repositories\FinanceRepository;
use App\Repositories\CarRepository;
use App\Http\Requests\Finance\FinanceRequest;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class FinanceService
{
    protected FinanceRepository $financeRepository;
    protected CarRepository $carRepository;

    const ALL_FINANCE_DATA_KEY = 'all_finance_data';
    const FINANCE_DATA_KEY_PREFIX = 'id:';

    public function __construct(CarRepository $carRepository, FinanceRepository $financeRepository)
    {
        $this->financeRepository = $financeRepository;
        $this->carRepository = $carRepository;
    }

    public function getAll()
    {
        $cachedData = Redis::get(self::ALL_FINANCE_DATA_KEY);

        if ($cachedData) {
            return json_decode($cachedData, true);
        }

        $financeData = $this->financeRepository->getAll();

        Redis::set(self::ALL_FINANCE_DATA_KEY, json_encode($financeData));
        Redis::expire(self::ALL_FINANCE_DATA_KEY, 3600);

        return $financeData;
    }

    public function getById($uuid)
    {
        $key = self::FINANCE_DATA_KEY_PREFIX . $uuid;

        $serializedData = Redis::get($key);

        if ($serializedData) {
            return json_decode($serializedData, true);
        }

        $data = $this->financeRepository->getById($uuid);

        if ($data) {
            Redis::set($key, json_encode($data));
            Redis::expire($key, 3600);
        }

        return $data;
    }

    public function create(FinanceRequest $request): JsonResponse
    {
        $carId = $request->input('car_id');
        $car = $this->getCarData($carId);

        if ($car === null) {
            throw ValidationException::withMessages(['car_id' => 'Finance Calculation Error: Car does not exist.']);
        }

        $downPayment = $request->input('down_payment');
        if ($downPayment > $car->value) {
            throw ValidationException::withMessages(['down_payment' => 'Finance Calculation Error: Down payment cannot be greater than the car value.']);
        }

        $installmentValues = $this->calculateInstallmentsValue($car->value, $downPayment);

        if (empty($installmentValues)) {
            throw ValidationException::withMessages(['installments' => 'Finance Calculation Error: Invalid installment values.']);
        }

        $financeData = [
            'uuid' => Uuid::uuid4()->toString(),
            'car_id' => $car->id,
            'down_payment' => $downPayment,
            'installment_values' => $installmentValues, // Ensure installment values are set
        ];

        // Save the finance data to the database
        $this->financeRepository->create($financeData);

        // Cache the finance request data in Redis
        $this->cacheFinanceData($financeData);

        // Return the created finance data as JSON, including the installment values
        return response()->json($financeData, 201);
    }

    public function update($uuid, array $financeData)
    {
        $updatedData = $this->financeRepository->update($uuid, $financeData);

        $key = self::FINANCE_DATA_KEY_PREFIX . $uuid;
        Redis::set($key, json_encode($updatedData));
        Redis::expire($key, 3600);

        $this->updateAllFinanceDataCache($uuid, $updatedData);

        return $updatedData;
    }

    public function delete($uuid)
    {
        $this->financeRepository->delete($uuid);

        $key = self::FINANCE_DATA_KEY_PREFIX . $uuid;
        Redis::del($key);

        $this->removeFromAllFinanceDataCache($uuid);

        return true;
    }

    protected function getCarData($carId)
    {
        return $this->carRepository->getById($carId);
    }

    protected function calculateInstallmentsValue($carValue, $downPayment)
    {
        if ($downPayment > $carValue) {
            trigger_error('Finance Calculation Error: Down payment cannot be greater than the car value.', E_USER_ERROR);
            return [];
        }

        $installmentsOptions = [
            6 => 12.47,
            12 => 15.56,
            48 => 18.69,
        ];

        $installmentsValues = [];

        foreach ($installmentsOptions as $months => $growthPercentage) {
            $carValueAfterGrowth = $carValue * (1 + ($growthPercentage / 100));
            $financedAmount = $carValueAfterGrowth - $downPayment;
            $installmentAmount = $financedAmount / $months;

            if ($installmentAmount < 0) {
                trigger_error('Finance Calculation Error: Calculated installment value cannot be negative.', E_USER_ERROR);
                return [];
            }

            $installmentsValues[$months] = $installmentAmount;
        }

        return $installmentsValues;
    }

    protected function cacheFinanceData($data)
    {
        $key = self::FINANCE_DATA_KEY_PREFIX . $data['uuid'];
        $serializedData = json_encode($data);

        Redis::set($key, $serializedData);
        Redis::expire($key, 3600);

        $this->addToAllFinanceDataCache($data);
    }

    protected function addToAllFinanceDataCache($data)
    {
        $cachedAllData = Redis::get(self::ALL_FINANCE_DATA_KEY);
        $allData = $cachedAllData ? json_decode($cachedAllData, true) : [];

        $allData[] = $data;
        Redis::set(self::ALL_FINANCE_DATA_KEY, json_encode($allData));
        Redis::expire(self::ALL_FINANCE_DATA_KEY, 3600);
    }

    protected function updateAllFinanceDataCache($uuid, $updatedData)
    {
        $cachedAllData = Redis::get(self::ALL_FINANCE_DATA_KEY);

        if ($cachedAllData) {
            $allData = json_decode($cachedAllData, true);
            foreach ($allData as &$item) {
                if (isset($item['uuid']) && $item['uuid'] == $uuid) {
                    $item = $updatedData;
                    break;
                }
            }
            Redis::set(self::ALL_FINANCE_DATA_KEY, json_encode($allData));
            Redis::expire(self::ALL_FINANCE_DATA_KEY, 3600);
        }
    }

    protected function removeFromAllFinanceDataCache($uuid)
    {
        $cachedAllData = Redis::get(self::ALL_FINANCE_DATA_KEY);

        if ($cachedAllData) {
            $allData = json_decode($cachedAllData, true);
            $allData = array_filter($allData, function ($item) use ($uuid) {
                return isset($item['uuid']) && $item['uuid'] !== $uuid;
            });
            Redis::set(self::ALL_FINANCE_DATA_KEY, json_encode($allData));
            Redis::expire(self::ALL_FINANCE_DATA_KEY, 3600);
        }
    }

    protected function saveFinanceDataToDatabase($data)
    {
        return $this->financeRepository->create($data);
    }
}
