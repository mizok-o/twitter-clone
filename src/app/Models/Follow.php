<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{

    protected $fillable = ['follow_user_id', 'followed_user_id'];
    public $timestamps = false;

    /**
     *  フォローしてるIDリストを取得　
     *
     * @param  int  $userId
     * @return array
     */
    public function getFollowIds(int $userId): array
    {
        $followIdsData = $this->where('follow_user_id', $userId)->get('followed_user_id')->pluck('followed_user_id')->toArray();
        return array_map('intval', $followIdsData);
    }

    /**
     *  フォローされてるIDリストを取得
     *
     * @param  int  $userId
     * @return array
     */
    public function getFollowerIds(int $userId): array
    {
        $followerIdsData = $this->where('followed_user_id', $userId)->get('follow_user_id')->pluck('follow_user_id')->toArray();
        return array_map('intval', $followerIdsData);
    }

    /**
     *  フォロー・フォロワー数をカウント
     *
     * @param  string $columnName
     * @param  int  $userId
     * @return int
     */
    public function countFollowsNum(string $columnName, int $userId): int
    {
        return $this->where($columnName, $userId)->count();
    }
}
