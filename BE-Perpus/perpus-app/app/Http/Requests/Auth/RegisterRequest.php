<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required_with:password|same:password',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Name harus diisi',
            'email.required' => 'Email harus diisi.',
            'email.unique' => 'Email sudah dipakai',
            'password.required' => 'Password harus diisi.',
            'password.min' => 'Password harus memiliki setidaknya 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'password_confirmation.required_with' => 'Konfirmasi password harus diisi jika password diisi.',
            'password_confirmation.same' => 'Konfirmasi password harus sesuai dengan password.',
        ];
    }
}