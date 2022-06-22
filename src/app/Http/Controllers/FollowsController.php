<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Follows;
use Illuminate\Support\Facades\Auth;

// use Illuminate\Http\Request;

class FollowsController extends Controller
{
    /**
     * フォロー
     *
     * @return \Illuminate\Http\Response
     */
    public function follow($userId)
    {
        // return (Follows::get());
        $follow = Follows::create([
            'follow_user_id' => Auth::user()->id,
            'followed_user_id' => $userId,
        ]);
        return $follow;
    }

    /**
     * フォロー解除
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function unfollow(Request $request, $id)
    // {
    //     //
    // }
}
