<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tweet\PostRequest;
use App\Models\Follow;
use App\Models\Reply;
use App\Models\Tweet;
use App\Models\User;

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
        return $replys;
    }

    /**
     * リプ投稿
     *
     * @param  PostRequest $request
     * @param  Reply $reply
     * @param  int $tweetId
     * @param  User $user
     */
    public function store(PostRequest $request, int $tweetId, Reply $reply, User $user): bool
    {
        $isAuthUser = $user->checkIsAuth($request->user(), 'store-tweet', $reply);
        if (!$isAuthUser) {
            abort(Response()->json(['text' => '認証されていないユーザーです。'], 401));
        }

        return $reply->postReply($tweetId, $request);
    }
}
