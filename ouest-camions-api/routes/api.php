<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\Admin\TruckController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\TrailerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\CategoryTruckController;
use App\Http\Controllers\Admin\CategoryTrailerController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


// users

Route::middleware('auth:api')->group(function () {

Route::get('users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{users}', [UserController::class, 'show']);
Route::get('users/{id}', [UserController::class, 'show']);
Route::patch('/users/{users}', [UserController::class, 'update']);
Route::delete('/users/{users}', [UserController::class, 'destroy']);

});
// orders

Route::get('orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{orders}', [OrderController::class, 'show']);
Route::get('orders/{id}', [OrderController::class, 'show']);
Route::patch('/orders/{orders}', [OrderController::class, 'update']);
Route::delete('/orders/{orders}', [OrderController::class, 'destroy']);




/* routes admin */
//Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
//Route::get('/user', function (Request $request) {

// contacts

Route::get('contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts/{contacts}', [ContactController::class, 'show']);
Route::get('contacts/{id}', [ContactController::class, 'show']);
Route::patch('/contacts/{contacts}', [ContactController::class, 'update']);
Route::delete('/contacts/{contacts}', [ContactController::class, 'destroy']);



// categories-trucks

Route::get('categories-trucks', [CategoryTruckController::class, 'index']);
Route::get('/header-image', [CategoryTruckController::class, 'getHeaderImage']);
Route::post('/categories-trucks', [CategoryTruckController::class, 'store']);
Route::get('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'show']);
//Route::get('categories-trucks/{id}', [CategoryTruckController::class, 'show']);
Route::patch('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'update']);
Route::delete('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'destroy']);

// categories-trailers

Route::get('categories-trailers', [CategoryTrailerController::class, 'index']);
Route::post('/categories-trailers', [CategoryTrailerController::class, 'store']);
//Route::get('categories-trailers/{id}', [CategoryTrailerController::class, 'show']);
Route::get('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'show']);

Route::patch('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'update']);
Route::delete('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'destroy']);



// trucks

Route::get('trucks', [TruckController::class, 'index']);
Route::post('/trucks', [TruckController::class, 'store']);
Route::get('/trucks/{truck}', [TruckController::class, 'show']);
Route::get('trucks/{id}', [TruckController::class, 'show']);
Route::patch('/trucks/{truck}', [TruckController::class, 'update']);
Route::delete('/trucks/{truck}', [TruckController::class, 'destroy']);
Route::get('/trucks/category/{id}', [TruckController::class, 'getTrucksByCategory']);


// trailers

Route::get('trailers', [TrailerController::class, 'index']);
Route::post('/trailers', [TrailerController::class, 'store']);
Route::get('/trailers/{trailer}', [TrailerController::class, 'show']);
Route::get('trailers/{id}', [TrailerController::class, 'show']);
Route::patch('/trailers/{trailer}', [TrailerController::class, 'update']);
Route::delete('/trailers/{trailer}', [TrailerController::class, 'destroy']);
Route::get('/trailers/category/{id}', [TrailerController::class, 'getTrailersByCategory']);




//return $request->user();
//})->middleware('auth:sanctum');
// Route pour le dashboard administratif

Route::middleware('auth:api', 'admin')->group(function () {
Route::get('/admin', [DashboardController::class, 'index']);  /* admin dashboard => routes admin only, easier to find url */
Route::get('/admin/categories-trucks', [CategoryTruckController::class, 'index']);

Route::get('/admin/categories-trailers', [CategoryTrailerController::class, 'index']);
Route::post('/admin/categories-trailers', [CategoryTrailerController::class, 'store']);

});

Route::middleware('auth:api')->group(function () {
    Route::get('/currentuser', [UserController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('cart', [OrderController::class, 'index']); 
    Route::get('payment', [OrderController::class, 'index']);
    Route::get('orders', [OrderController::class, 'index']);
});