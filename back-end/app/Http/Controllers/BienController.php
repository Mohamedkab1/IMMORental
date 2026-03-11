<?php

namespace App\Http\Controllers;

use App\Models\Bien;
use Illuminate\Http\Request;

class BienController extends Controller
{

    // 📌 Afficher tous les biens
    public function index()
    {
        $biens = Bien::all();

        return response()->json($biens);
    }


    // 📌 Ajouter un bien
    public function store(Request $request)
    {

        // ✅ Validation côté serveur (IM-60)
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric',
            'surface' => 'required|numeric',
            'type' => 'required|string',
            'ville' => 'nullable|string'
        ]);

        // ✅ Enregistrement dans la base (IM-62)
        $bien = Bien::create($validated);

        return response()->json([
            'message' => 'Bien ajouté avec succès',
            'bien' => $bien
        ], 201);

        

    }


    // 📌 Afficher un bien
    public function show($id)
    {
        $bien = Bien::find($id);

        if(!$bien){
            return response()->json([
                'message' => 'Bien non trouvé'
            ],404);
        }

        return response()->json($bien);
    }


    // 📌 Modifier un bien
    public function update(Request $request, $id)
    {

        $bien = Bien::find($id);

        if(!$bien){
            return response()->json([
                'message' => 'Bien non trouvé'
            ],404);
        }

        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'prix' => 'required|numeric',
            'surface' => 'required|numeric',
            'type' => 'required|string',
            'ville' => 'nullable|string'
        ]);

        $bien->update($validated);

        return response()->json([
            'message' => 'Bien modifié avec succès',
            'bien' => $bien
        ]);

    }


    // 📌 Supprimer un bien
    public function destroy($id)
    {

        $bien = Bien::find($id);

        if(!$bien){
            return response()->json([
                'message' => 'Bien non trouvé'
            ],404);
        }

        $bien->delete();

        return response()->json([
            'message' => 'Bien supprimé avec succès'
        ]);

    }
    public function __construct()
{
    $this->middleware('auth:sanctum')->only(['store','update','destroy']);
}

}
