<?php

namespace App\Http\Controllers;

use App\Models\DataKeluarMasuk;
use App\Models\StatusPintu;
use Illuminate\Http\Request;

class PilihMenuController extends Controller
{
    public function store(Request $request)
    {

        $jenis = '';
        $statusPintu  = StatusPintu::findORfail(1);
        $statusPintu->update(['status' => 'buka']);
        if ($request->menu == 'masuk') {
            $jenis = 'masuk';
        } else {
            $jenis = 'keluar';
        }
        $data = DataKeluarMasuk::create([
            "nama" => $request->user['name'],
            "jenis" => $jenis,
            "jam" => now()->format('H:I'),
            "tanggal" => now(),
        ]);
    }
}
