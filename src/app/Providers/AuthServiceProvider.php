<?php

namespace App\Providers;

use App\Policies\TweetPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * ポリシーと紐付け
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Tweet' => 'App\Policies\TweetPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('store-tweet', [TweetPolicy::class, 'store']);
    }
}
