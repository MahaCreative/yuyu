<?php

namespace App\Http\Controllers;

use App\Models\DataKtp;
use Illuminate\Http\Request;

class ProfileSayaController extends Controller
{
    public function index(Request $request)
    {
        $profile = $request->user()->with('kode')->first();

        return inertia('ProfileSaya/Index', compact('profile'));
    }
    public function update(Request $request)
    {
        $request->validate([
            "name" => "required|min:6|max:50",
            "email" => "required|email|unique:users,email," . $request->user()->id,
            "password" => "nullable",
            "kode_ktp" => "required|string|min:10",
        ]);

        $password = $request->user()->password;
        if ($request->password) {
            $request->validate(['password' => 'min:6']);
            $password = bcrypt($request->password);
        }
        $request->user()->update([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $password,
        ]);
        $dataKtp = DataKtp::where('user_id', $request->user()->id)->first();
        $dataKtp->update([
            'kode_ktp' => $request->kode_ktp
        ]);
    }
}
