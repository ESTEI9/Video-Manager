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

	public function getVideos (int $author_id): AnonymousResourceCollection
	{
		$videos = Video::where('author', $author_id)->get();
		
		return VideoResource::collection($videos);
	}

	public function getSharedVideos(Request $req): AnonymousResourceCollection
	{
		$email = $req->input('email');
		$videos = [];

		if(strlen($email)) {
			$videos = Video::where('shared', 'like', '%'.$email.'%')->get();
			return VideoResource::collection($videos);
		}
		
		return VideoResource::collection($videos);
	}

	public function saveVideo (Request $req): VideoResource
	{
		$path = Storage::putFile('storage', $req->file('video'));
		$author = $req->input('author');
		$title = $req->input('title');
		$description = $req->input('description');
		$tags = $req->input('tags');

		return VideoResource::make(Video::create([
			'author' => $author,
			'path' => $path,
			'title' => $title,
			'description' => $description,
			'tags' => $tags
		]));
	}

	public function editVideo (Request $req): VideoResource
	{
		$id = $req->input('id');
		$title = $req->input('title');
		$description = $req->input('description');
		$tags = $req->input('tags');

		$video = Video::find($id);
		$video->title = $title;
		$video->description = $description ?? NULL;
		$video->tags = $tags ?? NULL;
		$video->save();

		return VideoResource::make($video);
	}

	public function shareVideo (Request $req): VideoResource
	{
		$video_id = $req->input('video');
		$shared = $req->input('shared');

		$video = Video::find($video_id);
		$video->shared = $shared ?? null;
		$video->save();

		return VideoResource::make($video);
	}
	
	public function deleteVideo (int $video_id)
	{
		Video::destroy($video_id);
		return;
	}
}
