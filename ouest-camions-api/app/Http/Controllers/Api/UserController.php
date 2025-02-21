<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
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
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'password' => 'required|string',
            'company' => 'required|string',
            'siren' => 'required|string',
            'address' => 'required|string',
            'postalCode' => 'required|string',
            'town' => 'required|string',
            'telephone' => 'required|string',   
            'id_role' => 'required|exists:roles,id',
        ]); 
/*
        $filename = "";
        if ($request->file('siren')) {
            $filenameWithExt = $request->file('siren')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('siren')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('siren')->storeAs('/uploads', $filename);
        } else {
            $filename = null;
        }
        */
        $user = User::create(array_merge(
            $request->all(),
        //    ['siren' => $filename]
        ));
        
        return response()->json([
            'message' => 'Client ajouté avec succès',
            'data' => $user
        ], 201);
    }


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
