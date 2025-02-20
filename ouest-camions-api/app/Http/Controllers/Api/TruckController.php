<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Truck;
use Illuminate\Http\Request;

class TruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trucks  = Truck::all(); // import all categories of trucks
        return response()->json($trucks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'brand_truck' => 'required|string',
            'name_truck' => 'required|string',
            'description_truck' => 'required|string',
            'color_truck' => 'required|string',
            'length_truck' => 'required|string',
            'width_truck' => 'required|string',
            'height_truck' => 'required|string',
            'load_truck' => 'required|string',
            'km_truck' => 'required|integer',
            'image_truck' => 'required|string',
            'duration_truck' => 'required|string',
            'price_day_truck' => 'required|string',
            'price_week_truck' => 'required|string',
            'price_month_truck' => 'required|string',
            'price_year_truck' => 'required|string',     
            'id_category_truck' => 'required|string',          
        ]); 

        $truck = Truck::create($formFields);
        return response()->json([
            'message' => 'camion ajouté avec succès',
            'data' => $truck
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $truck= Truck::find($id);

        if (!$truck) {
            return response()->json(['message' => 'camion non trouvé'], 404);
        }
        return response()->json($truck);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Truck $truck)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Truck $truck)
    {
        $truck->delete();
        return response()->json([
            'message' => 'camion supprimé avec succès'
        ]);
    }
}
