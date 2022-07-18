<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tweet\PostRequest;
use App\Models\Favorite;
use App\Models\Follow;
use App\Models\Reply;
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
    public function index(Follow $follow, Tweet $tweet, Reply $reply, Favorite $favs): array
    {
        $users = User::all();

        $userId = auth()->id();
        $followIds = $follow->getFollowIds($userId);
        $followIds[] = $userId;
        $tweets = $tweet->getFollowsTweets($followIds);

        $repliesNum = $tweet->countTweetsInfo($tweets, $reply);
        $favsNum = $tweet->countTweetsInfo($tweets, $favs);

        $retweetsNum = $tweet->countRetweets($tweets);
        return [
            "users" => $users,
            "tweets" => $tweets,
            "repliesNum" => $repliesNum,
            "favsNum" => $favsNum,
            "retweetsNum" => $retweetsNum,
        ];
    }

    /**
     *  ユーザーのツイートID指定して取得
     *
     * @param  int  $tweetId
     * @param  Tweet $tweet
     */
    public function show(int $tweetId, Tweet $tweet)
    {
        return $tweet->getTweetByUserId($tweetId);
    }

    /**
     *  ユーザーのツイート一覧を取得
     *
     * @param  int  $userId
     * @param  Tweet $tweet
     * @return object
     */
    public function getUserTweets(int $userId, Tweet $tweet): object
    {
        return $tweet->getTweetsByUserId($userId);
    }

    /**
     *  全てのツイートを取得
     *
     * @param  int  $userId
     * @param  Tweet $tweet
     * @return object
     */
    public function getAllTweets(Tweet $tweet): object
    {
        $tweets = $tweet->getPaginatedAllTweets();
        return $tweets;
    }

    /**
     * 認証ユーザーのみツイート投稿
     * 今後画像付きツイートの実装をするために、$postContentは配列で渡す
     *
     * @param  PostRequest $request
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function store(PostRequest $request, Tweet $tweet, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'store-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        $userId = auth()->id();

        return $tweet->postTweet($userId, $request);
    }

    /**
     * 認証ユーザーのみツイート更新
     * imageは空だが、今後使用予定
     *
     * @param  PostRequest $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function update(PostRequest $request, int $tweetId, Tweet $tweet, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'update-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $tweet->updateTweet($tweetId, $request);
    }

    /**
     * 認証ユーザーのみツイート削除
     *
     * @param  Request $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function destroy(Request $request, int $tweetId, Tweet $tweet, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'destroy-tweet', $tweet);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $tweet->destroyTweet($tweetId);
    }

    /**
     * リツイート取得
     *
     * @param  Request $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function getRetweets(int $tweetId, Tweet $tweet, User $user): object
    {
        return $tweet->getRetweetsByTweetId($tweetId);
    }

    /**
     * リツイート実行
     *
     * @param  Request $request
     * @param  int $tweetId
     * @param  Tweet $tweet
     * @param  User $user
     */
    public function actionRetweet(Request $request, int $tweetId, Tweet $tweet, User $user): bool
    {
        return $tweet->executeRetweet($tweetId);
    }
}
