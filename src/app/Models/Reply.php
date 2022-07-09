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
        return $this->where('tweet_id', $tweetId)->get();
    }

    /**
     * ツイート投稿
     *
     * @param  int $tweetId
     * @param  object $postContent
     */
    public function postReply(int $tweetId, object $request): bool
    {
        $this->tweet_id = $tweetId;
        $this->user_id = auth()->id();
        $this->text = $request->text;

        if ($request->file('image')) {
            $image_name = $request->file('image')->hashName();
            $this->image = $image_name;
            $request->file('image')->storeAs('public/tweet', $image_name);
        }
        return $this->save();
    }
}
