<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReplysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $replys = [
            [
                'users_id' => 1,
                'tweets_id' => 40,
                'text' => 'テストリプライしてみた',
                'image' => '',
            ],
            [
                'users_id' => 2,
                'tweets_id' => 12,
                'text' => 'テストリプライしてみた',
                'image' => '',
            ],
        ];

        foreach ($replys as $reply) {
            DB::table('replys')->insert($reply);
        }
    }
}
