<?php

namespace Database\Seeders;

use App\Models\Follows;
use Illuminate\Database\Seeder;

class FollowsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Follows::truncate();
        for ($i = 2; $i < 30; $i++) {
            Follows::create(
                [
                    'follow_user_id' => $i,
                    'followed_user_id' => 1
                ],
            );
        }
        Follows::create(
            [
                'follow_user_id' => 1,
                'followed_user_id' => 2
            ],
        );
    }
}
