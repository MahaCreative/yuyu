<?php

namespace App\Http\Controllers;

use App\Models\DataKtp;
use App\Models\User;
use Illuminate\Http\Request;

class DataPengguna extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->with(['roles' => function ($q) {
            $q->whereNot('name', 'admin');
        }, 'kode']);
        if ($request->cari) {
            $query->where('name', 'like', '%' . $request->cari . '%');
        }
        $user = $query->latest()->get();
        return inertia('DataPengguna/Index', compact('user'));
    }

    public function create(Request $request)
    {


        $request->validate([
            "name" => "required|min:6|max:50",
            "email" => "required|email|unique:users,email",
            "password" => "nullable",
            "kode_ktp" => "required|string|min:10",
        ]);
        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);
        $user->assignRole('user');
        $dataKtp = DataKtp::create(['user_id' => $user->id, 'kode_ktp' => $request->kode_ktp]);
    }
    public function update(Request $request)
    {
        $request->validate([
            "name" => "required|min:6|max:50",
            "email" => "required|email|unique:users,email," . $request->id,
            "password" => "nullable",
            "kode_ktp" => "required|string|min:10",
        ]);
        $user = User::findOrFail($request->id);
        $password = $user->password;
        if ($request->password) {
            $request->validate(['password' => 'min:6']);
            $password = bcrypt($request->password);
        }
        $user->update([
            "name" => $request->name,
            "email" => $request->email,
            "password" => $password,
        ]);
        $dataKtp = DataKtp::where('user_id', $user->id)->first();
        $dataKtp->update([
            'kode_ktp' => $request->kode_ktp
        ]);
    }
    public function delete(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
    }
}
