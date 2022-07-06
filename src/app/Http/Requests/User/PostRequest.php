<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;
use Illuminate\Http\Request;

class PostRequest extends BaseRequest
{
    /**
     * バリデーションのルール設定
     * imageが無い場合はバリデーションを外す
     *
     * @return array
     */
    public function rules(Request $request)
    {
        if ($request->get('image')) {
            return [
                'image' => ['mimes:png,jpg,jpeg,webp', 'max:3000'],
                'screen_name' => ['required', 'max:20'],
                'profile' => ['max:140']
            ];
        } else {
            return [
                'screen_name' => ['required', 'max:20'],
                'profile' => ['max:140']
            ];
        }
    }
}
