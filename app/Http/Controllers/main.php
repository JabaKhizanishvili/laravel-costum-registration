<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Costumuser;
use App\Models\Img;
use App\Models\Address;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassword;
use League\CommonMark\Extension\SmartPunct\EllipsesParser;

class main extends Controller
{
    //
    public function index(Request $request, Img $img)
    {
        return Inertia::render('Home', [
            "images" => $img->all(),
            'success' => $request->session()->get('success'),
            "links" => asset('storage/images'),
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
    public function page(Request $request, Img $img)
    {
        $user_id = $request->session()->get('loggedUser');
        // return Costumuser::find($user_id)->getImg;
        $id = $request->session()->get('loggedUser');
        $user = Costumuser::where('id', $id)->first();
        return Inertia::render('UserPage', [
            "images" => Costumuser::find($user_id)->getImg,
            "address" => Costumuser::find($user_id)->getAddress,
            "links" => asset('storage/images'),
            "id" => $request->session()->get('loggedUser'),
            'email' => $user->email,
        ]);
    }


    public function logout(Request $request)
    {
        $request->session()->remove('loggedUser');
        return redirect('login');
    }

    public function img(Request $request, Img $img)
    {
        if ($request->avatar) {
            $name = $request->file('avatar')->getClientOriginalName();
            $size = $request->file('avatar')->getSize();
            // dd($request->file('avatar'));
            $request->file('avatar')->storeAs('public/images/', $name);
            $img->create([
                "name" => $name,
                "size" => $size,
                "user_id" => $request->session()->get('loggedUser'),
            ]);
        }
    }
    public function delImg(Request $request, Img $img)
    {
        // dd($request->input('id'));
        // $img->remove($request->file('avatar'));
        $res = $img->where('id', $request->input('id'))->delete();
        return back();
    }

    // reset password
    public function forgetPass(Request $request)
    {
        return Inertia::render('Reset', [
            "error" => $request->session()->get('error'),
            "success" => $request->session()->get('success'),
        ]);
    }
    public function send(Request $request, Costumuser $user)
    {
        $userId = $user->where('email', $request->email)->first();
        if ($userId) {
            $testId = $userId->id;
            // dd($testId);
            $mail = Mail::to('xizanishvili.99@gmail.com')->send(new ForgotPassword($testId));
            if ($mail) return back()->with('success', 'gaigzavna');
        } else {
            return back()->with('error', 'wrong mail');
        }
    }

    public function resetpass(Request $request)
    {
        return Inertia::render('ChangePass', [
            'id' => $request->input('id'),
        ]);
    }

    public function resetpassword(Request $request, Costumuser $user)
    {
        // dd($request->new_password, $request->id);

        $changed = $user->where('id', $request->id);
        $newPass = Hash::make($request->new_password);
        $changed->update(["password" => $newPass]);
    }

    public function address(Request $request, Address $address)
    {
        $saveData = Arr::except($request->except('avatar'), []);
        //  "user_id" => $request->session()->get('loggedUser'),
        // dd($saveData);
        $address->create([
            "address" => $request->address,
            "user_id" => $request->session()->get('loggedUser'),
        ]);
    }
}
