<?php

namespace App\Http\Controllers\Admin;

use App\Models\Trailer;
use Illuminate\Http\Request;
use App\Models\CategoryTrailer;
use App\Http\Controllers\Controller;

class TrailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Trailer::query();
        if ($request->has('category')) {
            $query->where('id_category_trailer', $request->category); /* to get the trailers list by categories */
        }
        return response()->json($query->get());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'brand_trailer' => 'required|string',
            'name_trailer' => 'required|string',
            'description_trailer' => 'required|string',
            'color_trailer' => 'required|string',
            'length_trailer' => 'required|string',
            'width_trailer' => 'required|string',
            'height_trailer' => 'required|string',
            'load_trailer' => 'required|string',
            'duration_trailer' => 'required|string',
            'price_day_trailer' => 'required|string',
            'price_week_trailer' => 'required|string',
            'price_month_trailer' => 'required|string',
            'price_year_trailer' => 'required|string',          
            'id_category_trailer' => 'required|string',          
        ]); 
        $filename = "";
        if ($request->file('image_trailer')) {
            $filenameWithExt = $request->file('image_trailer')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_trailer')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_trailer')->storeAs('/uploads', $filename);
        } else {
            $filename = null;
        }
        $trailer = Trailer::create(array_merge(
            $request->all(),
            ['image_trailer' => $filename]
        ));

        return response()->json([
            'message' => 'remorque ajoutée avec succès',
            'data' => $trailer
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $trailer= Trailer::find($id);

        if (!$trailer) {
            return response()->json(['message' => 'remorque non trouvée'], 404);
        }
        return response()->json($trailer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trailer $trailer)
    {
               $request->validate([
                'brand_trailer' => 'required|string',
                'name_trailer' => 'required|string',
                'description_trailer' => 'required|string',
                'color_trailer' => 'required|string',
                'length_trailer' => 'required|string',
                'width_trailer' => 'required|string',
                'height_trailer' => 'required|string',
                'load_trailer' => 'required|string',
                'image_trailer' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'duration_trailer' => 'required|string',
                'price_day_trailer' => 'required|string',
                'price_week_trailer' => 'required|string',
                'price_month_trailer' => 'required|string',
                'price_year_trailer' => 'required|string',     
                'id_category_trailer' => 'required|string',          
            ]);
    
          
            $updateData = $request->only([
            'brand_trailer', 'name_trailer', 'description_trailer', 'color_trailer',
            'length_trailer', 'width_trailer', 'height_trailer', 'load_trailer',
            'duration_trailer', 'price_day_trailer', 'price_week_trailer',
            'price_month_trailer', 'price_year_trailer', 'id_category_trailer',
            ]);


            if ($request->file('image_trailer')) {
                if ($trailer->imageTrailer && file_exists(public_path('uploads/' . $trailer->imageTrailer))) {
                    unlink(public_path('uploads/' . $trailer->imageTrailer));
                }
    
                $file = $request->file('image_trailer');
                $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $extension = $file->getClientOriginalExtension();
                $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
                $file->storeAs('uploads/', $filename);
                $updateData['image_trailer'] = $filename;
            }
            $trailer->update($updateData);
            return response()->json([
                'status' => 'remorque mise à jour avec succès',
                'data' => $trailer,
            ]);
        }
   
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trailer $trailer)
    {
        $trailer->delete();
        return response()->json([
            'message' => 'remorque supprimée avec succès'
        ]);
    }


    public function getTrailersByCategory($id)
    {
        $category = CategoryTrailer::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
    
        $trailers = Trailer::where('id_category_trailer', $id)->get();
    
        return response()->json([
            'category_name' => $category->name_category_trailer,
            'trailers' => $trailers
        ]);
    }
    
}
