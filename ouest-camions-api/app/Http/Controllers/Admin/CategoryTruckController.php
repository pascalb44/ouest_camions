<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\CategoryTruck;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;


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
            $path = $request->file('image_category_truck')->storeAs('/uploads/CategoryTruck', $filename); /* in the <=> folder */
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


    public function update(Request $request, $id)
    {
        $categoryTruck = CategoryTruck::findOrFail($id);

        $validatedData = $request->validate([
            'name_category_truck' => 'required|string|max:255',
            'image_category_truck' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);


        if ($request->hasFile('image_category_truck')) {
            $file = $request->file('image_category_truck');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $file->storeAs('uploads/CategoryTruck', $filename, 'public');
            $validatedData['image_category_truck'] = $filename;

            // Supprimer l'ancienne image si elle existe
            if ($categoryTruck->image_category_truck) {
                Storage::disk('public')->delete('uploads/CategoryTruck/' . $categoryTruck->image_category_truck);
            }
        }

        $categoryTruck->update($validatedData);

        return response()->json(['message' => 'Mise à jour réussie !'], 200);
    }


    public function destroy($id)
    {
        {
            $categoryTruck = CategoryTruck::findOrFail($id);
            $deleted = $categoryTruck->delete();
            return response()->json([
                'status' => 'categorie de camion supprimée avec succès'
            ], 200);
        }
    }


    public function getHeaderImage() /* picture in background of the header for mobile */
    {
        $imagePath = asset('storage/uploads/CategoryTruck/camion_IA2.jpg');
        return response()->json(['image' => $imagePath]);
    }
}
