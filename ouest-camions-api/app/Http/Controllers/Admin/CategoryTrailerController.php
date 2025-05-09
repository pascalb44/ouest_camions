<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\CategoryTrailer;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

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
            'description' => 'required|string',
            'image_category_trailer' => 'required|image|mimes:jpg,jpeg,png|max:2048',

        ]);
        $filename = "";
        if ($request->file('image_category_trailer')) {
            $filenameWithExt = $request->file('image_category_trailer')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_category_trailer')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_category_trailer')->storeAs('/uploads/CategoryTrailer', $filename); /* in the <=> folder */
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



    public function update(Request $request, $id)
    {
        $categoryTrailer = CategoryTrailer::findOrFail($id);

        $validatedData = $request->validate([
            'name_category_trailer' => 'required|string',
            'image_category_trailer' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' =>  'required|string',
        ]);

        if ($request->hasFile('image_category_trailer')) {
            $file = $request->file('image_category_trailer');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;        /* timestamp behind the name */
            $file->storeAs('uploads/CategoryTrailer', $filename, 'public');
            $validatedData['image_category_trailer'] = $filename;

            // remove picture if exist

            if ($categoryTrailer->image_category_trailer && Storage::exists('/uploads/CategoryTrailer/' . $categoryTrailer->image_category_trailer)) {
                Storage::delete('/uploads/CategoryTrailer/' . $categoryTrailer->image_category_trailer);
            }
        }

        $categoryTrailer->update($validatedData);

        return response()->json([
            'status' => 'Catégorie de remorque mise à jour avec succès',
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
            'status' => 'Catégorie de remorque supprimée avec succès'
        ], 200);
    }
}



//   admin@ouestcamions.fr 
//    AdminOuest123!

// robert@transportslenantais.fr
// robert44 
// adresse 168.231.80.181