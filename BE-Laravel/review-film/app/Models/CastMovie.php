<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CastMovie extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'cast_movie';

    protected $fillable = [
        'name',
        'cast_id',
        'movie_id',
    ];

    public function movie() : BelongsTo {
        return $this->belongsTo(Movie::class);
    }

    public function cast() : BelongsTo {
        return $this->belongsTo(cast::class);
    }


}