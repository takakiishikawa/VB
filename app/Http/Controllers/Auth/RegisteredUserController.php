<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserMajorSegmentStatus;
use App\Models\UserSegmentStatus;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        UserMajorSegmentStatus::create([
            'user_id' => $user->id,
            'major_segment_id' => 1,
            'status' => UserMajorSegmentStatus::STATUS_UNLOCKED,
        ]);

        UserSegmentStatus::create([
            'user_id' => $user->id,
            'segment_id' => 1,
            'status' => UserSegmentStatus::STATUS_GENERATE,
            'cycle' => 1,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('top', absolute: false));
    }
}
