<?php
// app/Http/Controllers/DemandeController.php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DemandeController extends Controller
{
    public function create()
    {
        return view('demandes.create');
    }

    public function store(Request $request)
    {
        // Validation serveur (IM-98)
        $validator = Validator::make($request->all(), [
            'type_demande' => 'required|string|max:255',
            'budget' => 'required|numeric|min:0|max:9999999.99',
            'ville' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Création de la demande (IM-99, IM-100)
        $demande = Demande::create([
            'user_id' => auth()->id(),
            'type_demande' => $request->type_demande,
            'budget' => $request->budget,
            'ville' => $request->ville,
            'message' => $request->message,
            'autres_informations' => $request->except(['_token', 'type_demande', 'budget', 'ville', 'message'])
        ]);

        // Message de confirmation et redirection (IM-101, IM-102)
        return redirect()->route('demandes.confirmation', $demande)
            ->with('success', 'Votre demande a été enregistrée avec succès !');
    }

    public function confirmation(Demande $demande)
    {
        // Vérifier que l'utilisateur est propriétaire
        if ($demande->user_id !== auth()->id()) {
            abort(403);
        }

        return view('demandes.confirmation', compact('demande'));
    }
}