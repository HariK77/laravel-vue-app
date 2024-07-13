<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;

class LoginService extends BaseService
{
    public function __construct(
        protected User $user
    ) {
    }

    public function actOn(): array
    {
        if (!Auth::attempt([...$this->validatedData])) {
            $this->message = 'Invalid credentials';
        } else {
            $user = $this->user->firstWhere('email', $this->validatedData['email']);

            $this->status = true;
            $this->data = [
                'token' => $this->createToken($user),
                'user' => new UserResource($user)
            ];
            $this->message = 'Authenticated';
            $this->code = Response::HTTP_OK;
        }
        return $this->sendData();
    }

    protected function createToken(User $user): string
    {
        return $user->createToken(
            'API token for ' . $user->email,
            ['*'],
        )->plainTextToken;
    }
}
