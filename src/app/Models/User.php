<?php

namespace App\Models;

use App\Consts\Paginate;
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
     *  認証ユーザー以外のユーザー一覧ページネートして取得
     *
     * @param int $authUserId
     * @return object
     */
    public function getAllUsers(int $authUserId): object
    {
        return $this->where('id', '<>', $authUserId)->orderBy('created_at')->paginate(Paginate::NUM_TWEET_PER_PAGE);
    }

    /**
     *  ID指定してユーザーを取得
     *
     * @param int $userId
     */
    public function getUserById(int $userId)
    {
        return $this->find($userId);
    }

    /**
     *  フォロー、フォロー解除するときに、'follows', 'follow_user_id', 'followed_user_id'を参照
     */
    public function followsAction()
    {
        return $this->belongsToMany(User::class, 'follows', 'follow_user_id', 'followed_user_id');
    }

    /**
     * フォロー、フォロー解除されるときに、'follows', 'followed_user_id', 'follow_user_id'を参照
     */
    public function beFollowedAction()
    {
        return $this->belongsToMany(User::class, 'follows', 'followed_user_id', 'follow_user_id');
    }

    /**
     * フォロー機能
     *
     * @param int $userId
     *
     * @see follow()
     */
    public function follow(int $userId)
    {
        return $this->followsAction()->attach($userId);
    }

    /**
     * フォロー解除機能
     *
     * @param int $userId
     *
     * @see unfollow()
     */
    public function unfollow(int $userId)
    {
        return $this->followsAction()->detach($userId);
    }

    /**
     * 認証されていないユーザーの場合400エラーで返す
     *
     * @param bool $isAuthUser
     */
    // public function checkIsAuth($request, $tweet)
    // {
    //     return Gate::forUser($request)->allows('store-tweet', $tweet);
    // }
}
