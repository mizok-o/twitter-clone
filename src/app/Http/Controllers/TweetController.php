<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use App\Models\Follows;

// use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * ユーザーのツイート一覧取得
     *
     * @param  int  $userId
     * @return array<object, int>
     */
    public function index(Follows $follows, Tweet $tweet)
    {
        $user = auth()->user();
        $followIds = $follows->getFollowIds($user->id);

        $follow_ids[] = $user->id;
        $tweets = $tweet->whereIn('user_id', $followIds)->paginate(10);

        return [
            "user" => $user->id,
            "tweets" => $tweets
        ];
    }

    /**
     *  ユーザーのツイートID指定して取得
     *
     * @param  int  $userId
     * @return object
     */
    public function show(int $userId)
    {
        $tweet = Tweet::find($userId);
        return $tweet;
    }

    /**
     * ツイート投稿
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
