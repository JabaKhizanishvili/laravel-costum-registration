<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Costumuser;
use Illuminate\Support\Facades\Hash;

class main extends Controller
{
    //
    public function index(Request $request)
    {
        return Inertia::render('Home', [
            'success' => $request->session()->get('success')
        ]);
    }

    public function reg(Request $request)
    {
        // dd($request->post());
        $saveData = Arr::except($request->except('_token', 'password_confirmation'), []);
        $request->validate([
            'email' => 'min:5|email|unique:costumuser',
            'password' => 'required| min:6|confirmed',
            'password_confirmation' => 'required| min:6'
        ]);
        $register = Costumuser::create(
            [
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]
        );
        if ($register) {
            return redirect(route('login'))->with('success', 'warmatebi gaiara registracia');
        }
    }
    public function login(Request $request)
    {
        return Inertia::render('Login', [
            'success' => $request->session()->get('success')
        ]);
    }
    public function loginuser(Request $request)

    {
        $mail = Costumuser::where('email', "=", $request->email)->first();
        if ($mail) {
            if (Hash::check($request->password, $mail->password)) {
                // return 'kargia';
                $request->session()->put('loggedUser', $mail->id);
                return redirect(route('page'))->with('id', $mail->id);
            }
        } else {
            return 'cudia';
        }
    }
    public function page(Request $request)
    {
        $id = $request->session()->get('loggedUser');
        $user = Costumuser::where('id', $id)->first();
        return Inertia::render('UserPage', [
            "id" => $request->session()->get('loggedUser'),
            'email' => $user->email,
        ]);
    }


    public function logout(Request $request)
    {
        $request->session()->remove('loggedUser');
        return redirect('login');
    }
}
