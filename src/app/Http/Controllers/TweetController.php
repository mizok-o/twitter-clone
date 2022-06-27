<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Follows;
use App\Models\Tweet;
use App\Models\User;

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

        $users = User::all();

        $user = auth()->user();
        $followIds = $follows->getFollowIds($user->id);

        $followIds[] = $user->id;
        $tweets = $tweet->whereIn('user_id', $followIds)->orderBy('created_at', 'desc')->paginate(10);

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
