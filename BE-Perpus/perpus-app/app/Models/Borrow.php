<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Borrow extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'load_date',
        'borrow_date',
        'book_id',
        'user_id',
        'returned'
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}