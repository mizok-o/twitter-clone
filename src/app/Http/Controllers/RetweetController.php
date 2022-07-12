<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Retweet;

class RetweetController extends Controller
{
    /**
     * ツイートごとのリツイートライを配列で取得
     *
     * @param int $tweetId
     * @param Retweet $retweet
     * @return object
     */
    public function showRetweet(int $tweetId, Retweet $retweet): object
    {
        return $retweet->getRetweetById($tweetId);
    }

    /**
     * リツイート投稿
     *
     * @param  int $tweetId
     * @param  Retweet $retweet
     * @return bool
     */
    public function store(int $tweetId, Retweet $retweet): bool
    {
        return $retweet->actionRetweet($tweetId);
    }
}
