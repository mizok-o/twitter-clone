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
     *  認証ユーザーのフォロー、フォロー解除機能'follows', 'follow_user_id', 'followed_user_id'を参照
     */
    public function _follow()
    {
        return $this->belongsToMany(User::class, 'follows', 'follow_user_id', 'followed_user_id');
    }

    /**
     * 'follows', 'followed_user_id', 'follow_user_id'を参照
     */
    public function _follower()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_user_id', 'follow_user_id');
    }

    /**
     *  'follows', 'follow_user_id', 'followed_user_id'を参照
     */
    public function getAllUsers(int $userId)
    {
        return $this->where('id', '<>', $userId)->paginate(2);
    }

    /**
     * フォロー機能
     * _followの定義通りにフォローしたデータを保存する
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
     * アンフォロー機能
     * _followerの定義通りにフォロー解除したデータを更新する
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
