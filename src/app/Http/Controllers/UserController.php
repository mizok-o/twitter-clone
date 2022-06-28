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
     * @return array<object, int>
     */
    public function index(User $user)
    {
        $users = $user->getAllUsers(auth()->id());

        $numUsers = User::get()->count();
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
    public function show(int $userId)
    {
        $user = User::find($userId);
        return $user;
    }

    /**
     *  認証ユーザー情報とフォローしている人リストを取得
     *
     * @return array<int, object>
     */
    public function getAuthUserInfo()
    {
        $user = auth()->user();
        $follows = Follow::where('follow_user_id', $user->id)->get('followed_user_id');
        return [
            "user" => $user,
            "follows" => $follows
        ];
    }

    /**
     *  認証ユーザーのIDを取得
     *
     * @return int
     */
    public function getAuthUserId()
    {
        return auth()->id();
    }

    /**
     * ユーザー情報編集
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user)
    {
        dd($user);
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

    /**
     *  フォロー数カウント
     *
     * @param  int  $userId
     * @return int
     */
    public function countFollows(int $userId)
    {
        return Follow::where('follow_user_id', $userId)->count();
    }

    /**
     *  フォロワー数カウント
     *
     * @param  int  $userId
     * @return int
     */
    public function countFollowers(int $userId)
    {
        return Follow::where('followed_user_id', $userId)->count();
    }

    /**
     *  フォロー機能
     *
     * @param  int  $userId
     */
    public function follow(int $userId)
    {
        auth()->user()->follow($userId);
    }

    /**
     *  フォロー解除機能
     *
     * @param  int  $userId
     */
    public function unfollow(int $userId)
    {
        auth()->user()->unfollow($userId);
    }
}
