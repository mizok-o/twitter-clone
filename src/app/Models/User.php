<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'user_name', 'screen_name', 'email', 'password'
    ];

    /**
     *  フォロー、フォロー解除するときに、'follows', 'follow_user_id', 'followed_user_id'を参照
     */
    public function _follow()
    {
        return $this->belongsToMany(User::class, 'follows', 'follow_user_id', 'followed_user_id');
    }

    /**
     * フォロー、フォロー解除されるときに、'follows', 'followed_user_id', 'follow_user_id'を参照
     */
    public function _follower()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_user_id', 'follow_user_id');
    }

    /**
     *  認証ユーザー以外のユーザーを呼び出し
     *
     * @param int $authUserId
     *
     */
    public function getAllUsers(int $authUserId)
    {
        return $this->where('id', '<>', $authUserId)->paginate(2);
    }

    /**
     * フォロー機能
     *
     * @param int $userId
     *
     * @see followers()
     */
    public function follow(int $userId)
    {
        return $this->_follow()->attach($userId);
    }

    /**
     * フォロー解除機能
     *
     * @param int $userId
     *
     * @see followers()
     */
    public function unfollow(int $userId)
    {
        // dd($this->id);
        return $this->_follow()->detach($userId);
    }
}
