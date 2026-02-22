<?php
User::create([
    'name' => $request->name,
    'email' => $request->email,
    'password' => bcrypt($request->password),
    'role' => $request->role
]);