<?php

namespace App\Http\Controllers;

use App\Models\DataKeluarMasuk;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->getRoleNames()[0] !== 'admin') {
            return redirect()->route('home');
            // return redirect()->route('home');
        }
        $count = [
            'jumlah_keluar' => DataKeluarMasuk::where('jenis', 'keluar')->whereDate('tanggal', '=', now())->count(),
            'jumlah_masuk' => DataKeluarMasuk::where('jenis', 'masuk')->whereDate('tanggal', '=', now())->count(),
            'jumlah_user' => User::count(),

        ];
        return inertia('Dashboard/Index', compact('count'));
    }
}
