<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follow;
use App\Models\Reply;
use App\Models\Tweet;

class ReplyController extends Controller
{
    /**
     * ツイートごとのリプライを配列で取得
     *
     * @param Follow $follow
     * @param Tweet $tweet
     * @return object
     */
    public function index(int $tweetId, Reply $reply): object
    {
        $replys = $reply->getReplysByTweetId($tweetId);
        // dd($replys, $replys->toArray());
        return $replys;
    }

    // /**
    //  * リプ投稿
    //  *
    //  * @param  PostRequest $request
    //  * @param  Tweet $tweet
    //  * @param  User $user
    //  */
    // public function store(PostRequest $request, Tweet $tweet, User $user): bool
    // {
    //     $isAuthUser = $user->checkIsAuth($request->user(), 'store-tweet', $tweet);
    //     if (!$isAuthUser) {
    //         abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
    //     }

    //     $userId = auth()->id();

    //     return $tweet->postTweet($userId, $request);
    // }
}
