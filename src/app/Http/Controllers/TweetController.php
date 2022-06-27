<?php

namespace App\Http\Controllers;

use App\Consts\Paginate;
use App\Http\Controllers\Controller;
use App\Models\Follow;
use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class TweetController extends Controller
{

    /**
     * ユーザーのツイート一覧取得
     *
     * @param Follow $follow
     * @param Tweet $tweet
     * @return array<object, int>
     */
    public function index(Follow $follow, Tweet $tweet)
    {
        $users = User::all();

        $userId = auth()->id();
        $followIds = $follow->getFollowIds($userId);

        $followIds[] = $userId;

        $tweets = $tweet->whereIn('user_id', $followIds)->orderBy('created_at', 'desc')->paginate(Paginate::NUM_TWEET_PER_PAGE);

        return [
            "users" => $users,
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
        $tweet = Tweet::where('id', $userId)->get();
        return $tweet[0];
    }

    /**
     * ツイート投稿
     *
     * @param  Request $request
     * @param  Tweet $tweet
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
        $tweet->tweetStore($user->id, $data);

        return;
    }

    /**
     * ツイート更新
     *
     * @param  int $tweetId
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(int $tweetId, Request $request)
    {
        $tweet = Tweet::where('id', $tweetId)->first();
        $tweet->text = $request->text;
        $tweet->image = $request->image;

        $tweet->save();
        return;
    }

    /**
     * ツイート削除
     *
     * @param  int $tweetId, Tweet $tweet
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $tweetId, Tweet $tweet)
    {
        $tweet->where("id", $tweetId)->delete();
        return;
    }
}
