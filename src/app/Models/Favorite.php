<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Favorite extends Model
{
    /**
     * 全ユーザーのいいねを取得
     *
     * @param  int $contentId
     * @param  string $idName
     * @return object
     */
    public function getFavsById(int $contentId, string $idName): object
    {
        return $this->where($idName, $contentId)->get();
    }

    /**
     * いいね投稿
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
     * いいね削除
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
