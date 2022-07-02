<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\PostRequest;
use App\Models\User;
use App\Models\Follow;
use Illuminate\Support\Facades\Log;

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
     * 認証ユーザーのみユーザー情報更新
     *
     * @param  PostRequest $request
     * @param  int $userId
     * @param  User $user
     */
    public function update(PostRequest $request, int $userId, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'update-user', $user);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $user->updateUser($userId, $request);
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
