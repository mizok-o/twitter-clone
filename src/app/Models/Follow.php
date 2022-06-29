<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Follow extends Authenticatable
{

    use Notifiable, HasFactory;

    protected $fillable = ['follow_user_id', 'followed_user_id'];
    public $timestamps = false;

    /**
     *  フォローしているリストを取得する
     *
     * @param int $userId
     */
    public function getFollowsList(int $userId)
    {
        return $this->where('follow_user_id', $userId)->get('followed_user_id');
    }

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

    /**
     *  フォローしてるIDリストを取得　
     *
     * @param  string $columnName
     * @param  int  $userId
     * @return int
     */
    public function countFollowsNum(string $columnName, int $userId): int
    {
        return $this->where($columnName, $userId)->count();
    }
}
