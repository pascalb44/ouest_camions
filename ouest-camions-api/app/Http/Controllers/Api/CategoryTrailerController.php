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
            'image_category_trailer' => 'required|string',
        ]); 

        $categoryTrailer = CategoryTrailer::create($formFields);

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
        $categoryTrailer= CategoryTrailer::find($id);

        if (!$categoryTrailer) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        return response()->json($categoryTrailer);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryTrailer $categoryTrailer)
    {
        $categoryTrailer->delete();
        return response()->json([
            'status' => 'categorie supprimée avec succès'
        ]);
    }
}
