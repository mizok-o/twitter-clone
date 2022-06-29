<?php

namespace App\Models;

use App\Consts\Paginate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{

    use HasFactory;
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
     * @param  int $user_id
     * @return　Collection
     */
    public function getTweetByUserId(int $userId): Collection
    {
        return $this->where('id', $userId)->get();
    }

    /**
     * ツイート投稿
     *
     * @param  int $user_id
     * @param  array $postContent
     */
    public function postTweet(int $userId, array $postContent): bool
    {
        $this->user_id = $userId;
        $this->text = $postContent['text'];
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
        $tweet->image = $request->image;

        return $tweet->save();
    }

    /**
     * ツイート削除
     *
     * @param  int $tweetId
     */
    public function destroyTweet(int $tweetId): bool
    {
        return $this->where("id", $tweetId)->delete();
    }
}
