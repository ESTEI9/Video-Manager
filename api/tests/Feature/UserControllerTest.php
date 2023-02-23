<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class UserControllerTest extends TestCase
{

public function test_login ()
	{
		$user = User::factory()->create([
            'id' => 1,
            'name' => 'Bogus',
            'email' => 'bogus@email.com',
            'password' => '$2a$12$Z/aN3zy6ny8pjiI0XysMg.QU99ocGHBSidZlcsh/jF0T4tmwrwcEq'
        ]);
		$response = $this->post("/api/login", [
            'email' => 'bogus@email.com',
            'password' => 'bogus'
        ]);
		$response
			->assertStatus(200)
			->assertJsonStructure([
				'id', 'name', 'email'
			]);
	}

	public function test_create_user ()
	{
		$user = User::factory()->create();
        $response = $this->post("/api/createUser", [
            'name' => 'Bogus Name',
            'email' => 'bogus@email.com',
            'password' => 'bogus'
        ]);
        $response 
            ->assertStatus(201)
            ->assertJsonStructure([
                'id', 'name', 'email'
            ]);
	}
}
?>