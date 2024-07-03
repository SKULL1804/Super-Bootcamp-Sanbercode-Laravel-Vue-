<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'genre_id',
        'title',
        'summary',
        'poster',
        'year',
    ];

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }

    public function listCast()
    {
        return $this->belongsToMany(Cast::class, 'cast_movie', 'movie_id', 'cast_id');
    }

    public function listReview()
    {
        return $this->hasMany(Review::class, 'movie_id');
    }
}