<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{

    protected $fillable = ['follow_user_id', 'followed_user_id'];
    public $timestamps = false;

    /**
     *  フォローしているリストを取得して、要素を数値に変換
     *
     * @param int $userId
     * @return array<int>
     */
    public function getFollowsList(int $userId): array
    {
        $followsListArray = $this->where('follow_user_id', $userId)->pluck('followed_user_id')->toArray();
        return array_map('intval', $followsListArray);
    }

    /**
     *  フォローしてるIDリストを取得　
     *
     * @param  int  $userId
     * @return object
     */
    public function getFollowIds(int $user_id)
    {
        return $this->where('follow_user_id', $user_id)->get('followed_user_id')->pluck('followed_user_id')->toArray();
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
