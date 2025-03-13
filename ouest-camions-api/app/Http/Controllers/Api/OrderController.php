<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all(); // import all categories of trucks
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'order_number' => 'required|string',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
            'amount' => 'required|integer',
            'method_payment' => 'required|string',
            'date_payment' => 'required|string',
        ]); 
        $order = new Order();
        $order->fill($formFields);
        $order->save();
        return response()->json($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'commande non trouvée'], 404);
        }
        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'status' => 'commande supprimée avec succès'
        ]);
    }
}
