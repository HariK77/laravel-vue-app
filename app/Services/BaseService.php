<?php

declare(strict_types=1);

namespace App\Services;

use App\Interfaces\ServiceInterface;
use Symfony\Component\HttpFoundation\Response;

abstract class BaseService implements ServiceInterface
{
    public string $message = 'Request Failed.';
    public bool $status = false;
    public int $code = Response::HTTP_INTERNAL_SERVER_ERROR;
    public mixed $data = null;
    public ?array $errors = null;
    public array $validatedData = [];

    public function sendData(): array
    {
        return match ($this->status) {
            true => $this->success(),
            false => $this->error()
        };
    }

    protected function success(): array
    {
        $result = [
            'message' => $this->message,
            'code' => $this->code,
            'status' => true,
        ];

        if (!empty($this->data)) {
            $result['data'] = $this->data;
        }

        return $result;
    }

    protected function error(): array
    {
        $result = [
            'message' => $this->message,
            'code' => $this->code,
            'status' => false,
        ];

        if (!empty($this->errors)) {
            $result['errors'] = $this->errors;
        }

        return $result;
    }

    public function setValidatedData(array $validatedData): self
    {
        $this->validatedData = $validatedData;
        return $this;
    }

    public abstract function actOn(): array;
}
