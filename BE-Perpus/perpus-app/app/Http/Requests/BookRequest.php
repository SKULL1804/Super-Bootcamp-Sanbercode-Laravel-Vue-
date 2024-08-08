<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
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
            'stok' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg',
            'category_id' => 'required|exists:categories,id'
        ];
    }


    public function messages(): array
    {
        return [
            'title.required' => 'Judul buku harus diisi.',
            'summary.required' => 'Ringkasan buku haraus diisi.',
            'stok.required' => 'Stok buku harus diisi.',
            'stok.integer' => 'Stok harus berupa angka.',
            'image.image' => 'File image harus berupa gambar.',
            'poster.mimes' => 'Poster harus berformat jpeg, png, jpg, atau bmp.',
            'category_id.required' => 'Kategori buku diperlukan.',
        ];
    }
}