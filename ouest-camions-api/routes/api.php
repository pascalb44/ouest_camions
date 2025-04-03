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


/*  public routes */

Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// categories-trucks

Route::get('categories-trucks', [CategoryTruckController::class, 'index']);
Route::get('/header-image', [CategoryTruckController::class, 'getHeaderImage']);
Route::get('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'show']);
//Route::get('categories-trucks/{id}', [CategoryTruckController::class, 'show']);



// categories-trailers

Route::get('categories-trailers', [CategoryTrailerController::class, 'index']); /* public list  */
Route::get('/categories-trailers/{categories_trailers}', [CategoryTrailerController::class, 'show']); /* public detail */


// trucks

Route::get('trucks', [TruckController::class, 'index']);
Route::get('/trucks/{truck}', [TruckController::class, 'show']);
//Route::get('trucks/{id}', [TruckController::class, 'show']);
Route::get('/trucks/category/{id}', [TruckController::class, 'getTrucksByCategory']);

// trailers

Route::get('trailers', [TrailerController::class, 'index']);
Route::get('/trailers/{trailer}', [TrailerController::class, 'show']);
//Route::get('trailers/{id}', [TrailerController::class, 'show']);
Route::get('/trailers/category/{id}', [TrailerController::class, 'getTrailersByCategory']);



// contacts

Route::get('contacts', [ContactController::class, 'index']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::get('/contacts/{contacts}', [ContactController::class, 'show']);
Route::get('contacts/{id}', [ContactController::class, 'show']);
Route::patch('/contacts/{contacts}', [ContactController::class, 'update']);
Route::delete('/contacts/{contacts}', [ContactController::class, 'destroy']);



/* protected routes */



Route::middleware('auth:api')->group(function () {
  
    // for dashboard admin 

Route::get('/admin', [DashboardController::class, 'index']);  /* admin dashboard => routes admin only, easier to find url */

// users

Route::get('/currentuser', [UserController::class, 'currentUser']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
/*Route::get('/users/{user}', [UserController::class, 'show']); */
Route::get('users/{id}', [UserController::class, 'show']);
Route::patch('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']); 


// categories-trucks

Route::get('/admin/categories-trucks', [CategoryTruckController::class, 'index']); /* list for admin*/
Route::post('/admin/categories-trucks', [CategoryTruckController::class, 'store']);
Route::patch('/admin/categories-trucks/{id}', [CategoryTruckController::class, 'update']); /* no show for admin, it's just for update */
Route::delete('/admin/categories-trucks/{id}', [CategoryTruckController::class, 'destroy']);


// categories-trailers

Route::get('/admin/categories-trailers', [CategoryTrailerController::class, 'index']); /* list for admin*/
Route::post('/admin/categories-trailers', [CategoryTrailerController::class, 'store']);
Route::patch('admin/categories-trailers/{id}', [CategoryTrailerController::class, 'update']); /* no show for admin, it's just for update */
Route::delete('/admin/categories-trailers/{id}', [CategoryTrailerController::class, 'destroy']);


// trucks

Route::post('/trucks', [TruckController::class, 'store']);
Route::patch('/trucks/{truck}', [TruckController::class, 'update']);
Route::delete('/trucks/{truck}', [TruckController::class, 'destroy']);


// trailers

Route::post('/trailers', [TrailerController::class, 'store']);
Route::patch('/trailers/{trailer}', [TrailerController::class, 'update']);
Route::delete('/trailers/{trailer}', [TrailerController::class, 'destroy']);


// orders

Route::get('cart', [OrderController::class, 'index']); 
Route::get('payment', [OrderController::class, 'index']);
Route::get('orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/{orders}', [OrderController::class, 'show']);
Route::get('orders/{id}', [OrderController::class, 'show']);
Route::patch('/orders/{orders}', [OrderController::class, 'update']);
Route::delete('/orders/{orders}', [OrderController::class, 'destroy']);

});



/* routes admin */
//Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
//Route::get('/user', function (Request $request) {



// categories-trucks

/*
Route::post('/categories-trucks', [CategoryTruckController::class, 'store']);
//Route::get('categories-trucks/{id}', [CategoryTruckController::class, 'show']);
Route::patch('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'update']);
Route::delete('/categories-trucks/{categories_trucks}', [CategoryTruckController::class, 'destroy']);

//return $request->user();
//})->middleware('auth:sanctum');

/* Route::middleware('auth:api', 'admin')->group(function () {


});

*/


