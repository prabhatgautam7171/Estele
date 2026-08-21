# Estele — Laravel Backend

Estele is a Laravel-based e-commerce backend for a jewellery application. It provides authentication with OTP, category and product APIs, cart functionality, PostgreSQL database integration, email delivery through Mailtrap, and Docker-based deployment.

## Tech Stack

* **Laravel**
* **PHP 8.4**
* **PostgreSQL**
* **Docker & Docker Compose**
* **Nginx**
* **Laravel Sanctum / API Authentication**
* **Mailtrap SMTP**
* **Vercel** — Frontend
* **Render** — Backend & PostgreSQL

---

# Features

* Email OTP authentication
* User registration/login
* Category management
* Product listing
* Product details
* Category-based products
* Shopping cart
* Cart item management
* PostgreSQL database
* SQLite → PostgreSQL data migration command
* Dockerized Laravel application
* Production-ready Nginx + PHP-FPM setup
* Mailtrap email integration
* API-ready backend

---

# Requirements

For local development without Docker:

* PHP >= 8.2
* Composer
* PostgreSQL
* Node.js / npm if working with the frontend

For Docker development:

* Docker Desktop
* Git

---

# Project Structure

```text
backend/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       └── MigrateSqliteToPostgres.php
│   ├── Http/
│   └── Models/
│
├── database/
│   ├── migrations/
│   └── seeders/
│       ├── CategorySeeder.php
│       ├── ProductSeeder.php
│       └── DatabaseSeeder.php
│
├── public/
├── resources/
├── routes/
│   └── api.php
│
├── storage/
├── Dockerfile
├── nginx.conf
├── start.sh
├── .dockerignore
└── .env
```

---

# 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

---

# 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

---

# 3. PostgreSQL Configuration

Update `.env` with your PostgreSQL credentials.

Example:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=estele
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

For Docker, the database host should be the PostgreSQL service/container name.

Example:

```env
DB_CONNECTION=pgsql
DB_HOST=estele-postgres
DB_PORT=5432
DB_DATABASE=estele
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

---

# 4. Mailtrap Configuration

The application uses **Mailtrap** for OTP email delivery during development/testing.

Create a Mailtrap account and create an SMTP inbox.

Get the SMTP credentials from your Mailtrap inbox and configure `.env`:

```env
MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=YOUR_MAILTRAP_USERNAME
MAIL_PASSWORD=YOUR_MAILTRAP_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@estele.local"
MAIL_FROM_NAME="Estele"
```

Replace:

```text
YOUR_MAILTRAP_USERNAME
YOUR_MAILTRAP_PASSWORD
```

with the credentials provided by Mailtrap.

### Important

Do not commit `.env` to GitHub.

The `.env` file is already included in `.gitignore`.

After changing mail configuration, clear Laravel's cached configuration:

```bash
php artisan config:clear
php artisan cache:clear
```

If running through Docker:

```bash
docker exec estele-backend php artisan config:clear
docker exec estele-backend php artisan cache:clear
```

OTP emails can then be viewed directly inside the Mailtrap inbox.

---

# 5. Install Dependencies

Install Composer dependencies:

```bash
composer install
```

---

# 6. Database Migration

Run Laravel migrations:

```bash
php artisan migrate
```

For production:

```bash
php artisan migrate --force
```

---

# 7. Seed Categories and Products

The project includes seeders for categories and products.

Run:

```bash
php artisan db:seed
```

or:

```bash
php artisan migrate:fresh --seed
```

The seeders create:

* 10 jewellery categories
* 50 jewellery products

The `ProductSeeder` automatically maps products to their corresponding category IDs.

---

# 8. SQLite → PostgreSQL Migration

If an existing SQLite database needs to be migrated to PostgreSQL, the project includes a custom Artisan command:

```bash
php artisan app:migrate-sqlite-to-postgres
```

The command migrates:

```text
users
categories
products
carts
cart_items
```

It also resets PostgreSQL ID sequences after migration.

Before running the command, make sure the SQLite database exists at:

```text
database/database.sqlite
```

The command explicitly uses that SQLite file.

Example with Docker:

```bash
docker exec estele-backend php artisan app:migrate-sqlite-to-postgres
```

---

# 9. Storage / Category Images

Laravel public storage is linked using:

```bash
php artisan storage:link
```

Category images are stored under:

```text
storage/app/public/categories/
```

and are accessible through:

```text
/storage/categories/<filename>
```

For example:

```text
/storage/categories/earrings.webp
```

The production backend URL can be used to access the image:

```text
https://your-backend-url/storage/categories/earrings.webp
```

---

# 10. Running Locally

Start the Laravel development server:

```bash
php artisan serve
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

---

# 11. Docker Setup

The backend includes a Dockerfile containing:

* PHP 8.4
* PHP-FPM
* Nginx
* PostgreSQL PHP extensions
* Composer
* Laravel application

Build the Docker image:

```bash
docker build -t estele-backend .
```

Run the container:

```bash
docker run -p 8000:8000 --env-file .env estele-backend
```

The application will be available at:

```text
http://localhost:8000
```

---

# 12. Docker Startup

The Docker container uses `start.sh`.

The startup process performs:

```text
1. Clear configuration cache
2. Clear application cache
3. Create Laravel storage link
4. Run database migrations
5. Cache Laravel configuration
6. Start PHP-FPM
7. Start Nginx
```

The container supports the `PORT` environment variable.

For example:

```bash
PORT=8000
```

Render can provide its own `PORT`, which is handled automatically by `start.sh`.

---

