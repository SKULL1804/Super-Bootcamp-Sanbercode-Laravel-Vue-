<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cast extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'age',
        'biodata',
    ];

    public function listMovie()
    {
        return $this->belongsToMany(Movie::class, 'cast_movie', 'cast_id', 'movie_id');
    }


}