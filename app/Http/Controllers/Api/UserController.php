<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(
            User::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:55'],
            'email' => ['email', 'required', 'unique:users,email'],
            'password' => ['required', 'min:8',],
        ]);
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        $response = [
            new UserResource($user),
            201
        ];
        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:55'],
            'email' => ['required'],
            'password' => ['required', 'min:8'],
        ]);
        if ($data['password']) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        $respponse = [
            'message' => 'User Updated Successfully',
            $user,
        ];

        return $respponse;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        $response = [
            'message' => 'User Deleted Succeesfully',
            'status' => 204,
        ];

        return $response;
    }
}
