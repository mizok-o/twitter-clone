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
     * usersテーブル一覧を取得
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $users = $user->getAllUsers(auth()->user()->id);

        $numUsers = User::get()->count();
        // dd($unfollowUser, json_encode($unfollowUser));

        // return [
        //     $users,
        //     $numUsers
        // ];
        // dd(gettype($users));
        return [
            "users" => $users,
            "numUsers" => $numUsers
        ];
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function show(int $userId)
    {
        $user = User::find($userId);
        return $user;
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @return \Illuminate\Http\Response
     */
    public function getAuthuserInfo()
    {
        $follows = Follows::all();
        $authuser = auth()->user();

        return [
            $follows,
            $authuser
        ];
    }

    /**
     *  フォロー機能
     *
     * $authUser: フォローする側のID
     * $userId: フォローされる側のID
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function follow(int $userId)
    {
        $followUser = auth()->user()->follow($userId);
        return $followUser;
    }

    /**
     *  フォロー解除機能
     *
     * $authUser: フォロー解除する側のID
     * $userId: フォロー解除される側のID
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
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
