<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('id', $request->user()->id)->first();
        $users = [
            'user' => $user,
            'roles' => $user->getRoleNames()[0]
        ];

        return inertia('Home/Index', compact('users'));
    }
}
