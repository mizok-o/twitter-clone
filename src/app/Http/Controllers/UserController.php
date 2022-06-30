<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Follow;

class UserController extends Controller
{
    /**
     * 認証ユーザーを除いたusersテーブル一覧を取得
     *
     * @param  User $user
     * @return array<object, int>
     */
    public function index(User $user): array
    {
        $users = $user->getAllUsers(auth()->id());
        $numUsers = $users->count();

        return [
            "users" => $users,
            "numUsers" => $numUsers
        ];
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @param  int  $userId
     * @return object
     */
    public function show(int $userId, User $user): object
    {
        return $user->getUserById($userId);
    }

    /**
     *  認証ユーザーを取得
     *
     * @return object
     */
    public function getAuthUser(): object
    {
        return auth()->user();
    }

    /**
     *  認証ユーザー情報とフォローしている人リストを取得
     *
     * @param  Follow $follow
     * @return object
     */
    public function getAuthUserFollows(Follow $follow): object
    {
        return $follow->getFollowsList(auth()->id());
    }

    /**
     *  フォロー数カウント
     *
     * @param  int  $userId
     * @param  Follow $follow
     * @return int
     */
    public function countFollows(int $userId, Follow $follow): int
    {
        return $follow->countFollowsNum('follow_user_id', $userId);
    }

    /**
     *  フォロワー数カウント
     *
     * @param  int  $userId
     * @param  Follow $follow
     * @return int
     */
    public function countFollowers(int $userId, Follow $follow): int
    {
        return $follow->countFollowsNum('followed_user_id', $userId);
    }

    /**
     *  フォロー機能
     *
     * @param  int  $userId
     */
    public function follow(int $userId, User $user)
    {
        $user->follow($userId);
        return;
    }

    /**
     *  フォロー解除機能
     *
     * @param  int  $userId
     */
    public function unfollow(int $userId, User $user)
    {
        $user->unfollow($userId);
        return;
    }
}
