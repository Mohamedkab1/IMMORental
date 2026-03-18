<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\BienController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\AdminController;

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

    Route::get('/properties', [PropertyController::class, 'index']);

    Route::get('/properties/{id}', [PropertyController::class,'show']);
    Route::put('/properties/{id}',[PropertyController::class,'update']);
    Route::delete('/properties/{id}',[PropertyController::class,'destroy']);

    Route::get('/demands', [DemandController::class, 'index']);
    Route::put('/demands/{id}/status', [DemandController::class, 'updateStatus']);

});

Route::post('/biens', [BienController::class,'store']);

Route::apiResource('biens', BienController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});