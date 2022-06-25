<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
// use App\Models\Follows;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * 認証ユーザーを除いたusersテーブル一覧を取得
     *
     * @param  int  $userId
     * @return array<object, int>
     */
    public function index(int $userId)
    {
        $tweets = Tweet::where('user_id', $userId)->get();

        $numTweets = $tweets->count();
        dd($tweets, $numTweets);
        return [
            "tweets" => $tweets,
            "numTweets" => $numTweets
        ];
    }

    /**
     *  usersテーブルからidが一致するレコードを取得
     *
     * @param  int  $userId
     * @return object
     */
    public function show(int $userId)
    {
        $tweet = Tweet::find($userId);
        dd($tweet);
        return $tweet;
    }

    /**
     * Store a newly created resource in storage.
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
