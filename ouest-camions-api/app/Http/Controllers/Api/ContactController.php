<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Contact::all(); // import all categories of trucks
        return response()->json(Contact::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
        {
            $formFields = $request->validate([
                
                'email_contact' => 'required|string',
                'subject' => 'required|string',
                'message' =>'required|string',
                'id_user' =>'required|exists:users,id',
            ]); 
    
            $contact = new Contact();
            $contact->fill($formFields);
            $contact->save();
            return response()->json($contact);
        }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'contact non trouvé'], 404);
        }
        return response()->json($contact);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $request->validate([
                
                'email_contact' => 'required|string',
                'subject' => 'required|string',
                'message' =>'required|string',
                'id_user' =>'required|exists:users,id',
            ]); 
    $contact->update($request->all());
        
    return response()->json([
        'status' => 'contact modifié avec succès'
    ]);

}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json([
            'status' => 'contact supprimée avec succès'
        ]);
    }
}
