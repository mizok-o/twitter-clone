<?php

namespace Database\Seeders;

use App\Models\Tweets;
use Illuminate\Database\Seeder;

class TweetsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tweets::truncate();
        Tweets::create(
            [
                'user_id' => 1,
                'text' => 'fjaojrfojfaiアイウエオああああ？！ー＝%&`()#$*',
                'image' => '/images/test.png',
            ],
        );
        for ($i = 2; $i < 25; $i++) {
            Tweets::create(
                [
                    'user_id' => 2,
                    'text' => 'テストツイートです。テストツイートです。テストツイートです。テストツイートです。テストツイートです。',
                ],
            );
        }
    }
}
