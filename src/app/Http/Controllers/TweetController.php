<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Follow;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TweetController extends Controller
{
    /**
     * ユーザーのツイート一覧取得
     *
     * @param Follow $follow
     * @param Tweet $tweet
     * @return array<object, int>
     */
    public function index(Follow $follow, Tweet $tweet)
    {
        $users = User::all();

        $userId = auth()->id();
        $followIds = $follow->getFollowIds($userId);

        $followIds[] = $userId;

        // followIdsの配列からツイートをソートとページネーションして取得する
        $tweets = $tweet->getFollowsTweets($followIds);
        return [
            "users" => $users,
            "tweets" => $tweets
        ];
    }

    /**
     *  ユーザーのツイートID指定して取得
     *
     * @param  int  $userId
     * @param  Tweet $tweet
     * @return object
     */
    public function show(int $userId, Tweet $tweet)
    {
        $userTweet = $tweet->getTweetByUserId($userId);
        return $userTweet[0];
    }

    /**
     * 認証ユーザーのみツイート投稿
     *
     * @param  PostRequest $request
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function store(PostRequest $request, Tweet $tweet, User $user)
    {
        $isAuthUser = Gate::forUser($request->user())->allows('store-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['error' => '認証されていないユーザーです。'], 401));
        }

        $userId = auth()->id();
        $postContent = $request->all();

        $tweet->postTweet($userId, $postContent);
        return;
    }

    /**
     * ツイート削除
     *
     * @param  int $tweetId
     * @param  Tweet $tweet
     */
    public function destroy(int $tweetId, Tweet $tweet)
    {
        $tweet->destroyTweet($tweetId);
        return;
    }
}
