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

    public function update(Request $request, CategoryTruck $categoryTruck)
    {


        $request->validate([
            'name_category_truck' => 'required|string',
            'image_category_truck' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);


        $updateData = [];

        if ($request->has('name_category_truck')) {
            $updateData['name_category_truck'] = $request->input('name_category_truck');
        }

        if ($request->hasFile('image_category_truck')) {
            if ($categoryTruck->imageCategoryTruck && file_exists(public_path('uploads/' . $categoryTruck->imageCategoryTruck))) {
                unlink(public_path('uploads/' . $categoryTruck->imageCategoryTruck));
            }

            $file = $request->file('image_category_truck');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $file->storeAs('uploads/', $filename);
            $updateData['image_category_truck'] = $filename;
        }

        try {
            $categoryTruck->update($updateData);
            return response()->json([
                'message' => 'Catégorie mise à jour avec succès',
                'data' => $categoryTruck->refresh()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        $categoryTruck = CategoryTruck::findOrFail($id);
        $deleted = $categoryTruck->delete();
        return response()->json([
            'status' => 'categorie supprimée avec succès'
        ], 500);
    }
}
