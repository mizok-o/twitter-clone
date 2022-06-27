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

    /**
     *  フォローしてるIDリストを取得
     *
     * @param  int  $userId
     * @return object
     */
    public function getFollowIds(int $user_id)
    {
        return $this->where('follow_user_id', $user_id)->get('followed_user_id')->pluck('followed_user_id')->toArray();
    }
}
