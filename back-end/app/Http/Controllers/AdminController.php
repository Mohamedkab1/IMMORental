<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Property;
use App\Models\Contact; // ou Message selon ton projet

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'users' => User::count(),
            'properties' => Property::count(),
            'contacts' => Contact::count(),
        ]);
    }
}