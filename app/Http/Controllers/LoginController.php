<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Login/Index');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->has('remember');

        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;
        }

        throw ValidationException::withMessages([
            'email' => ['Email atau password salah'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
    }
}
