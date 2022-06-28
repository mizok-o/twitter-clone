<?php

namespace App\Http\Controllers;

use App\Consts\Paginate;
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
        $tweets = $tweet->whereIn('user_id', $followIds)->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);

        return [
            "users" => $users,
            "tweets" => $tweets
        ];
    }

    /**
     *  ユーザーのツイートID指定して取得
     *
     * @param  int  $userId
     * @return object
     */
    public function show(int $userId)
    {
        $tweet = Tweet::where('id', $userId)->get();
        return $tweet[0];
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
        $user->checkIsAuth($isAuthUser);

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
        $tweet->where("id", $tweetId)->delete();
        return;
    }
}
