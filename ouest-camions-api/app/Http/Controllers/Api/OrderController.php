<?php

namespace App\Http\Controllers\API;

use App\Models\Order;
use App\Models\Truck;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('trucks')->get();  // import orders with trucks
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'amount' => 'required|numeric',
            'method_payment' => 'required|string',
            'trucks' => 'required|array', // trucks
            'trucks.*' => 'exists:trucks,id', 
        ]); 

        $user = JWTAuth::user(); // to get connected user
        // Create order
        $order = new Order();
        $order->order_number = rand(1000, 9999); 
        $order->start_date = $formFields['start_date'];
        $order->end_date = $formFields['end_date'];
        $order->amount = $formFields['amount'];
        $order->method_payment = $formFields['method_payment'];
        $order->date_payment = now(); 
        $order->id_user = $user->id;
        $order->save();

        // Associate trucks with table 'orders_truck'
        $order->trucks()->attach($formFields['trucks']); // 

        return response()->json([
            'status' => 'success',
            'message' => 'Commande créée avec succès.',
            'order' => $order,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = Order::with('trucks')->find($id); // orders with trucks
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
