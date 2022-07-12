<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retweet extends Model
{
    /**
     * 全ユーザーのリツイートを取得
     * リプライのリツイートも対応予定
     *
     * @param  int $contentId
     * @return object
     */
    public function getRetweetById(int $contentId): object
    {
        return $this->where('tweet_id', $contentId)->get();
    }

    /**
     * リツイートとリツイート解除
     *
     * @param  int $tweetId
     */
    public function actionRetweet(int $tweetId): bool
    {
        $authUserId = auth()->id();
        $isRetweeted = $this->where('tweet_id', $tweetId)->where('user_id', $authUserId);

        if ($isRetweeted->exists()) {
            return $isRetweeted->delete();
        }

        $this->tweet_id = $tweetId;
        $this->user_id = $authUserId;

        return $this->save();
    }
}
