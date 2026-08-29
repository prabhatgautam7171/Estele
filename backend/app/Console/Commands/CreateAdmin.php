<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    protected $signature = 'admin:create';

    protected $description = 'Create an Estele admin user';

    public function handle(): int
    {
        $name = $this->ask('Admin name');
        $email = strtolower(trim($this->ask('Admin email')));
        $password = $this->secret('Admin password');

        if (!$name || !$email || !$password) {
            $this->error('All fields are required.');

            return self::FAILURE;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->error('Invalid email address.');

            return self::FAILURE;
        }

        if (strlen($password) < 8) {
            $this->error('Password must be at least 8 characters.');

            return self::FAILURE;
        }

        $existingUser = User::where('email', $email)->first();

        if ($existingUser) {
            if ($existingUser->role === 'admin') {
                $this->error('An admin with this email already exists.');

                return self::FAILURE;
            }

            $this->error('A user with this email already exists.');

            return self::FAILURE;
        }

        User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => 'admin',
        ]);

        $this->info('Admin created successfully.');

        return self::SUCCESS;
    }
}
