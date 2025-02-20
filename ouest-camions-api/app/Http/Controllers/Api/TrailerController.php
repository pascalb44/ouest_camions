<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Trailer;
use Illuminate\Http\Request;

class TrailerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trailers  = Trailer::all(); // import all categories of trailers
        return response()->json($trailers);
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
            'image_trailer' => 'required|string',
            'duration_trailer' => 'required|string',
            'price_day_trailer' => 'required|string',
            'price_week_trailer' => 'required|string',
            'price_month_trailer' => 'required|string',
            'price_year_trailer' => 'required|string',          
            'id_category_trailer' => 'required|string',          
        ]); 

        $trailer = Trailer::create($formFields);
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
        //
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
}
