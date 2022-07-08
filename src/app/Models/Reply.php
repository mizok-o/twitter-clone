<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    /**
     * 全ユーザーのツイートを取得
     *
     * @param  array $followIds
     * @return object
     */
    public function getReplysByTweetId(int $tweetId): object
    {
        // dd($this->where('tweets_id', $tweetId)->get());
        return $this->where('tweets_id', $tweetId)->get();
    }
}
