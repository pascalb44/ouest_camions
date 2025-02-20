<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\CategoryTruck;
use App\Http\Controllers\Controller;

class CategoryTruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryTrucks  = CategoryTruck::all(); // import all categories of trucks
        return response()->json($categoryTrucks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name_category_truck' => 'required|string',
            'image_category_truck' => 'required|string',
        ]); 

        $categoryTruck = CategoryTruck::create($formFields);

        return response()->json([
            'message' => 'Catégorie ajoutée avec succès',
            'data' => $categoryTruck
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoryTruck= CategoryTruck::find($id);

        if (!$categoryTruck) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        return response()->json($categoryTruck);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $categoryTruck = CategoryTruck::find($id);

        if (!$categoryTruck) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }

        $formFields = $request->validate([
            'name_category_truck' => 'sometimes|string',
            'image_category_truck' => 'sometimes|string',
        ]);

        $categoryTruck->update($formFields);

        return response()->json([
            'message' => 'Catégorie mise à jour avec succès',
            'data' => $categoryTruck
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoryTruck $categoryTruck)
    {
        $categoryTruck->delete();
        return response()->json([
            'status' => 'categorie supprimée avec succès'
        ]);
    }
}
