<?php

namespace App\Http\Requests\Finance;

use Illuminate\Foundation\Http\FormRequest;

class FinanceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'car_id' => 'required|integer',
            'down_payment' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'car_id.required' => 'The car_id field is required.',
            'car_id.integer' => 'The car_id field must be an integer value.',
            'down_payment.required' => 'The down payment field is required.',
            'down_payment.numeric' => 'The down payment field must be a numeric value.',
        ];
    }
}
