<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bien_immobiliers', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->string('adresse');
            $table->decimal('prix', 12, 2);
            $table->enum('statut', ['disponible', 'reserve', 'loue'])->default('disponible');

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('categorie_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bien_immobiliers');
    }
};
