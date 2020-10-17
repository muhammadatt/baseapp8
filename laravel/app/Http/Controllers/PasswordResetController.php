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

class PasswordResetController extends Controller
{

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

        //Once we have attempted
        // to send the link, we will examine the status to see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        return $status == Password::RESET_LINK_SENT
            ? response()->json(['success' => ["message" => trans($status)]], 200)
            : response()->json(['error' => ["message" => trans($status)]], 422);
    }

    /**
     * Get the response for a successful password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse(Request $request, $response)
    {
        //On success, string $response is returned with value of RESET_LINK_SENT (default: "passwords.sent") 
        //Laravel trans() translates this response to the text as assigned in resources/lang/en/passwords.php

        return response()->json(['success' => ["message" => trans($response)]], 200);
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['error' => ["message" => trans($response)]], 422);
    }

    /////////////////////////
    // HANDLE THE ACTUAL PASSWORD RESET FORM
    /////////////////////////////

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        //$request->validate($this->rules(), $this->validationErrorMessages());

        //Need to refactor this to ensure sync with validation rules in UserController@register 

        $validator = Validator::make($request->all(), [
            'token' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
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

        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        return $status == Password::PASSWORD_RESET
            ? response()->json(['success' => ["message" => trans($status)]], 200)
            : response()->json(['error' => ["message" => trans($status)]], 422);
    }

    /**
     * Return the response for a successful password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetResponse(Request $request, $response)
    {

        return response()->json(['success' => ["message" => trans($response)]], 200);
    }

    /**
     * Return the response for a failed password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        // return redirect()->back()
        //             ->withInput($request->only('email'))
        //             ->withErrors(['email' => trans($response)]);

        return response()->json(['error' => ["message" => trans($response)]], 400);
    }
}
