<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Follows;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * 認証ユーザーを除いたusersテーブル一覧を取得
     *
     * @return array<object, int>
     */
    public function index(User $user)
    {
        $users = $user->getAllUsers(auth()->user()->id);

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
     *  Followsテーブル一覧と認証ユーザー情報を取得
     *
     * @return array<object, object>
     */
    public function getAuthUserInfo()
    {
        $follows = Follows::all();
        $authuser = auth()->user();

        return [
            "follows" => $follows,
            "authuser" => $authuser
        ];
    }

    /**
     *  フォロー機能
     *
     * @param  int  $userId
     * @return function
     */
    public function follow(int $userId)
    {
        $followUser = auth()->user()->follow($userId);
        return $followUser;
    }

    /**
     *  フォロー解除機能
     *
     * @param  int  $userId
     * @return function
     */
    public function unfollow(int $userId)
    {
        $unfollowUser = auth()->user()->unfollow($userId);
        return $unfollowUser;
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
