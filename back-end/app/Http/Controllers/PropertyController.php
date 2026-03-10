<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    //
    public function update(Request $request, $id){
        $property = Property::findOrFail($id);

        // Vérifier propriétaire
        if ($property->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string'
        ]);

        $property->update([
            'title' => $request->title,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Property updated successfully',
            'property' => $property
        ]);
    }


    public function destroy($id){
        $property = Property::findOrFail($id);

        if ($property->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $property->delete();

        return response()->json([
            'message' => 'Property deleted successfully'
        ]);
    }
    public function show($id){
        $property = Property::with(['agent','images'])->find($id);

        if(!$property){
            return response()->json([
                'message' => 'Bien introuvable'
            ],404);
        }

        return response()->json($property);
    }
}
