<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

	public function createUser (Request $req): UserResource {
		$name = $req->input('name');
		$email = $req->input('email');
		$password = $req->input('password');

        $isNewUser = $this->verifyNewUser($email);

        if($isNewUser === true) {
            return UserResource::make(User::create([
                'name' => $name,
                'email' => $email,
                'password' => password_hash($password, PASSWORD_BCRYPT)
            ]));
        }

        abort(200, 'Email is not unique. User already exists.');
	}

    public function verifyNewUser ($email): bool {
        $users = UserResource::collection(User::all());

        foreach($users as $usr) {
            if($usr->email === $email) return false;
        }

        return true;
    }

    public function loginUser (Request $req): UserResource {
        $email = $req->input('email');
        $password = $req->input('password');
        $userToCheck = User::where('email', $email)->first();

        if(!$userToCheck) abort(200, 'Login failed.');
        
        $verified = password_verify($password, $userToCheck->password);

        if(!$verified) abort(200, 'Login failed');

        return UserResource::make($userToCheck);
    }
}
