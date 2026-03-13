<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;

use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/dashboard', function () {
    return "welcome to Dashboard ";
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/properties', [PropertyController::class, 'index']);

    Route::get('/properties/{id}', [PropertyController::class,'show']);
    Route::put('/properties/{id}',[PropertyController::class,'update']);
    Route::delete('/properties/{id}',[PropertyController::class,'destroy']);

    Route::put('/demands/{id}/status', [DemandController::class, 'updateStatus']);
    
});
