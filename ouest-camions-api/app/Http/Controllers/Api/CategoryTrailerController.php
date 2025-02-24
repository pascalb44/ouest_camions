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

    public function update(Request $request, CategoryTrailer $categoryTrailer)
    {

        $request->validate([
            'name_category_trailer' => 'required|max:100',
            'image_category_trailer' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $updateData = [];
        if ($request->has('name_category_trailer')) {
            $updateData['name_category_trailer'] = $request->input('name_category_trailer');
        }

        if ($request->hasFile('categoryTrailer')) {
            if ($categoryTrailer->imageCategoryTrailer && file_exists(public_path('uploads/' . $categoryTrailer->imageCategoryTrailer))) {
                unlink(public_path('uploads/' . $categoryTrailer->imageCategoryTrailer));
            }

            $file = $request->file('image_category_trailer');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $file->storeAs('uploads/', $filename);
            $updateData['image_category_trailer'] = $filename;
        }

        $categoryTrailer->update($updateData);

        return response()->json([
            'status' => 'Catégorie de remorque mis à jour avec succès',
            'data' => $categoryTrailer,
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
