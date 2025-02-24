<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\CategoryTrailer;
use App\Http\Controllers\Controller;

class CategoryTrailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryTrailer  = CategoryTrailer::all(); // import all categories of trailers
        return response()->json($categoryTrailer);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name_category_trailer' => 'required|string',
        ]);

        $filename = "";
        if ($request->file('image_category_trailer')) {
            $filenameWithExt = $request->file('image_category_trailer')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_category_trailer')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_category_trailer')->storeAs('/uploads', $filename);
        } else {
            $filename = null;
        }
        $categoryTrailer = CategoryTrailer::create(array_merge(
            $request->all(),
            ['image_category_trailer' => $filename]
        ));


        return response()->json([
            'message' => 'Catégorie ajoutée avec succès',
            'data' => $categoryTrailer
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoryTrailer = CategoryTrailer::find($id);

        if (!$categoryTrailer) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        return response()->json($categoryTrailer);
    }


    /**
     * Update the specified resource in storage.
     */
    /*
    public function update(Request $request, CategoryTrailer $categoryTrailer)
    {
        $categoryTrailer = CategoryTrailer::find($id);

        if (!$categoryTrailer) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $formFields = $request->validate([
            'name_category_trailer' => 'sometimes|string',
            'image_category_trailer' => 'sometimes|string',
        ]);

        $categoryTrailer->update($formFields);

        return response()->json([
            'message' => 'Catégorie mise à jour avec succès',
            'data' => $categoryTrailer
        ]);
    }
*/

public function update(Request $request, $id)
{
    // Utilisation de findOrFail au lieu de l'injection de modèle
    $CategoryTrailer = CategoryTrailer::findOrFail($id);
    
    $request->validate([
        'name_category_trailer' => 'required|string',
        'image_category_trailer' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);
    
    // Créez un tableau pour les données à mettre à jour
    $updateData = $request->only(['name_category_trailer']);
    
    if ($request->hasFile('image_category_trailer')) {
        // Vérifiez si l'ancienne image existe
        if ($CategoryTrailer->image_category_trailer && file_exists(public_path('uploads/' . $CategoryTrailer->image_category_trailer))) {
            unlink(public_path('uploads/' . $CategoryTrailer->image_category_trailer));
        }
        
        $file = $request->file('image_category_trailer');
        $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $extension = $file->getClientOriginalExtension();
        $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
        
        // Utilisez move au lieu de storeAs
        $file->move(public_path('uploads'), $filename);
        $updateData['image_category_trailer'] = $filename;
    }

   $CategoryTrailer->update($updateData); 
   $CategoryTrailer = $CategoryTrailer->fresh();
   return response()->json([
       'status' => 'categorie de camion mise à jour avec succès',
       'data' => $CategoryTrailer,        
   ]);
}





    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $categoryTrailer = CategoryTrailer::findOrFail($id);
        $deleted = $categoryTrailer->delete();
        return response()->json([
            'status' => 'categorie de remorque supprimée avec succès'
        ], 500);
    }
}
