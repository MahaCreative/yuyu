<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataKeluarMasukController;
use App\Http\Controllers\DataPengguna;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PilihMenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileSayaController;
use App\Models\DataKeluarMasuk;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'login']);
});
Route::middleware(['auth'])->group(function () {
    Route::get('', [HomeController::class, 'index'])->name('home');
    Route::post('pilih-menu', [PilihMenuController::class, 'store'])->name('pilih-menu');
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
Route::middleware(['auth', 'role:admin'])->group(function () {


    Route::get('profile-saya', [ProfileSayaController::class, 'index'])->name('profile-saya');
    Route::post('update-profile-saya', [ProfileSayaController::class, 'update'])->name('update-profile-saya');

    Route::get('data-pengguna', [DataPengguna::class, 'index'])->name('data-pengguna');
    Route::post('create-data-pengguna', [DataPengguna::class, 'create'])->name('create-data-pengguna');
    Route::post('update-data-pengguna', [DataPengguna::class, 'update'])->name('update-data-pengguna');
    Route::delete('delete-data-pengguna', [DataPengguna::class, 'delete'])->name('delete-data-pengguna');

    Route::get('data-akses-pintu', [DataKeluarMasukController::class, 'index'])->name('data-akses-pintu');

    Route::get('data-keluar-masuk', function () {
        $data = DataKeluarMasuk::latest()->get()->take(20);
        return $data;
    });
});
