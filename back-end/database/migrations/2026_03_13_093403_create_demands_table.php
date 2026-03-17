<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('demands', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('type');
            $table->decimal('budget', 10, 2);
            $table->string('city');
            $table->enum('status', ['Nouveau', 'En cours', 'Traité'])->default('Nouveau');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // agent/admin qui suit la demande
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('demands');
    }
};
