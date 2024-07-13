<?php

namespace App\Services\Profile;

use App\Helpers\UploadHelper;
use App\Services\BaseService;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProfileUpdateService extends BaseService
{
    public function __construct()
    {
    }

    public function actOn(): array
    {
        try {
            $data = $this->validatedData;

            $user = Auth::user();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->gender = $data['gender'];
            $user->speaking_languages = $data['speaking_languages'];

            if (isset($data['profile_image'])) {
                UploadHelper::fileDelete($user->profile_image);
                $user->profile_image = UploadHelper::fileUpload('uploads/profile', $data['profile_image']);
            }

            $user->save();

            $this->message = 'Profile details updated successfully.';
            $this->data = new UserResource($user);
            $this->code = Response::HTTP_OK;
            $this->status = true;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
            $this->code = Response::HTTP_INTERNAL_SERVER_ERROR;
            $this->status = false;
        }

        return $this->sendData();
    }
}
