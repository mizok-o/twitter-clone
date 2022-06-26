<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follows;
use App\Models\Tweet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TweetController extends Controller
{
    /**
     * ユーザーのツイート一覧取得
     *
     * @param  Follows $follows, Tweet $tweet
     * @return array<int, object>
     */
    public function index(Follows $follows, Tweet $tweet)
    {
        $user = auth()->user();
        $followIds = $follows->getFollowIds($user->id);

        $follow_ids[] = $user->id;
        $tweets = $tweet->whereIn('user_id', $followIds)->orderBy('created_at', 'asc')->paginate(10);

        return [
            'user' => $user->id,
            'tweets' => $tweets
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
     * @param  Request $request, Tweet $tweet
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Tweet $tweet)
    {
        $user = auth()->user();
        $data = $request->all();

        $validator = Validator::make($data, [
            'text' => ['required', 'string', 'max:140']
        ]);

        $validator->validate();
        $tweet->storeTweet($user->id, $data);

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $tweetId, Tweet $tweet
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $tweetId, Tweet $tweet)
    {
        $tweet->where("id", $tweetId)->delete();
        return;
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
}
