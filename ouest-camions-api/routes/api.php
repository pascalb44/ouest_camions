<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\TruckController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\TrailerController;
use App\Http\Controllers\Api\CategoryTruckController;
use App\Http\Controllers\Api\CategoryTrailerController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource("orders", OrderController::class);
Route::apiResource("users", UserController::class);
Route::apiResource("contacts", ContactController::class);
Route::apiResource("trailers", TrailerController::class);
Route::apiResource("trucks", TruckController::class);
Route::apiResource("categories-trucks", CategoryTruckController ::class);
Route::apiResource("categories-trailers", CategoryTrailerController::class);