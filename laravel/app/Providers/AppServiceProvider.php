<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            $baseurl = env('VUE_URL', 'http://localhost:8080');
            //ddd($notifiable);response()->json(['error' => $validator->errors()], 422);
            return "{$baseurl}/password/reset/{$token}?email={$notifiable->email}";
        });
    }
}
