<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
            $table->string('user_id', 50);
            $table->string('email', 30);
            $table->string('password', 14);
            $table->string('profile', 140)->nullable();
            $table->string('profile_image_id')->nullable();
            $table->timestamps();
        });

        Schema::create('follow', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id', 50);
            $table->string('follow_id', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users', 'follow');
    }
}
