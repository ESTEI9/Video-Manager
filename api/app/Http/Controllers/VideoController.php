<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
	public function getVideo (Video $video): VideoResource
	{
		return VideoResource::make($video);
	}

	public function getAllVideos (): AnonymousResourceCollection
	{
		return VideoResource::collection(Video::all());
	}

	public function saveVideo (Request $req): VideoResource
	{
		$path = Storage::putFile('storage', $req->file('video'));
		$title = $req->input('title');
		$description = $req->input('description');
		$tags = $req->input('tags');

		return VideoResource::make(Video::create(['path' => $path, 'title' => $title, 'description' => $description, 'tags' => $tags]));
	}

	public function editVideo (Request $req): VideoResource
	{
		$id = $req->input('id');
		$title = $req->input('title');
		$description = $req->input('description');
		$tags = $req->input('tags');

		$video = Video::find(1);
		$video->title = $title;
		$video->description = $description ?? NULL;
		$video->tags = $tags ?? NULL;
		$video->save();

		$video->tags = explode(',', $tags);

		return VideoResource::make($video);
	}
}
