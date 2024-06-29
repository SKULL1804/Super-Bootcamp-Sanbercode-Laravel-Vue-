<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
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
            'comment' => 'sometimes|required|max:255',
            'post_id' => 'sometimes|required'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'title harus diisi.',
            'post_id.required' => 'genre_id harus diisi.',
        ];
    }
}