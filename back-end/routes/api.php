<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\MessageController;

use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/contact', [MessageController::class, 'store']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', function () {
    return "welcome to Dashboard ";
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/properties', function () {
        return \App\Models\Property::where('user_id', auth()->id())->get();
    });
    Route::get('/properties/{id}', [PropertyController::class,'show']);
    Route::put('/properties/{id}',[PropertyController::class,'update']);
    Route::delete('/properties/{id}',[PropertyController::class,'destroy']);
});
