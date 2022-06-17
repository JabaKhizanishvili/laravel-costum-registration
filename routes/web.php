<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\main;
use App\Http\Middleware\Admin;
use App\Http\Middleware\CosutmLogin;
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

Route::get('/', [Main::class, 'index']);
Route::middleware([CosutmLogin::class])->group(function () {
    Route::post('/reg', [Main::class, 'reg']);
    Route::get('/login', [Main::class, 'login'])->name('login');
});
Route::post('/loginuser', [Main::class, 'loginuser'])->name('loginuser');
Route::get('/page', [Main::class, 'page'])->name('page');
Route::get('/logout', [Main::class, 'logout'])->name('logout');
Route::post('/img', [Main::class, 'img'])->name('img');
Route::get('/delImg', [Main::class, 'delImg'])->name('del');
Route::get('/reset', [Main::class, 'forgetPass']);
Route::post('/resetsend', [Main::class, 'send']);
Route::get('/changePass', [Main::class, 'resetpass'])->name('resetpass');
Route::post('/resetpassword', [Main::class, 'resetpassword'])->name('resetpassword');
Route::post('/address', [Main::class, 'address'])->name('address');
Route::get('/admin', [Main::class, 'admin'])->name('admin');
Route::post('/adminlogin', [Main::class, 'adminlog'])->name('adminlog');


Route::middleware([Admin::class])->group(function () {
    Route::get('/adminpanel', [Main::class, 'adminpanel'])->name('adminpanel');
    Route::post('/addprod', [Main::class, 'addprod'])->name('addprod');
    // Route::get('/profile', function () {
    //     //
    // })->withoutMiddleware([Admin::class]);
});
