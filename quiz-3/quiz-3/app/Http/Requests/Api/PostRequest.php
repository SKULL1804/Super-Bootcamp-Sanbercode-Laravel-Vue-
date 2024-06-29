<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|max:255',
            'content' => 'sometimes|required',
        ];
    }

    public function messages() : array {
        return[
            'title.required' => 'name harus diisi',
            'title.max' => 'name memiliki maksimal 255 karakter',
            'content.required' => 'age harus diisi',
        ];
    }
}