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
     * @param  int $userId, array $data
     * @return \Illuminate\Http\Response
     */
    public function storeTweet(int $userId, array $data)
    {
        $this->userId = $userId;
        $this->text = $data['text'];
        $this->save();
        return;
    }
}
