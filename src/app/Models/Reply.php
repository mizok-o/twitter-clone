<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Reply extends Model
{
    /**
     * 全ユーザーのリプライを取得
     *
     * @param  int $tweetId
     * @return object
     */
    public function getReplysByTweetId(int $tweetId): object
    {
        return $this->where('tweet_id', $tweetId)->get();
    }

    /**
     * リプライ投稿
     *
     * @param  int $tweetId
     * @param  object $request
     */
    public function postReply(int $tweetId, object $request): bool
    {
        $this->tweet_id = $tweetId;
        $this->user_id = auth()->id();
        $this->text = $request->text;

        if ($request->file('image')) {
            $image_name = $request->file('image')->hashName();
            $this->image = $image_name;
            $request->file('image')->storeAs('public/reply', $image_name);
        }
        return $this->save();
    }

    /**
     * リプライ更新
     *
     * @param  int $replyId
     * @param  object $request
     */
    public function updateReply(int $replyId, object $request): bool
    {
        $reply = $this->where('id', $replyId)->first();
        $reply->text = $request->text;
        $reply->image = null;
        if ($request->file('image')) {
            $image_name = $request->file('image')->hashName();
            $reply->image = $image_name;
            $request->file('image')->storeAs('public/reply', $image_name);
        }

        return $reply->save();
    }

    /**
     * リプライ削除
     *
     * @param  int $replyId
     */
    public function destroyReply(int $replyId): bool
    {
        $tweetImage = $this->where("id", $replyId)->value('image');
        Storage::disk('public')->delete('/reply/' . $tweetImage);
        return $this->where("id", $replyId)->delete();
    }
}
