<?php

namespace App\Policies;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TweetPolicy
{
    use HandlesAuthorization;

    /**
     * store
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function store(User $user)
    {
        return $user->id === auth()->id();
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tweet  $post
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Tweet $tweet)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tweet  $tweet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Tweet $tweet)
    {
        //
    }
}
