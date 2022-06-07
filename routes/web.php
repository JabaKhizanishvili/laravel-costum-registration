<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\main;

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
Route::post('/reg', [Main::class, 'reg']);
Route::get('/login', [Main::class, 'login'])->name('login');
Route::post('/loginuser', [Main::class, 'loginuser'])->name('loginuser');
Route::get('/page', [Main::class, 'page'])->name('page');
Route::get('/logout', [Main::class, 'logout'])->name('logout');
Route::post('/img', [Main::class, 'img'])->name('img');
Route::get('/delImg', [Main::class, 'delImg'])->name('del');
