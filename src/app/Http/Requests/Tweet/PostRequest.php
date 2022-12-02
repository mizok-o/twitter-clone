<?php

namespace App\Http\Requests\Tweet;

use App\Http\Requests\BaseRequest;
use Illuminate\Http\Request;

class PostRequest extends BaseRequest
{
    /**
     * バリデーションのルール設定
     *
     * @param Request $request
     * @return array
     */
    public function rules(Request $request)
    {
        if ($request->get('image')) {
            return [
                'image' => ['mimes:png,jpg,jpeg,webp', 'max:3000'],
                'text' => ['required', 'max:140']
            ];
        } else {
            return [
                'text' => ['required', 'max:140']
            ];
        }
    }
}
