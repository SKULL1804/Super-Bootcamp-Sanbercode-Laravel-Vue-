<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CastMovie extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'cast_movie';

    protected $fillable = [
        'cast_id',
        'movie_id',
    ];
}
