<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        $user = Auth::user();
        \Log::info('user', ['user' => $user]);
        \Log::info('username1', ['username' => $user->name]);

        $username = $user->name;
        \Log::info('username2', ['username' => $username]);
        return response()->json(['username' => $username]);
    }
}
