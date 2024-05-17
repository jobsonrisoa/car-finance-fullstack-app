<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finance extends Model
{
    protected $fillable = [
        'car_id',
        'down_payment',
        'installments',
        'installment_value',
    ];

    protected $casts = [
        'installment_values' => 'array',
    ];

    /**
     * Defines the relationship with the Car model (many-to-one)
     */
    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
