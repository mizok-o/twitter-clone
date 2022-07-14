<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retweet extends Model
{
    /**
     * ツイートのリツイートを取得
     *
     * @param  int $contentId
     * @return object
     */
    public function getRetweetById(int $contentId): object
    {
        return $this->where('tweet_id', $contentId)->get();
    }

    /**
     * フォローしている人のリツイートレコードを取得
     *
     * @param  array $followIds
     * @return array
     */
    public function getTweetIds(array $followIds): array
    {
        return $this->whereIn('user_id', $followIds)->pluck('tweet_id')->toArray();
    }
    /**
     * フォローしているユーザーのツイートを取得
     *
     * @param  array $tweetIds
     * @return object
     */
    public function getRetweetBytweetIds(array $tweetIds): object
    {
        return Tweet::whereIn('id', $tweetIds)->orderBy('created_at', 'desc')->get();
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
