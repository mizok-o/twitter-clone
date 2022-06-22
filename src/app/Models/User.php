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
     *  'follows', 'follow_user_id', 'followed_user_id'を参照
     */
    public function _follow()
    {
        return $this->belongsToMany(User::class, 'follows', 'follow_user_id', 'followed_user_id');
    }

    /**
     * 'follows', 'followed_user_id', 'follow_user_id'を参照
     */
    public function _unfollow()
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
     * @param Int $userId
     *
     * @see followers()
     */
    public function follow(int $userId)
    {
        // dd($userId, auth()->user()->_follower()->count());
        return auth()->user()->_follow()->attach($userId);
    }

    /**
     * アンフォロー機能
     * _followerの定義通りにフォロー解除したデータを更新する
     *
     * @param Int $userId
     *
     * @see followers()
     */
    public function unfollow(int $userId)
    {
        return auth()->user()->_unfollow()->detach($userId);
    }

    /**
     * フォローされているかどうかを、_follow中間テーブル内のレコードの有無で判断する。
     *
     * @param Int $userId
     *
     * @see followers()
     */
    // public function isFollowing(Int $userId)
    // {
    //     // dd($userId);
    //     dd("test", $this->_follow());
    //     return $this->_follow()->where('followed_user_id', $userId);
    // }
}
