<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tweet\PostRequest;
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
        dd($reply->all());
        $replys = $reply->getReplysByTweetId($tweetId);
        return $replys;
    }

    /**
     * リプ投稿
     *
     * @param  PostRequest $request
     * @param  Reply $reply
     * @param  User $user
     */
    public function store(PostRequest $request, int $userId, Reply $reply): bool
    {
        return $reply->postTweet($userId, $request);
    }
}
