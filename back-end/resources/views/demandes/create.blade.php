{{-- resources/views/demandes/create.blade.php --}}
@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Nouvelle Demande</div>

                <div class="card-body">
                    {{-- Affichage des erreurs de validation --}}
                    @if($errors->any())
                        <div class="alert alert-danger">
                            <ul class="mb-0">
                                @foreach($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form id="demandeForm" method="POST" action="{{ route('demandes.store') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="type_demande" class="form-label">Type de demande *</label>
                            <select class="form-control @error('type_demande') is-invalid @enderror" 
                                    id="type_demande" name="type_demande" required>
                                <option value="">Sélectionnez un type</option>
                                <option value="financement">Financement</option>
                                <option value="subvention">Subvention</option>
                                <option value="accompagnement">Accompagnement</option>
                                <option value="formation">Formation</option>
                            </select>
                            <div class="invalid-feedback" id="type_demande_error"></div>
                        </div>

                        <div class="mb-3">
                            <label for="budget" class="form-label">Budget (€) *</label>
                            <input type="number" step="0.01" min="0" 
                                   class="form-control @error('budget') is-invalid @enderror" 
                                   id="budget" name="budget" value="{{ old('budget') }}" required>
                            <div class="invalid-feedback" id="budget_error"></div>
                        </div>

                        <div class="mb-3">
                            <label for="ville" class="form-label">Ville *</label>
                            <input type="text" class="form-control @error('ville') is-invalid @enderror" 
                                   id="ville" name="ville" value="{{ old('ville') }}" required>
                            <div class="invalid-feedback" id="ville_error"></div>
                        </div>

                        <div class="mb-3">
                            <label for="message" class="form-label">Message *</label>
                            <textarea class="form-control @error('message') is-invalid @enderror" 
                                      id="message" name="message" rows="5" required>{{ old('message') }}</textarea>
                            <div class="invalid-feedback" id="message_error"></div>
                            <small class="text-muted" id="message_count">0/2000 caractères</small>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">Soumettre la demande</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
// Validation côté client (IM-97)
document.getElementById('demandeForm').addEventListener('submit', function(e) {
    let isValid = true;
    
    // Réinitialiser les erreurs
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

    // Validation type_demande
    const type = document.getElementById('type_demande');
    if (!type.value) {
        showError('type_demande', 'Veuillez sélectionner un type de demande');
        isValid = false;
    }

    // Validation budget
    const budget = document.getElementById('budget');
    if (!budget.value || budget.value <= 0) {
        showError('budget', 'Le budget doit être supérieur à 0');
        isValid = false;
    }

    // Validation ville
    const ville = document.getElementById('ville');
    if (!ville.value.trim()) {
        showError('ville', 'La ville est requise');
        isValid = false;
    }

    // Validation message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('message', 'Le message est requis');
        isValid = false;
    } else if (message.value.length < 10) {
        showError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else if (message.value.length > 2000) {
        showError('message', 'Le message ne peut pas dépasser 2000 caractères');
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
});

function showError(fieldId, message) {
    document.getElementById(fieldId).classList.add('is-invalid');
    document.getElementById(fieldId + '_error').textContent = message;
}

// Compteur de caractères pour le message
document.getElementById('message').addEventListener('input', function() {
    const count = this.value.length;
    document.getElementById('message_count').textContent = count + '/2000 caractères';
    
    if (count > 2000) {
        document.getElementById('message_count').classList.add('text-danger');
    } else {
        document.getElementById('message_count').classList.remove('text-danger');
    }
});
</script>
@endpush
@endsection