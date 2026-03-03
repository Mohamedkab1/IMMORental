<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Example method to find a user by email
    public function findByEmail(Request $request)
    {
        // validate the incoming request if needed
        $request->validate([
            'email' => 'required|email',
        ]);

        // perform the query using the User model
        $user = User::where('email', $request->email)->first();

        return response()->json($user);
    }
}
