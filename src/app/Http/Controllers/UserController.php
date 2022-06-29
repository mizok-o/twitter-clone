<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Follow;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * 認証ユーザーを除いたusersテーブル一覧を取得
     *
     * @return array<object, int>
     */
    public function index(User $user)
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
    public function show(int $userId, User $user)
    {
        return $user->getUserById($userId);
    }

    /**
     *  認証ユーザー情報とフォローしている人リストを取得
     *
     * @param  Follow $follow
     * @return array<int, object>
     */
    public function getAuthUserInfo(Follow $follow)
    {
        $user = auth()->user();
        $follows = $follow->getFollowsList($user->id);
        return [
            "user" => $user,
            "follows" => $follows
        ];
    }

    /**
     *  フォロー数カウント
     *
     * @param  int  $userId
     * @param  Follow $follow
     * @return int
     */
    public function countFollows(int $userId, Follow $follow)
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
    public function countFollowers(int $userId, Follow $follow)
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
