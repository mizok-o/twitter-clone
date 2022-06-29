<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tweet\PostRequest;
use App\Models\Follow;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * ユーザーのフォローしているツイート一覧ページネーションして取得
     *
     * @param Follow $follow
     * @param Tweet $tweet
     * @return array<object, object>
     */
    public function index(Follow $follow, Tweet $tweet): array
    {
        $users = User::all();

        $userId = auth()->id();
        $followIds = $follow->getFollowIds($userId);

        $followIds[] = $userId;

        $tweets = $tweet->getPaginatedFollowsTweets($followIds);
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
    public function show(int $userId, Tweet $tweet): object
    {
        $userTweet = $tweet->getTweetByUserId($userId);
        return $userTweet[0];
    }

    /**
     * 認証ユーザーのみツイート投稿
     * 今後画像付きツイートの実装をするために、$postContentは配列で渡す
     *
     * @param  PostRequest $request
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function store(PostRequest $request, Tweet $tweet, User $user)
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'store-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['error' => '認証されていないユーザーです。'], 401));
        }

        $userId = auth()->id();
        $postContent = $request->all();

        $tweet->postTweet($userId, $postContent);
        return;
    }

    /**
     * 認証ユーザーのみツイート更新
     *
     * @param  PostRequest $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function update(PostRequest $request, int $tweetId, Tweet $tweet, User $user)
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'update-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['error' => '認証されていないユーザーです。'], 401));
        }

        $tweet->updateTweet($tweetId, $request);
        return;
    }

    /**
     * 認証ユーザーのみツイート削除
     *
     * @param  Request $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function destroy(Request $request, int $tweetId, Tweet $tweet, User $user)
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'destroy-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['error' => '認証されていないユーザーです。'], 401));
        }

        $tweet->destroyTweet($tweetId);
        return;
    }
}
