<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Truck;
use App\Models\CategoryTruck;
use Illuminate\Http\Request;

class TruckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Truck::query();
        if ($request->has('category')) {
            $query->where('id_category_truck', $request->category); /* to get the trucks by categories */
        }
        return response()->json($query->get());
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
            'duration_truck' => 'required|string',
            'price_day_truck' => 'required|string',
            'price_week_truck' => 'required|string',
            'price_month_truck' => 'required|string',
            'price_year_truck' => 'required|string',
            'id_category_truck' => 'required|string',
        ]);

        $filename = "";
        if ($request->file('image_truck')) {
            $filenameWithExt = $request->file('image_truck')->getClientOriginalName();
            $filenameWithoutExt = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image_truck')->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $path = $request->file('image_truck')->storeAs('/uploads/Truck', $filename);
        } else {
            $filename = null;
        }
        $truck = Truck::create(array_merge(
            $request->all(),
            ['image_truck' => $filename]
        ));

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
        $truck = Truck::find($id);

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
        $request->validate([
            'brand_truck' => 'required|string',
            'name_truck' => 'required|string',
            'description_truck' => 'required|string',
            'color_truck' => 'required|string',
            'length_truck' => 'required|string',
            'width_truck' => 'required|string',
            'height_truck' => 'required|string',
            'load_truck' => 'required|string',
            'image_truck' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'km_truck' => 'required|integer',
            'duration_truck' => 'required|string',
            'price_day_truck' => 'required|string',
            'price_week_truck' => 'required|string',
            'price_month_truck' => 'required|string',
            'price_year_truck' => 'required|string',
            'id_category_truck' => 'required|string',
        ]);


        $updateData = $request->only([
            'brand_truck',
            'name_truck',
            'description_truck',
            'color_truck',
            'length_truck',
            'width_truck',
            'height_truck',
            'load_truck',
            'km_truck',
            'duration_truck',
            'price_day_truck',
            'price_week_truck',
            'price_month_truck',
            'price_year_truck',
            'id_category_truck',
        ]);


        if ($request->file('image_truck')) {
            if ($truck->imageTruck && file_exists(public_path('uploads/' . $truck->imageTruck))) {
                unlink(public_path('uploads/' . $truck->imageTruck));
            }

            $file = $request->file('image_truck');
            $filenameWithoutExt = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $filenameWithoutExt . '_' . time() . '.' . $extension;
            $file->storeAs('uploads/', $filename);
            $updateData['image_truck'] = $filename;
        }
        $truck->update($updateData);
              //dd($truck);
        return response()->json([
            'status' => 'camion mis à jour avec succès',
            'data' => $truck,
        ]);
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




    public function getTrucksByCategory($id)
    {
        $category = CategoryTruck::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
    
        $trucks = Truck::where('id_category_truck', $id)->get();
    
        return response()->json([
            'category_name' => $category->name_category_truck,
            'trucks' => $trucks
        ]);
    }






}
