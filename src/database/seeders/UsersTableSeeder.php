<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // \DB::table('users')->truncate();

        $users = [
            [
                'user_name' => 'testuser_01',
                'screen_name' => 'テストユーザ1',
                'email' => 'test1@test.com',
                'password' => 'passpass1',
                'profile' => 'さらにDatabaseSeeder.phpのrunメソッドを以下のように修正します。runメソッド内でcallしたクラスが、シーディングコマンドで実行されるようになります。',
                'profile_image_id' => 'twitter-cover-example.png',
            ],
            [
                'user_name' => 'testuser_02',
                'screen_name' => 'テストユーザ2',
                'email' => 'test2@test.com',
                'password' => 'passpass2',
                'profile' => '駆け出しエンジニアです。よろしくお願いします！',
                'profile_image_id' => 'twitter-cover-example.png',
            ],
            [
                'user_name' => 'testuser_03',
                'screen_name' => 'テストユーザ3',
                'email' => 'test3@test.com',
                'password' => 'passpass3',
                'profile' => 'ぽ',
                'profile_image_id' => 'twitter-cover-example.png',
            ],
        ];

        foreach ($users as $user) {
            \DB::table('users')->insert($user);
        }
    }
}
