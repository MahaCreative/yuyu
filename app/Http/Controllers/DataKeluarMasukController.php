<?php

namespace App\Http\Controllers;

use App\Models\DataKeluarMasuk;
use Illuminate\Http\Request;

class DataKeluarMasukController extends Controller
{
    public function index(Request $request)
    {
        $count = [
            'jumlah_keluar' => DataKeluarMasuk::where('jenis', 'keluar')->whereDate('tanggal', '=', now())->count(),
            'jumlah_masuk' => DataKeluarMasuk::where('jenis', 'masuk')->whereDate0('tanggal', '=', now())->count(),
        ];

        $query = DataKeluarMasuk::query();
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%');
        }
        if ($request->dari_tanggal) {
            $query->whereDate('tanggal', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->whereDate('tanggal', '<=', $request->sampai_tanggal);
        }
        if ($request->dari_jam) {
            $query->whereTime('tanggal', '>=', $request->dari_jam);
        }
        if ($request->sampai_jam) {
            $query->whereTime('tanggal', '<=', $request->sampai_jam);
        }
        if ($request->jenis) {
            $query->where('jenis', '=', $request->jenis);
        }
        $dataKeluarMasuk = $query->latest()->get();
        return inertia('DataKeluarMasuk/Index', compact('dataKeluarMasuk', 'count'));
    }
}
