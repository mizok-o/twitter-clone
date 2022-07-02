<?php

namespace App\Http\Requests\User;

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
            'image' => ['mimes:png,jpg,jpeg,webp', 'max:800'],
            'screen_name' => ['required', 'max:20'],
            'profile' => ['max:140']
        ];
    }
}
