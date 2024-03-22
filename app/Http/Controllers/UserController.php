<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        $user = User::Auth();
        $username = $user->username;
        return response()->json(['username' => $username]);
    }
}