# 13. API Base URL

For local development:

```text
http://127.0.0.1:8000/api
```

For production:

```text
https://your-backend-url/api
```

Example frontend Axios configuration:

```javascript
const api = axios.create({
  baseURL: "https://your-backend-url/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
```

---

# 14. Authentication Flow

The authentication flow uses email OTP.

### Send OTP

```http
POST /api/auth/send-otp
```

Request:

```json
{
  "email": "user@example.com"
}
```

The OTP is sent through Mailtrap in the development environment.

### Verify OTP

```http
POST /api/auth/verify-otp
```

The user submits the email and received OTP.

A successful verification returns the authentication response/token required by the frontend.

---

# 15. Category APIs

### Get Categories

```http
GET /api/categories
```

Example response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Earrings",
      "slug": "earrings",
      "image": "/storage/categories/earrings.webp"
    }
  ]
}
```

---

# 16. Product APIs

Products can be retrieved through the product API.

Example:

```http
GET /api/products
```

Products include:

* ID
* Category
* Name
* Slug
* Price
* Image

Products are associated with categories using `category_id`.

---

# 17. Cart APIs

The backend provides APIs for:

* Creating a cart
* Retrieving cart data
* Adding products
* Updating cart items
* Removing cart items

The authenticated user is associated with their cart.

---

# 18. CORS

The backend is configured to allow requests from the frontend application.

For local development:

```text
http://localhost:5173
```

For production, configure the appropriate frontend domain in the Laravel CORS configuration if required.

---

# 19. Production Deployment

The backend can be deployed using Render.

### PostgreSQL

Create a PostgreSQL database on Render.

Use the database connection details provided by Render.

The PostgreSQL connection variables should be configured as environment variables:

```env
DB_CONNECTION=pgsql
DB_HOST=<render-postgres-host>
DB_PORT=5432
DB_DATABASE=estele
DB_USERNAME=<render-postgres-user>
DB_PASSWORD=<render-postgres-password>
```

### Laravel Environment Variables

Configure:

```env
APP_ENV=production
APP_DEBUG=false
APP_KEY=<generated-laravel-key>
APP_URL=<backend-url>

DB_CONNECTION=pgsql
DB_HOST=<postgres-host>
DB_PORT=5432
DB_DATABASE=estele
DB_USERNAME=<postgres-user>
DB_PASSWORD=<postgres-password>

MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=<mailtrap-username>
MAIL_PASSWORD=<mailtrap-password>
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@estele.local"
MAIL_FROM_NAME="Estele"
```

Do not commit these values to GitHub.

---

# 20. Render Deployment

Create a new Web Service on Render and connect the GitHub repository.

Use Docker as the deployment environment.

The Dockerfile automatically:

* Installs PHP
* Installs Composer dependencies
* Copies the Laravel application
* Configures Nginx
* Configures PHP-FPM
* Runs migrations during startup
* Starts the application

The application listens on the Render-provided `PORT`.

Example production URL:

```text
https://your-backend.onrender.com
```

API:

```text
https://your-backend.onrender.com/api
```

---

# 21. Frontend Deployment

The frontend can be deployed separately to Vercel.

Configure the frontend API URL:

```env
VITE_API_URL=https://your-backend.onrender.com/api
VITE_BACKEND_URL=https://your-backend.onrender.com
```

`VITE_BACKEND_URL` is used for assets such as:

```text
/storage/categories/earrings.webp
```

which become:

```text
https://your-backend.onrender.com/storage/categories/earrings.webp
```

After changing Vite environment variables, a new deployment is required.

---

# 22. Important Production Notes

### Never commit `.env`

The following should remain private:

* Database password
* Mailtrap username
* Mailtrap password
* Laravel `APP_KEY`
* Production credentials

### Database

Production data should be stored in PostgreSQL rather than SQLite.

### Email

Mailtrap is recommended for testing/development. For real customer emails in production, configure a production email provider.

### Storage

The current category images are included with the application deployment. For a larger production application, an object-storage/CDN solution such as S3 or Cloudinary would be more appropriate.

---

# 23. Useful Commands

### Clear Laravel caches

```bash
php artisan optimize:clear
```

### Run migrations

```bash
php artisan migrate
```

### Seed database

```bash
php artisan db:seed
```

### Run migrations and seed

```bash
php artisan migrate:fresh --seed
```

### Create storage link

```bash
php artisan storage:link
```

### Check routes

```bash
php artisan route:list
```

### Check database

```bash
php artisan db:show
```

### Run custom SQLite migration

```bash
php artisan app:migrate-sqlite-to-postgres
```

---

# 24. Troubleshooting

## OTP is not received

Check:

1. Mailtrap credentials in `.env`
2. SMTP host and port
3. Mailtrap inbox
4. Laravel configuration cache

Run:

```bash
php artisan config:clear
php artisan cache:clear
```

Then try sending the OTP again.

---

## Database connection error

Verify:

```env
DB_CONNECTION=pgsql
DB_HOST=<correct-host>
DB_PORT=5432
DB_DATABASE=estele
DB_USERNAME=<username>
DB_PASSWORD=<password>
```

For Docker, don't use `127.0.0.1` when connecting to a PostgreSQL container from the Laravel container. Use the PostgreSQL service/container hostname.

---

## Images are not loading

Verify that the image exists:

```text
storage/app/public/categories/
```

Create the storage link:

```bash
php artisan storage:link
```

Then test:

```text
https://your-backend-url/storage/categories/earrings.webp
```

---

# License

This project was developed as part of the Laravel final task/assignment.
