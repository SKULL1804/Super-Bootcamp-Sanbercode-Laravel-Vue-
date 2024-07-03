<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            'critic' => 'required',
            'rating' => 'required|between: 1,5',
            'movie_id' => 'required|exists:movies,id',
        ];
    }

    public function messages(): array
    {
        return [
            'critic.required' => 'critic harus diisi.',
            'rating.required' => 'rating harus diisi.',
            'movie_id.required' => 'movie_id harus diisi.',
        ];
    }
}