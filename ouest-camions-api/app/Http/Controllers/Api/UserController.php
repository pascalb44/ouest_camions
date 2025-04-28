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
     */ public function update(Request $request, User $user)
    {
        $authenticatedUser = JWTAuth::user();
        if ($authenticatedUser->id !== $user->id) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        // Valid request
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'siren' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validation pour le fichier image
            'address' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:10',
            'town' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
        ]);

        // siren file 
        if ($request->hasFile('siren')) {
            // delete old file if exist
            if ($user->siren && file_exists(public_path('uploads/users/' . $user->siren))) {
                unlink(public_path('uploads/users/' . $user->siren));
            }

            $file = $request->file('siren');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $file->storeAs('uploads/users', $filename, 'public');
            $validatedData['siren'] = $filename;
        }

        $user->update($validatedData);

        return response()->json([
            'message' => 'Utilisateur mis à jour avec succès',
            'user' => $user
        ], 200);
    }


    public function destroy($id)
    {
        $user = JWTAuth::user();  /* if user connected */

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        if ($user->id !== (int)$id) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer un autre compte.'], 403);
        }

        $userToDelete = User::findOrFail($id);  /* get the user to delete */
        $userToDelete->delete();

        return response()->json([
            'message' => 'Utilisateur supprimé avec succès'
        ]);
    }
}
