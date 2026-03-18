{{-- resources/views/demandes/confirmation.blade.php --}}
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-success text-white">
                    Confirmation de votre demande
                </div>

                <div class="card-body text-center">
                    {{-- Message de confirmation --}}
                    @if(session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                    <div class="mb-4">
                        <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
                    </div>

                    <h3 class="mb-4">Merci pour votre demande !</h3>
                    
                    <p class="lead">Votre demande a bien été enregistrée avec le numéro :</p>
                    
                    <div class="alert alert-info">
                        <strong>#DEM-{{ str_pad($demande->id, 6, '0', STR_PAD_LEFT) }}</strong>
                    </div>

                    <div class="mt-4">
                        <h5>Récapitulatif de votre demande :</h5>
                        <table class="table table-bordered mt-3">
                            <tr>
                                <th>Type de demande</th>
                                <td>{{ ucfirst($demande->type_demande) }}</td>
                            </tr>
                            <tr>
                                <th>Budget</th>
                                <td>{{ number_format($demande->budget, 2, ',', ' ') }} €</td>
                            </tr>
                            <tr>
                                <th>Ville</th>
                                <td>{{ $demande->ville }}</td>
                            </tr>
                            <tr>
                                <th>Date de soumission</th>
                                <td>{{ $demande->created_at->format('d/m/Y à H:i') }}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="mt-4">
                        <a href="{{ route('home') }}" class="btn btn-primary">Retour à l'accueil</a>
                        <a href="#" class="btn btn-outline-secondary">Voir mes demandes</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection