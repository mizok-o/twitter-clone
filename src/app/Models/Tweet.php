<?php

namespace App\Models;

use App\Consts\Paginate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Tweet extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * フォローしているユーザーのツイートを取得
     *
     * @param  array $followIds
     * @return object
     */
    public function getFollowsTweets(array $followIds): object
    {
        return $this->whereIn('user_id', $followIds)->orderBy('created_at')->paginate(Paginate::NUM_TWEET_PER_PAGE);
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
    public function postTweet(int $userId, array $postContent)
    {
        $this->userId = $userId;
        $this->text = $postContent['text'];
        $this->save();
        return;
    }

    /**
     * ツイート削除
     *
     * @param  int $tweetId
     */
    public function destroyTweet(int $tweetId)
    {
        return $this->where("id", $tweetId)->delete();
    }
}
