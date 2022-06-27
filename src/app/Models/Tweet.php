<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Tweet extends Authenticatable
{

    use HasApiTokens, HasFactory, Notifiable;

    /**
     * ツイート投稿
     *
     * @param  int $user_id
     * @param  array $data
     * @return \Illuminate\Http\Response
     */
    public function tweetStore(int $user_id, array $data)
    {
        $this->user_id = $user_id;
        $this->text = $data['text'];
        $this->save();
        return;
    }
}
