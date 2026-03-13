<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{

public function store(Request $request)
{

$request->validate([

'nom' => 'required|string|max:255',

'email' => 'required|email',

'message' => 'required|string',

'bien_id' => 'required|exists:biens,id_bien'

]);

$message = Message::create([

'nom' => $request->nom,
'email' => $request->email,
'message' => $request->message,
'bien_id' => $request->bien_id

]);

return response()->json([

'success'=>true,
'message'=>'Message envoyé avec succès',
'data'=>$message

]);

}

}