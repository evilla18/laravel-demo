# TaskBoard — Proyecto Demo Día 2

Este es el proyecto demo de la capacitación Claude AI (Día 2).
App de gestión de tareas con autenticación JWT.

## Stack
- Backend: Laravel 13 + PHP 8.4 + tymon/jwt-auth + SQLite
- Frontend: React 19 (Vite) + Tailwind CSS 4 + Axios + React Router

## Estructura
- `/` — Proyecto Laravel (API)
- `/frontend/` — Proyecto React (SPA)

## Endpoints API
- POST /api/register — Registro (name, email, password)
- POST /api/login — Login (email, password) → token JWT
- POST /api/logout — Logout (auth required)
- GET /api/me — Usuario actual (auth required)
- GET /api/tasks — Listar tareas del usuario (auth required)
- POST /api/tasks — Crear tarea (auth required)
- PUT /api/tasks/{id} — Actualizar tarea (auth required)
- DELETE /api/tasks/{id} — Eliminar tarea (auth required)

## Convenciones
- API responses en JSON con estructura consistente: { data, message, status }
- Validaciones con FormRequest
- Relación User hasMany Tasks, Task belongsTo User
- JWT token en header Authorization: Bearer {token}
- Frontend guarda token en localStorage
- Rutas protegidas redirigen a /login si no hay token

## Para correr

### Opción 1: Con Docker (recomendado)
```bash
# Levantar todo el proyecto con un solo comando
docker compose up --build

# Backend disponible en: http://localhost:8000
# Frontend disponible en: http://localhost:5173
```

```bash
# Detener los containers
docker compose down

# Reconstruir desde cero (si cambiaron dependencias o hay errores de cache)
docker compose down -v
docker compose build --no-cache
docker compose up
```

### Opción 2: Sin Docker (manual)
Requiere PHP 8.4+, Composer 2, Node.js 20+ instalados localmente.
```bash
# Backend
php artisan serve

# Frontend (en otra terminal)
cd frontend && npm run dev
```

## Archivos Docker
- `Dockerfile` — Imagen del backend (PHP 8.4 + Composer + SQLite)
- `frontend/Dockerfile` — Imagen del frontend (Node 22 + Vite con HMR)
- `docker-compose.yml` — Orquestación de ambos servicios
- `.dockerignore` / `frontend/.dockerignore` — Exclusiones de build

## Notas Docker importantes
- El backend usa `php:8.4-cli` (Laravel 13/Symfony 8 requiere PHP >= 8.4)
- El frontend usa `node:22-alpine` y NO copia `package-lock.json` al container (evita conflictos de plataforma macOS vs Linux ARM64)
- Si hay errores de módulos nativos (rollup, esbuild), limpiar volumes: `docker compose down -v` y rebuildar con `--no-cache`
- Composer instala **con** dependencias dev (Pail, etc.) para evitar errores de ServiceProvider

## Requisitos Docker
- Docker Engine 20+ y Docker Compose v2
- Puertos 8000 y 5173 libres

Ver IMPLEMENTACION.md para el plan completo de la demo.
