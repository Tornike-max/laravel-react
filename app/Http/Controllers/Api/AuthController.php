<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        /** @var User $user */
        $data = $request->validate([
            'name' => ['required', 'max:35'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'max:35', 'min:8']
        ]);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $newUser = User::find($user->id);

        $token = $newUser->createToken('main')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];
        return $response;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'max:35', 'exists:users,email'],
            'password' => ['required', 'min:8'],
        ]);

        if (!Auth::attempt($credentials)) {
            return $response = [
                'message' => 'Provided email address or password is incorrect!'
            ];
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
        ];
        return $response;
    }


    public function logout(Request $request)
    {
        /** @var User $user */

        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Invalid or expired token'], 401);
        }
        $user->tokens()->delete();
        $response = [
            'message' => 'Successfully logged out!',
            'status' => 200
        ];

        return $response;
    }
}
