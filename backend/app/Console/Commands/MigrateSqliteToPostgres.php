<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateSqliteToPostgres extends Command
{
    protected $signature = 'app:migrate-sqlite-to-postgres';

    protected $description = 'Migrate SQLite data to PostgreSQL';

    public function handle()
    {
        // Explicitly use the existing SQLite file.
        config([
            'database.connections.sqlite.database' => database_path('database.sqlite'),
        ]);

        $sqlite = DB::connection('sqlite');
        $postgres = DB::connection('pgsql');

        $tables = [
            'users',
            'categories',
            'products',
            'carts',
            'cart_items',
        ];

        $this->info('Starting SQLite → PostgreSQL migration...');

        // Disable foreign-key checks temporarily.
        $postgres->statement('SET session_replication_role = replica');

        try {
            foreach ($tables as $table) {
                $rows = $sqlite->table($table)->get();

                $this->info("Migrating {$table}: {$rows->count()} records");

                if ($rows->isEmpty()) {
                    continue;
                }

                // Clear existing data in PostgreSQL.
                $postgres->table($table)->delete();

                foreach ($rows->chunk(100) as $chunk) {
                    $data = $chunk
                        ->map(fn ($row) => (array) $row)
                        ->toArray();

                    $postgres->table($table)->insert($data);
                }

                $this->info("✓ {$table} migrated");
            }

            // Reset PostgreSQL auto-increment sequences.
            foreach ($tables as $table) {
                $postgres->statement("
                    SELECT setval(
                        pg_get_serial_sequence('{$table}', 'id'),
                        COALESCE((SELECT MAX(id) FROM {$table}), 1),
                        true
                    )
                ");
            }

            $this->info('');
            $this->info('✓ Migration completed successfully.');

        } finally {
            $postgres->statement('SET session_replication_role = DEFAULT');
        }

        return self::SUCCESS;
    }
}
