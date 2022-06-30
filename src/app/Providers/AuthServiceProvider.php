<?php

namespace App\Providers;

use App\Policies\PostPolicy;
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
        'App\Models\User' => 'App\Policies\PostPolicy',
        'App\Models\Tweet' => 'App\Policies\PostPolicy'
    ];

    /**
     * User系ポリシー
     *
     * Tweet系ポリシー
     *
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('update-user', [PostPolicy::class, 'checkIsAuth']);

        Gate::define('store-tweet', [PostPolicy::class, 'checkIsAuth']);
        Gate::define('update-tweet', [PostPolicy::class, 'checkIsAuth']);
        Gate::define('destroy-tweet', [PostPolicy::class, 'checkIsAuth']);
    }
}
