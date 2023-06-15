<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\ChirpCreated;
use App\Notifications\NewChirp;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class sendChirperCreatedNotifications implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ChirpCreated $event): void
    {
        foreach (User::WhereNot('id', $event->chirp->user_id)->cursor() as $user);
        $user->notify(new NewChirp($event->chirp));
    }
}
