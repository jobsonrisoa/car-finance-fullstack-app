<?php

namespace App\Http\Requests\Car;

use Illuminate\Foundation\Http\FormRequest;

class CarRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'photo' => 'required|string',
            'city' => 'required|string',
            'brand' => 'required|string',
            'model' => 'required|string',
            'description' => 'required|string',
            'year' => 'required|integer',
            'mileage' => 'required|numeric',
            'gearbox_type' => 'required|string',
            'store_phone_number' => 'required|string',
            'value' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'photo.required' => 'The photo field is required.',
            'city.required' => 'The city field is required.',
            'brand.required' => 'The brand field is required.',
            'model.required' => 'The model field is required.',
            'description.required' => 'The description field is required.',
            'year.required' => 'The year field is required.',
            'year.integer' => 'The year field must be an integer value.',
            'mileage.required' => 'The mileage field is required.',
            'mileage.numeric' => 'The mileage field must be a numeric value.',
            'gearbox_type.required' => 'The gearbox type field is required.',
            'store_phone_number.required' => 'The store phone number field is required.',
            'value.required' => 'The value field is required.',
            'value.numeric' => 'The value field must be a numeric value.',
        ];
    }
}
