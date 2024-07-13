<?php

namespace App\Interfaces;

interface ServiceInterface
{
    public function setValidatedData(array $validatedData): ServiceInterface;

    public function actOn(): array;
}
