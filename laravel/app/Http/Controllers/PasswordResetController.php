<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
//use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
//use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Actions\Fortify\PasswordValidationRules; 


class PasswordResetController extends Controller
{

    use PasswordValidationRules;

    /////////////////////////
    // REQUEST A PASSWORD RESET EMAIL
    /////////////////////////////

    /**
     * Email a reset link to the requested user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        //Validate user input
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Attempt to send the password reset email to user.  
        $status = Password::sendResetLink(
            $request->only('email')
        );

        //Once we have attempted to send the link, we will examine the status to see the message we
        // need to show to the user. Finally, we'll return a proper response.

        //On success, $status is returned as a string with value of RESET_LINK_SENT (default value: "passwords.sent") 
        //Laravel trans() translates this response to the full user message assigned in resources/lang/en/passwords.php

        return $status == Password::RESET_LINK_SENT
            ? response()->json(['success' => ["message" => trans($status)]], 200)
            : response()->json(['error' => ["message" => trans($status)]], 422);
    }


    /////////////////////////
    // HANDLE THE ACTUAL PASSWORD RESET FORM SUBMIT
    /////////////////////////////

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'token' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => $this->passwordRules()
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Here we will attempt to reset the user's password. If it is successful, we
        // will update the password on the actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();

                $user->setRememberToken(Str::random(60));

                event(new PasswordReset($user));
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['success' => ["message" => trans($status)]], 200)
            : response()->json(['error' => ["message" => trans($status)]], 422);
    }

}
