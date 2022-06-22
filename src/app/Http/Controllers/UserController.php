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

        return [
            $users,
            $numUsers
        ];
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $userId)
    {
        $user = User::find($userId);
        return $user;
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function follow(User $userId)
    {
        $followUser =  $userId->follow($userId->id);
        // dd(User::find($userId), User::find(3), "---", $userId);
        return $followUser;
    }

    /**
     *  フォロー解除機能
     *
     * $authUser: フォロー解除する側のID
     * $userId: フォロー解除される側のID
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function unfollow(User $userId)
    {
        $unfollowUser = $userId->unfollow($userId->id);
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
