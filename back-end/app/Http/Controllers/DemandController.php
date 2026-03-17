<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;

class DemandController extends Controller
{
    // Liste des demandes avec pagination et filtre b statut
    public function index(Request $request)
    {
        $query = Demand::query();

        // Filtre par statut
        if ($request->status) {
            $query->where('status', $request->status);
        }

        $demands = $query->paginate($request->limit ?? 5);

        return response()->json([
            'data' => $demands->items(),
            'totalPages' => $demands->lastPage()
        ]);
    }

    // Détail dune demande
    public function show($id)
    {
        $demand = Demand::find($id);

        if (!$demand) {
            return response()->json(['message' => 'Demande introuvable'], 404);
        }

        return response()->json($demand);
    }

    // Changer le statut (uniquement agent / admin)
    public function updateStatus(Request $request, $id)
    {
        $demand = Demand::findOrFail($id);

        // Vérifier rôle
        if (!in_array(auth()->user()->role, ['agent', 'admin'])) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'status' => 'required|in:Nouveau,En cours,Traité'
        ]);

        $demand->status = $request->status;
        $demand->save();

        return response()->json([
            'message' => 'Statut mis à jour',
            'demand' => $demand
        ]);
    }


}


