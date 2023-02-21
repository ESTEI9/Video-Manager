<?php

namespace App\Http\Resources;

use App\Models\Video;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoResource extends JsonResource
{
	/**
	 * Transform the resource into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		/** @var Video $video */
		$video = $this->resource;

		return [
			'id' => $video->id,
			'path' => config('app.url') . '/' . $video->path,
			'title' => $video->title,
			'description' => $video->description,
			'tags' => $video->tags
		];
	}
}
