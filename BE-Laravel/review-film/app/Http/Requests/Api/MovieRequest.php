<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class MovieRequest extends FormRequest
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
            'title' => 'required|max:255',
            'summary' => 'required',
            'year' => 'required',
            'poster' => 'nullable|image|mimes:png,jpg,bmp',
            'genre_id' => 'required|exists:genres,id'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'title harus diisi.',
            'summary.required' => 'summary harus diisi.',
            'poster.mimes' => 'gambar hanya berformat png, jpg, bmp',
            'genre_id.required' => 'genre_id harus diisi.',
        ];
    }
}