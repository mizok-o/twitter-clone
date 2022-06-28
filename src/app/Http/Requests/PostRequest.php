<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostRequest extends FormRequest
{
    /**
     * バリデーションを行うために設定
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

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

    /**
     * バリデーションエラーごとののテキスト
     *
     * @return array
     */
    public function messages()
    {
        return [
            'text.required' => 'ツイートを入力してください。',
            'text.max' => '140字以内で入力してください。',
        ];
    }

    /**
     * バリデーションエラーをjsonでAPIに返す
     *
     * @param Validator $validator
     * @return HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errorResponse = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($errorResponse, 401));
    }
}
