<?php

use App\Models\DataKeluarMasuk;
use App\Models\DataKtp;
use App\Models\StatusPintu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('tutup-pintu', function () {
    $statusPintu  = StatusPintu::findORfail(1);
    $statusPintu->update(['status' => 'tutup']);
    return response()->json(['status_pintu' => $statusPintu->status]);
});

Route::get('data-ktp', function () {
    $data = DataKtp::select('kode_ktp')->latest()->get();
    return response()->json($data);
});
Route::get('status-pintu', function () {
    $statusPintu  = StatusPintu::findORfail(1);
    return response()->json(['status_pintu' => $statusPintu->status]);
});

Route::post('masuk-dengan-ktp', function (Request $request) {
    $dataKtp = DataKtp::where('kode_ktp', $request->kode_ktp)->with('user')->first();

    $statusPintu  = StatusPintu::findORfail(1);
    if ($dataKtp) {
        $statusPintu->update(['status' => 'buka']);
        DataKeluarMasuk::create([
            "nama" => $dataKtp->user->name,
            "jenis" => 'masuk',
            "jam" => now()->format('H:I'),
            "tanggal" => now(),
        ]);
    }
    return response()->json(['status_pintu' => $statusPintu->status]);
});
