<?php

namespace App\Http\Controllers\Finances;

use App\Http\Controllers\Controller;
use App\Services\FinanceService;
use App\Http\Requests\Finance\FinanceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FinanceController extends Controller
{
    protected FinanceService $financeService;

    public function __construct(FinanceService $financeService)
    {
        $this->financeService = $financeService;
    }

    /**
     * @OA\Get(
     *      path="/finances",
     *      summary="Get list of finances",
     *      description="Returns a list of all finances.",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items(ref="#/components/schemas/Finance")
     *          )
     *      )
     * )
     */
    public function index(): JsonResponse
    {
        try {
            $finances = $this->financeService->getAll();
            return response()->json($finances, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching finances.'], 500);
        }
    }

    /**
     * @OA\Post(
     *      path="/finances",
     *      summary="Create a new finance",
     *      description="Create a new finance with the provided data.",
     *      @OA\RequestBody(
     *          @OA\JsonContent(ref="#/components/schemas/Finance")
     *      ),
     *      @OA\Response(
     *          response=201,
     *          description="Finance created successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Finance")
     *      ),
     *      @OA\Response(
     *          response=422,
     *          description="Validation error"
     *      )
     * )
     */
    public function store(FinanceRequest $request): JsonResponse
    {
        try {
            $financeData = $this->financeService->create($request);
            return response()->json($financeData, 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while creating the finance.'], 500);
        }
    }

    /**
     * @OA\Get(
     *      path="/finances/{id}",
     *      summary="Get finance by ID",
     *      description="Get finance information by finance ID.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Finance ID",
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
     *          @OA\JsonContent(ref="#/components/schemas/Finance")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Finance not found"
     *      )
     * )
     */
    public function show(string $id): JsonResponse
    {
        try {
            $finance = $this->financeService->getById($id);
            if ($finance) {
                return response()->json($finance, 200);
            } else {
                throw new NotFoundHttpException('Finance not found.');
            }
        } catch (NotFoundHttpException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching the finance.'], 500);
        }
    }

    /**
     * @OA\Put(
     *      path="/finances/{id}",
     *      summary="Update finance",
     *      description="Update finance information.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Finance ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\RequestBody(
     *          @OA\JsonContent(ref="#/components/schemas/Finance")
     *      ),
     *      @OA\Response(
     *          response=200,
     *          description="Finance updated successfully",
     *          @OA\JsonContent(ref="#/components/schemas/Finance")
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Finance not found"
     *      )
     * )
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $finance = $this->financeService->update($id, $request->all());
            return response()->json($finance, 200);
        } catch (NotFoundHttpException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the finance.'], 500);
        }
    }

    /**
     * @OA\Delete(
     *      path="/finances/{id}",
     *      summary="Delete finance",
     *      description="Delete finance by finance ID.",
     *      @OA\Parameter(
     *          name="id",
     *          description="Finance ID",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer",
     *              format="int64"
     *          )
     *      ),
     *      @OA\Response(
     *          response=204,
     *          description="Finance deleted successfully"
     *      ),
     *      @OA\Response(
     *          response=404,
     *          description="Finance not found"
     *      )
     * )
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->financeService->delete($id);
            return response()->json(null, 204);
        } catch (NotFoundHttpException $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the finance.'], 500);
        }
    }
}
