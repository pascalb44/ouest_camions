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
        $user = JWTAuth::user(); // Get the connected user
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }
        $orders = Order::with('trucks', 'trailers')->where('id_user', $user->id)->get();  // import orders with trucks and trailers
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
            'trucks' => 'nullable|array', // trucks 
            'trucks.*' => 'exists:trucks,id',
            'trailers' => 'nullable|array', // trailers
            'trailers.*' => 'exists:trailers,id',
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
        
 //       $order->trucks()->attach($formFields['trucks']); // 1 : trucks

        if (!empty($formFields['trucks'])) {
            $order->trucks()->attach($formFields['trucks']);
        }

        if (!empty($formFields['trailers'])) {
            $order->trailers()->attach($formFields['trailers']); // 2 : trailers
        }

        if ($formFields['method_payment'] === 'none') {
            return response()->json(['message' => 'Utiliser /cart pour enregistrer un panier'], 400); /* no confusion with  cart */
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Commande créée avec succès.',
            'order' => $order->load('trucks', 'trailers'),
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


    /* management of the cart different of the order */

    /* to get cart */


    public function getCart()
    {
        $user = JWTAuth::user();

        $order = Order::where('id_user', $user->id)
            ->where('method_payment', 'none')
            ->with(['trucks', 'trailers'])
            ->latest()
            ->first();

        if (!$order) {
            return response()->json(['message' => 'Aucun panier en cours'], 404);
        }

        return response()->json($order);
    }


    /* to post in cart */

    public function addToCart(Request $request)
    {
        $formFields = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'amount' => 'required|numeric',
            'trucks' => 'required|array',
            'trucks.*' => 'exists:trucks,id',
            'trailers' => 'nullable|array',
            'trailers.*' => 'exists:trailers,id',
        ]);

        $user = JWTAuth::user();

        $order = new Order();
        $order->order_number = rand(1000, 9999);
        $order->start_date = $formFields['start_date'];
        $order->end_date = $formFields['end_date'];
        $order->amount = $formFields['amount'];
        $order->method_payment = 'none'; // cart = no paid
        $order->id_user = $user->id;
        $order->save();

        $order->trucks()->attach($formFields['trucks']);

        if (!empty($formFields['trailers'])) {
            $order->trailers()->attach($formFields['trailers']);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Panier enregistré.',
            'order' => $order->load('trucks', 'trailers'),
        ]);
    }
}
