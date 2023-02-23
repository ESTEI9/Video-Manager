<?php

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoFactory extends Factory
{

	protected $model = Video::class;

	public function definition()
	{
		return [
			'id' => $this->faker->numberBetween(1, 100),
			'author' => $this->faker->numberBetween(1, 100),
			'path' => 'storage/' . $this->faker->uuid() . '.mp4',
			'title' => $this->faker->word(),
			'description' => '',
			'tags' => json_encode(["'".$this->faker->word()."'"]),
			'shared' => json_encode(["'".$this->faker->email()."'"])
		];
	}
}
