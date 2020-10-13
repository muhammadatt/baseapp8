<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
           
            //For Passport we need to return the JWT token and userData 
            //$user = Auth::user();

            //$success['token'] = $user->createToken('MyApp')->accessToken;
            //$success['name'] = $user->name;
            //$success['email'] = $user->email;

            return response()->json(['success' => true], 200);
        }

        return response()->json(
            
            [
            'success' => false, 
            'error' => ["message" => 'Invalid email address and / or password.'] 
            ], 403
        );  
    }

    public function user(Request $request){
        if (Auth::user())
            return response()->json(['success' => true, 'user'=>Auth::user()], 200);
        else 
            return response()->json(['success'=> false, 'error'=>["message" => "User not logged in"]]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        Auth::login($user);
        
        //For Passport we need to return the JWT token
        //$success['token'] = $user->createToken('MyApp')->accessToken;
        //$success['name'] = $user->name;
        //$success['email'] = $user->email;

        return response()->json(['success' => true], 200);
    }

    public function getDetails()
    {
        $events = [
              [
                "id" => "1234",
                "title" => "Puppy Parade",
                "time" => "12:00",
                "date" => "Feb 22, 2022"
              ],
              [
                "id" => "1584",
                "title" => "Cat Cabaret",
                "time" => "9:00",
                "date" => "March 4, 2022"
              ],
              [
                "id" => "2794",
                "title" => "Doggy Day",
                "time" => "1:00",
                "date" => "June 12, 2022"
              ],
              [
                "id" => "4619",
                "title" => "Feline Frenzy",
                "time" => "8:00",
                "date" => "July 28, 2022"
              ]
            ];
  
        return response()->json(['success' => $events], 200);
    }

}
