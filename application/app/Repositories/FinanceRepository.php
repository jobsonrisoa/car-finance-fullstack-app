<?php

namespace App\Repositories;
use Illuminate\Http\Request;

use App\Models\Finance;

class FinanceRepository
{
    const DATE_FORMAT = 'Y-m-d H:i:s';

    protected $finance;

    public function __construct(Finance $finance)
    {
        $this->finance = $finance;
    }

    public function getAll()
    {
        return $this->finance->all();
    }

    public function getById($id)
    {
        return $this->finance->find($id);
    }

    public function create(array $data): Finance
    {
        return $this->finance->create($data);
    }

    public function update($id, $request)
    {
        $finance = $this->finance->find($id);

        if (!$finance) {
            return null;
        }

        $finance->fill($request->only([
            'car_id',
            'down_payment',
            'installments',
            'installment_value',
        ]));
        $finance->save();
        return $finance;
    }

    public function delete($id)
    {
        $finance = $this->finance->find($id);
        if ($finance) {
            $finance->delete();
            return true;
        }
        return false;
    }
}
