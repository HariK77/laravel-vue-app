<?php

namespace App\Services\Auth;

use App\Helpers\UploadHelper;
use App\Models\User;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;

class RegisterService extends BaseService
{
    public function __construct(
        protected User $user
    ) {
    }

    public function actOn(): array
    {
        try {
            $data = $this->validatedData;
            $data['profile_image'] = UploadHelper::fileUpload('uploads/profile', $data['profile_image']);
            $this->user->create($data);

            $this->message = 'User registered successfully.';
            $this->code = Response::HTTP_CREATED;
            $this->status = true;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
