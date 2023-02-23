<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class VideoControllerTest extends TestCase
{
	/**
	 * A basic feature test example.
	 *
	 * @return void
	 */

	public function test_add_video ()
	{
		Storage::fake('public');
		$mp4 = UploadedFile::fake()->create('my-video.mp4', 1356, 'video/mp4');
		$response = $this->post('/api/videos', [
			'video' => $mp4,
			'title' => 'Bogus',
			'author' => 1
		]);

		/** @var Video $video */
		$video = $response->baseResponse->original;

		$response->assertStatus(201);
		$response->assertJsonStructure([
			'id', 'path', 'title', 'author'
		]);
		$this->assertNotNull($video);
		Storage::assertExists($video->path);
		Mockery::close();
	}

	public function test_get_videos ()
	{
		Video::factory()->count(3)->create([
			'path' => 'my-video.mp4',
			'title' => 'Bogus',
			'author' => 1,
		]);
		$response = $this->get('/api/videos/user/1');
		$response
			->assertStatus(200)
			->assertJsonCount(3);
	}

	public function test_get_single_video ()
	{
		$video = Video::factory()->create();
		$response = $this->get("/api/videos/{$video->getKey()}");
		$response
			->assertStatus(200)
			->assertJsonStructure([
				'id', 'path', 'author', 'title'
			]);
	}

	public function test_get_shared_videos ()
	{
		$video = Video::factory()->count(3)->create([
			'path' => 'my-video.mp4',
			'title' => 'Bogus',
			'author' => 1,
			'shared' => json_encode(['bogus@email.com'])
		]);
		$response = $this->post("/api/shared", [
			'email' => 'bogus@email.com'
		]);
		$response
			->assertStatus(200)
			->assertJsonCount(3);
	}

	public function test_edit_video ()
	{
		$video = Video::factory()->create([
			'id'	=> 1,
			'path' => 'my-video.mp4',
			'title' => 'Bogus',
			'author' => 1,
		]);
		$response = $this->post("/api/edit", [
			'id' => 1,
			'title' => 'Bogus Title'
		]);
		$response
			->assertStatus(200)
			->assertJsonStructure([
				'id', 'path', 'author', 'title'
			]);
	}

	public function test_share_video ()
	{
		$video = Video::factory()->create([
			'id' => 1,
			'path' => 'my-video.mp4',
			'title' => 'Bogus',
			'author' => 1,
		]);
		$response = $this->post("/api/share", [
			'video' => 1,
			'shared' => json_encode(['bogus@email.com'])
		]);
		$response
			->assertStatus(200)
			->assertJsonStructure([
				'id', 'path', 'author', 'title'
			]);
	}
}
