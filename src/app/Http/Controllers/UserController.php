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
     *  認証ユーザー情報とフォローしている人リストを取得
     *
     * @return array<int, object>
     */
    public function getAuthUserInfo()
    {
        $user = auth()->user();
        $follows = Follows::where('follow_user_id', $user->id)->get('followed_user_id');
        return [
            "userId" => $user->id,
            "follows" => $follows
        ];
    }

    /**
     *  フォロー数カウント
     *
     * @param  int  $userId
     * @return int
     */
    public function countFollows(int $userId)
    {
        return Follows::where('follow_user_id', $userId)->count();
    }

    /**
     *  フォロワー数カウント
     *
     * @param  int  $userId
     * @return int
     */
    public function countFollowers(int $userId)
    {
        return Follows::where('followed_user_id', $userId)->count();
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
