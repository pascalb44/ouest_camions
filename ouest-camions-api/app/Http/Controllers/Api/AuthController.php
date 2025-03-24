<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class AuthController extends Controller
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function register(Request $request)
    {
     
    
        $request->validate([
             'first_name'    => 'required|string|max:255',
             'last_name'     => 'required|string|max:255',
             'email'         => 'required|email|unique:users',
             'password'      => 'required|string|min:6|max:255',
             'company'       => 'required|string|max:255',
             'siren'         => 'required|integer|digits:9',
             'address'       => 'required|string|max:255',
             'postalCode'    => 'required|string|max:10',
             'town'          => 'required|string|max:255',
             'telephone'     => 'required|string|max:20',
        ]);

        $user = User::create([
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'email'         => $request->email,
            'password' => Hash::make($request->password),
            'company'       => $request->company,
            'siren'         => $request->siren,
            'address'       => $request->address,
            'postalCode'    => $request->postalCode,
            'town'          => $request->town,
            'telephone'     => $request->telephone,
            'id_role' => $request->id_role ?? 2,        
        ]);

        $user->email_verified_at = Carbon::now();
            $user->save();

        $token = auth()->login($user); // non-blocking error message 
        //    dd($request);
        return response()->json([
            'meta' => [
                'code'    => 200,
                'status'  => 'success',
                'message' => 'Compte créé avec succès.',
            ],
            'data' => [
                'user' => $user,
                'access_token' => [
                    'token'      => $token,
                    'type'       => 'Bearer',
                    'expires_in' => JWTAuth::factory()->getTTL() * 3660,
                ],
            ], 
        ]);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
    
        $token = JWTAuth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ]);
    
        if (!$token) {
            return response()->json([
                'meta' => [
                    'code'    => 401,
                    'status'  => 'error',
                    'message' => 'Email ou mot de passe incorrect.',
                ],
            ], 401);
        }
    
        $user = JWTAuth::user();
    
        // add role in token
        $customClaims = ['role' => $user->id_role];
        $token = JWTAuth::claims($customClaims)->fromUser($user);
    
        return response()->json([
            'meta' => [
                'code'    => 200,
                'status'  => 'success',
                'message' => 'Connexion réussie.',
            ],
            'data' => [
                'user' => $user,
                'access_token' => [
                    'token'      => $token,
                    'type'       => 'Bearer',
                    'expires_in' => JWTAuth::factory()->getTTL() * 3600,
                ],
            ],
        ]);
    }
    
    /**
     * Destroy an authenticated session.
     */
    public function logout()
    {
        $token = JWTAuth::getToken();
        $invalidate = JWTAuth::invalidate($token);
        if ($invalidate) {
            return response()->json([
                'meta' => [
                    'code' => 200,
                    'status' => 'success',
                    'message' => 'Successfully logged out',
                ],
                'data' => [],
            ]);
        }
    }
}

