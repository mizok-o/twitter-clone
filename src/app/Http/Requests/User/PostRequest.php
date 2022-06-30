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
            'screen_name' => ['required', 'max:20', 'unique:users'],
            'profile' => ['max:140']
        ];
    }
}
