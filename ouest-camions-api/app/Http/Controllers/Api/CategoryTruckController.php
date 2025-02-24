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
        ]);

        $filename = "";
        if ($request->file('image_category_truck')) {
            $filenameWithExt = $request->file('image_category_truck')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_category_truck')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_category_truck')->storeAs('/uploads', $filename);
        } else {
            $filename = null;
        }
        $categoryTruck = CategoryTruck::create(array_merge(
            $request->all(),
            ['image_category_truck' => $filename]
        ));

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
        $categoryTruck = CategoryTruck::find($id);

        if (!$categoryTruck) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        return response()->json($categoryTruck);
    }


    /**
     * Update the specified resource in storage.
     */

     public function update(Request $request, $id)
     {
         // Utilisation de findOrFail au lieu de l'injection de modèle
         $categoryTruck = CategoryTruck::findOrFail($id);
         
         $request->validate([
             'name_category_truck' => 'required|string',
             'image_category_truck' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
         ]);
         
         // Créez un tableau pour les données à mettre à jour
         $updateData = $request->only(['name_category_truck']);
         
         if ($request->hasFile('image_category_truck')) {
             // Vérifiez si l'ancienne image existe
             if ($categoryTruck->image_category_truck && file_exists(public_path('uploads/' . $categoryTruck->image_category_truck))) {
                 unlink(public_path('uploads/' . $categoryTruck->image_category_truck));
             }
             
             $file = $request->file('image_category_truck');
             $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
             $extension = $file->getClientOriginalExtension();
             $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
             
             // Utilisez move au lieu de storeAs
             $file->move(public_path('uploads'), $filename);
             $updateData['image_category_truck'] = $filename;
         }

        $categoryTruck->update($updateData); 
        $categoryTruck = $categoryTruck->fresh();
        return response()->json([
            'status' => 'categorie de camion mise à jour avec succès',
            'data' => $categoryTruck,        
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $categoryTruck = CategoryTruck::findOrFail($id);
        $deleted = $categoryTruck->delete();
        return response()->json([
            'status' => 'categorie de camions supprimée avec succès'
        ], 500);
    }
}
