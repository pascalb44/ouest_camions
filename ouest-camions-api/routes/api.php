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

/*
Route::apiResource("orders", OrderController::class);
Route::apiResource("users", UserController::class); 


Route::apiResource("contacts", ContactController::class);
Route::apiResource("trailers", TrailerController::class);
Route::apiResource("trucks", TruckController::class);
Route::apiResource("categories-trucks", CategoryTruckController ::class);
Route::apiResource("categories-trailers", CategoryTrailerController::class);
*/


/* routes admin */

// users

Route::get('users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{users}', [UserController::class, 'show']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::patch('/users/{users}', [UserController::class, 'update']);
Route::delete('/users/{users}', [UserController::class, 'destroy']);

// categories-trucks

Route::get('categories-trucks', [CategoryTruckController::class, 'index']);
Route::post('/categories-trucks', [CategoryTruckController::class, 'store']);
Route::get('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'show']);
Route::get('categories-trucks/{id}', [CategoryTruckController::class, 'show']);
Route::patch('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'update']);
Route::delete('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'destroy']);

// categories-trailers

Route::get('categories-trailers', [CategoryTrailerController::class, 'index']);
Route::post('/categories-trailers', [CategoryTrailerController::class, 'store']);
Route::get('categories-trailers/{id}', [CategoryTrailerController::class, 'show']);
Route::patch('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'update']);
Route::delete('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'destroy']);


// trucks

Route::get('trucks', [TruckController::class, 'index']);
Route::post('/trucks', [TruckController::class, 'store']);
Route::get('/trucks/{truck}', [TruckController::class, 'show']);
Route::get('trucks/{id}', [TruckController::class, 'show']);
Route::patch('/trucks/{truck}', [TruckController::class, 'update']);
Route::delete('/trucks/{truck}', [TruckController::class, 'destroy']);

// trailers

Route::get('trailers', [TrailerController::class, 'index']);
Route::post('/trailers', [TrailerController::class, 'store']);
Route::get('/trailers/{trailer}', [TrailerController::class, 'show']);
Route::get('trailers/{id}', [TrailerController::class, 'show']);
Route::patch('/trailers/{trailer}', [TrailerController::class, 'update']);
Route::delete('/trailers/{trailer}', [TrailerController::class, 'destroy']);

// orders

Route::get('orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{orders}', [OrderController::class, 'show']);
Route::get('orders/{id}', [OrderController::class, 'show']);
Route::patch('/orders/{orders}', [OrderController::class, 'update']);
Route::delete('/orders/{orders}', [OrderController::class, 'destroy']);


// users

Route::get('contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts/{contacts}', [ContactController::class, 'show']);
Route::get('contacts/{id}', [ContactController::class, 'show']);
Route::patch('/contacts/{contacts}', [ContactController::class, 'update']);
Route::delete('/contacts/{contacts}', [ContactController::class, 'destroy']);