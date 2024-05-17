<?php

namespace App\Http\Controllers\Cars;

use Illuminate\Http\Request;
use App\Services\CarService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Car\CarRequest;
use OpenApi\Annotations as OA;

class CarController extends Controller
{
    protected $carService;

    public function __construct(CarService $carService)
    {
        $this->carService = $carService;
    }

    /**
     * @OA\Get(
     *      path="/cars",
     *      summary="Get list of cars",
     *      description="Returns a list of all cars.",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Car")
     *          )
     *      )
     * )
     */
    public function index()
    {
        return $this->carService->getAll();
    }

    /**
     * @OA\Post(
     *      path="/cars",
     *      summary="Create a new car",
     *      description="Create a new car with the provided data.",
     *      @OA\RequestBody(
     *          @OA\JsonContent(ref="#/components/schemas/Car")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Car created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Car")
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(CarRequest $request)
    {
        return $this->carService->create($request);
    }

    /**
     * @OA\Get(
     *      path="/cars/{id}",
     *      summary="Get car by ID",
     *      description="Get car information by car ID.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Car ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(ref="#/components/schemas/Car")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Car not found"
     *      )
     * )
     */
    public function show(int $id)
    {
        return $this->carService->getById($id);
    }

    /**
     * @OA\Put(
     *      path="/cars/{id}",
     *      summary="Update car",
     *      description="Update car information.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Car ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          @OA\JsonContent(ref="#/components/schemas/Car")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Car updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Car")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Car not found"
     *      )
     * )
     */
    public function update(CarRequest $request, int $id)
    {
        return $this->carService->update($id, $request);
    }

    /**
     * @OA\Delete(
     *      path="/cars/{id}",
     *      summary="Delete car",
     *      description="Delete car by car ID.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Car ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Car deleted successfully"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Car not found"
     *      )
     * )
     */
    public function destroy(int $id)
    {
        return $this->carService->delete($id);
    }
}
