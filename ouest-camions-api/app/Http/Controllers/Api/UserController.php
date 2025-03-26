<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }


    public function currentUser(Request $request)
    {
        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User fetched successfully!',
            ],
            'data' => [
                'user' => JWTAuth::user(), // use JWTAuth to get the user    
            ],
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    { {
            return response()->json(User::all());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    /*
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'company' => 'required|string',
            'siren' => 'nullable|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'address' => 'required|string',
            'postal_code' => 'required|string',
            'town' => 'required|string',
            'telephone' => 'required|string',
            'id_role' => 'required|exists:roles,id',
        ]);
        
    $hashedPassword = bcrypt($request->password);

    $user = User::create([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => $hashedPassword, 
        'company' => $request->company,
        'siren' => $request->siren,
        'address' => $request->address,
        'postal_code' => $request->postal_code,
        'town' => $request->town,
        'telephone' => $request->telephone,
        'id_role' => $request->id_role,
    ]);

    return response()->json([
        'message' => 'Client ajouté avec succès',
        'data' => $user
    ], 201);
}
    */
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        return response()->json($user);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([
            'message' => 'Utilisateur supprimé avec succès'
        ]);
    }
}
