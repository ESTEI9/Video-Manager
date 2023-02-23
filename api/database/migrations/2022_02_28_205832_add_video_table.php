<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVideoTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('videos', function (Blueprint $table) {
			$table->id();
			$table->integer('author');
			$table->string('path');
			$table->string('title');
			$table->string('description')->nullable();
			$table->json('tags')->nullable();
			$table->json('shared')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('videos');
	}
}
