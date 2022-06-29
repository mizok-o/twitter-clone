<?php

namespace App\Http\Requests\Tweet;

use App\Http\Requests\BaseRequest;

class PostRequest extends BaseRequest
{
    /**
     * バリデーションのルール設定
     *
     * @return array
     */
    public function rules()
    {
        return [
            'text' => ['required', 'max:140']
        ];
    }
}
