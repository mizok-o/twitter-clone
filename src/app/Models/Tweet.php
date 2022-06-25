<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;

class Tweets extends Authenticatable
{

    use HasFactory, Notifiable;

    protected $guarded = [
        'id', 'user_id', 'created_at', 'updated_at'
    ];
}
