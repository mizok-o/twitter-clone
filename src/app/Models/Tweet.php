<?php

namespace App\Models;

use App\Consts\Paginate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Tweet extends Model
{
    /**
     * 全ユーザーのツイートを取得
     *
     * @param  array $followIds
     * @return object
     */
    public function getPaginatedAllTweets(): object
    {
        return $this->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);
    }

    /**
     * フォローしているユーザーのツイートを取得
     *
     * @param  array $followIds
     * @return object
     */
    public function getPaginatedFollowsTweets(array $followIds): object
    {
        return $this->whereIn('user_id', $followIds)->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);
    }

    /**
     * ID指定してツイート取得
     *
     * @param  int $tweetId
     * @return　object
     */
    public function getTweetByUserId(int $tweetId): object
    {
        return $this->where('id', $tweetId)->first();
    }

    /**
     * 認証ユーザーのツイート一覧を取得
     *
     * @param int $userId
     * @return　object
     */
    public function getTweetsByUserId(int $userId): object
    {
        return $this->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);
    }

    /**
     * リプ数を配列で返す
     *
     * @param  array $followIds
     * @return array
     */
    public function countTweetsInfo(object $tweets, object $countedItems): array
    {
        $tweetIds = $tweets->pluck('id');
        $contedNums = array();

        foreach ($tweetIds as $tweetId) {
            $contedNum = $countedItems->where('tweet_id', $tweetId)->count();
            $contedNums[] = $contedNum;
        }
        return $contedNums;
    }

    /**
     * ツイート投稿
     *
     * @param  int $user_id
     * @param  object $postContent
     */
    public function postTweet(int $userId, object $request): bool
    {
        $this->user_id = $userId;
        $this->text = $request->text;

        if ($request->file('image')) {
            $image_name = $request->file('image')->hashName();
            $this->image = $image_name;
            $request->file('image')->storeAs('public/tweet', $image_name);
        }
        return $this->save();
    }

    /**
     * ツイート更新
     *
     * @param  int $tweetId
     * @param  object $request
     */
    public function updateTweet(int $tweetId, object $request): bool
    {
        $tweet = $this->where('id', $tweetId)->first();
        $tweet->text = $request->text;
        $tweet->image = null;
        if ($request->file('image')) {
            $image_name = $request->file('image')->hashName();
            $tweet->image = $image_name;
            $request->file('image')->storeAs('public/tweet', $image_name);
        }

        return $tweet->save();
    }

    /**
     * ツイート削除
     *
     * @param  int $tweetId
     */
    public function destroyTweet(int $tweetId): bool
    {
        $tweetImage = $this->where("id", $tweetId)->value('image');
        Storage::disk('public')->delete('/tweet/' . $tweetImage);
        return $this->where("id", $tweetId)->delete();
    }
}
