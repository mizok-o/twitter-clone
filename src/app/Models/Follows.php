<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Follows extends Authenticatable
{

    use Notifiable, HasFactory;

    protected $fillable = ['follow_user_id', 'followed_user_id'];
    public $timestamps = false;
}
