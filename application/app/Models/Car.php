<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Car",
 *     title="Car",
 *     description="Car Model",
 *     @OA\Property(property="id", type="integer", description="Car ID"),
 *     @OA\Property(property="code", type="string", description="Car Code"),
 *     @OA\Property(property="photo", type="string", description="Car Photo"),
 *     @OA\Property(property="city", type="string", description="Car City"),
 *     @OA\Property(property="brand", type="string", description="Car Brand"),
 *     @OA\Property(property="model", type="string", description="Car Model"),
 *     @OA\Property(property="description", type="string", description="Car Description"),
 *     @OA\Property(property="year", type="integer", description="Car Year"),
 *     @OA\Property(property="mileage", type="number", format="float", description="Car Mileage"),
 *     @OA\Property(property="gearbox_type", type="string", description="Car Gearbox Type"),
 *     @OA\Property(property="store_phone_number", type="string", description="Car Store Phone Number"),
 *     @OA\Property(property="value", type="number", format="double", description="Car Value"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Car Creation Date and Time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Car Update Date and Time"),
 * )
 */
class Car extends Model
{
    protected $fillable = [
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
    ];

    /**
     * Defines the relationship with the Finance model (one-to-many)
     */
    public function finances()
    {
        return $this->hasMany(Finance::class);
    }
}
