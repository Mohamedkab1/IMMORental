<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_biens_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('biens', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->decimal('prix', 10, 2);
            $table->integer('surface');
            $table->enum('type', ['appartement', 'maison', 'terrain', 'local_commercial'])->default('appartement');
            $table->string('ville');
            $table->string('code_postal', 5);
            $table->enum('statut', ['disponible', 'vendu', 'reserve'])->default('disponible');
            $table->integer('nb_pieces')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('biens');
    }
};