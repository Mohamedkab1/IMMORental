<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
    public function register(RegisterRequest $request){
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role
        ]);

        return response()->json(['message' => 'User registered successfully']);
    }
}
