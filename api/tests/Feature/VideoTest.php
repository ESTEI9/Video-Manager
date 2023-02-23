<?php

namespace Tests\Feature;

use App\Models\Video;
use Tests\TestCase;

class VideoTest extends TestCase
{
	public function test_create()
	{
		$video = new Video([
			'author' => 1,
			'path' => 'storage/myvideo.mp4',
			'title' => 'Test'
		]);
		$result = $video->save();
		$this->assertTrue($result);
	}
}
