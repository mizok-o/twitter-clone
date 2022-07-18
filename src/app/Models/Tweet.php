<?php

namespace App\Models;

use App\Consts\Paginate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Tweet extends Model
{
    /**
     * リレーション紐付け
     *
     * @param  array $followIds
     * @return object
     */
    public function retweets(): object
    {
        // dd("aa", $this->hasMany(Tweet::class, 'tweet_id', 'id')->get());
        return $this->belongsTo(Tweet::class);
    }

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
     * フォローしているユーザーのツイート・リツイートを取得
     *
     * @param  array $followIds
     * @return object
     */
    public function getFollowsTweets(array $followIds): object
    {
        $tweets = $this->whereIn('user_id', $followIds)->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);

        foreach ($tweets as $retweet) {
            if ($retweet->tweet_id == 0) {
                break;
            }
            $retweetData = $this->where('id', $retweet->tweet_id);
            $retweet->text = $retweetData->value('text');
            $retweet->image = $retweetData->value('image');
        }
        return $tweets;
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
    public function getProfileTweetsByUserId(int $userId): object
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
     * リツイート数を配列で返す
     *
     * @param  array $followIds
     * @return array
     */
    public function countRetweets(object $tweets): array
    {
        $tweetIds = $tweets->pluck('id');
        $contedNums = array();

        foreach ($tweetIds as $tweetId) {
            $contedNum = $this->where('tweet_id', $tweetId)->count();
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

    /**
     * リツイート取得
     *
     * @param  int $tweetId
     */
    public function getRetweetsByTweetId(int $tweetId): object
    {
        $hasRetweets = $this->where('tweet_id', $tweetId);

        return $hasRetweets->get();
        if ($hasRetweets->exists()) {
        }
        // return 0;
    }

    /**
     * リツイートと解除
     *
     * @param  int $tweetId
     */
    public function executeRetweet(int $tweetId): bool
    {
        $authUserId = auth()->id();
        $isLiked = $this->where('user_id', $authUserId)->where('tweet_id', $tweetId);

        if ($isLiked->exists()) {
            $isLiked->delete();
            return true;
        }

        $this->tweet_id = $tweetId;
        $this->user_id = $authUserId;
        $this->text = " ";
        $this->image = " ";
        return $this->save();
    }
}
