<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * いいねごとのリプライを配列で取得
     *
     * @param int $tweetId
     * @param Tweet $tweet
     * @return object
     */
    public function showTweetFav(int $tweetId, Favorite $favorite): object
    {
        $favorites = $favorite->getFavsById($tweetId, "tweet_id");
        return $favorites;
    }

    /**
     * いいねごとのリプライを配列で取得
     *
     * @param int $tweetId
     * @param Tweet $tweet
     * @return object
     */
    public function showReplyFav(int $tweetId, Favorite $favorite): object
    {
        $favorites = $favorite->getFavsById($tweetId, "tweet_id");
        return $favorites;
    }

    /**
     *  ツイートIDからいいねを取得
     *
     * @param int $tweetId
     * @param Tweet $tweet
     * @return object
     */
    // public function getFavsByTweetId(int $tweetId, Favorite $favorite): object
    // {
    //     $favorites = $favorite->getFavsById($tweetId, "tweet_id");
    //     return $favorites;
    // }

    /**
     * リプ投稿
     *
     * @param  Reply $reply
     * @param  int $tweetId
     * @param  User $user
     */
    public function store(Request $request, int $tweetId, Favorite $favorite, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'store-tweet', $favorite);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $favorite->actionFav($tweetId);
    }
    /**
     * リプ更新
     *
     * @param  Request $request
     * @param  Reply $reply
     * @param  int $replyId
     * @param  User $user
     */
    public function destroy(Request $request, int $replyId, Reply $reply, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'destroy-tweet', $reply);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $reply->destroyReply($replyId, $request);
    }
}
