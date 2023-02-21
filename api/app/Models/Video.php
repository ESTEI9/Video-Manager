<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Video class
 *
 * @property int $id
 * @property string $path
 * @property string $title
 * @property string $description
 * @property string $tags
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Video extends Model
{
	use HasFactory;

	protected $table = 'videos';
	protected $fillable = ['path', 'title', 'description', 'tags'];
}
