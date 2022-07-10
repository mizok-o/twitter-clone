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
     * いいねといいね解除
     *
     * @param  int $tweetId
     */
    public function actionFav(int $tweetId): bool
    {
        $authUserId = auth()->id();
        $isLiked = $this->where('tweet_id', $tweetId)->where('user_id', $authUserId);

        if ($isLiked->exists()) {
            return $isLiked->delete();
        }

        $this->tweet_id = $tweetId;
        $this->user_id = $authUserId;
        return $this->save();
    }
}
