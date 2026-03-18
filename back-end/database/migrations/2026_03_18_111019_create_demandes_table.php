<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_demandes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type_demande');
            $table->decimal('budget', 10, 2);
            $table->string('ville');
            $table->text('message');
            $table->string('statut')->default('en_attente');
            $table->json('autres_informations')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('demandes');
    }
};