# Capacitación Claude AI — Día 2
## Demo Técnica: Laravel + ReactJS con Claude Code y Cowork

**Capacitador:** Eduardo Villa · eduardo@nubiot.io
**Duración:** 1 hora (40 min demo + 20 min consultas)
**Audiencia:** Desarrolladores, QA y Scrum Masters
**Prerequisito:** Haber completado el Día 1 (recorrida por herramientas, prompts básicos)

---

## Contexto

En el Día 1 se cubrió la visión general de Claude (Chat, Code, Cowork), la anatomía de un buen prompt, y las mejores prácticas. El Día 2 es la sesión práctica donde los participantes ven a Claude Code construir una app real de cero, integrando repositorio Git, flujos de trabajo en equipo con Cowork, y técnicas de debugging asistido.

---

## Objetivo General

Demostrar en vivo cómo Claude Code y Cowork aceleran el desarrollo de una aplicación full-stack (Laravel 13 API + React 19 frontend) con autenticación JWT, desde la creación del proyecto hasta la prueba end-to-end, mostrando flujos de trabajo colaborativos reales.

---

## Proyecto Demo: "TaskBoard"

App sencilla de gestión de tareas con autenticación. El usuario se registra, inicia sesión, y puede crear/ver/eliminar tareas personales. Lo suficientemente simple para construir en 40 minutos, lo suficientemente completo para mostrar el flujo full-stack.

---

## Etapas de la Demo

### ETAPA 1: Setup del Proyecto, Docker y Repositorio (7 min)
**Objetivo:** Mostrar cómo Claude Code entiende y trabaja con un repositorio desde cero, incluyendo la dockerización completa para levantar el proyecto en vivo.

**Lo que se muestra:**
- Crear proyecto Laravel con `composer create-project` (via Docker: `docker run --rm -v $(pwd):/app -w /app composer:2 create-project`)
- Inicializar repositorio Git
- Abrir Claude Code en la terminal (`claude`)
- Pedirle a Claude que analice la estructura del proyecto
- Crear el proyecto React con Vite dentro de una carpeta `frontend/`
- **Dockerizar el proyecto completo (backend + frontend)**
- Primer commit automático con Claude Code

**Prompt de ejemplo para la demo:**
```
Estoy creando un proyecto Laravel + React para una app de tareas llamada TaskBoard.
Ya tengo el proyecto Laravel creado. Necesito:
1. Crear un proyecto React con Vite en la carpeta frontend/
2. Configurar CORS en Laravel para que acepte requests del frontend en localhost:5173
3. Crear un .gitignore apropiado para ambos proyectos
4. Dockerizar el proyecto completo para desarrollo:
   - Dockerfile para el backend Laravel (PHP 8.4 + Composer + SQLite)
   - Dockerfile para el frontend React (Node 22 + Vite con HMR)
   - docker-compose.yml que levante ambos servicios
   - .dockerignore para ambos contextos
   - El proyecto se tiene que poder levantar con "docker compose up --build"
5. Hacer el commit inicial con un mensaje descriptivo
```

**Puntos a destacar para la audiencia:**
- Claude lee toda la estructura del proyecto automáticamente
- Entiende que es Laravel y aplica convenciones del framework
- Genera la configuración Docker completa y coherente con el stack
- Un solo `docker compose up` levanta todo: no hay que instalar PHP, Composer ni Node localmente
- Genera el commit con mensaje descriptivo sin que se lo pidamos
- Muestra cómo se ve el flujo en la terminal

---

### ETAPA 2: Backend Laravel — Auth con JWT (10 min)
**Objetivo:** Generar los endpoints de autenticación completos con un solo prompt bien armado.

**Lo que se muestra:**
- Instalación de tymon/jwt-auth vía Claude Code
- Modelo User con JWT traits
- AuthController con register, login, logout, me
- Rutas API protegidas con middleware auth:api
- Migration y configuración de la base de datos (SQLite para simplificar)
- Tests automáticos de los endpoints

**Prompt de ejemplo para la demo:**
```
Necesito implementar autenticación JWT en este proyecto Laravel.

Usá el paquete tymon/jwt-auth. Implementá:
- Configuración completa de JWT (secret, guards, providers)
- AuthController con estos endpoints:
  POST /api/register — registro con name, email, password (devuelve token)
  POST /api/login — login con email, password (devuelve token)
  POST /api/logout — logout (requiere auth)
  GET /api/me — datos del usuario autenticado (requiere auth)
- Rutas en api.php con middleware correspondiente
- Usá SQLite como base de datos para simplificar
- Corré las migrations

Seguí las convenciones de Laravel 13. Hacé un commit cuando termines.
```

**Puntos a destacar para la audiencia:**
- Un solo prompt genera múltiples archivos coordinados
- Claude instala dependencias, publica configs, corre migrations
- Verificación automática: Claude intenta correr los tests
- Si algo falla, Claude lo detecta y corrige solo
- Comparar con cuánto tardaría esto manualmente (30-45 min vs 3-5 min)

---

### ETAPA 3: Backend Laravel — CRUD de Tareas (5 min)
**Objetivo:** Agregar el modelo de negocio principal mostrando cómo Claude mantiene contexto del código existente.

**Lo que se muestra:**
- Modelo Task con relación a User
- TaskController con CRUD completo
- Rutas protegidas
- Validaciones con FormRequest
- Migration

**Prompt de ejemplo para la demo:**
```
Ahora necesito el CRUD de tareas.

Cada tarea tiene: title (string, requerido), description (text, opcional),
completed (boolean, default false), y pertenece a un user.

Creá:
- Modelo Task con relación belongsTo User (y hasMany en User)
- Migration
- TaskController como API Resource con: index (solo mis tareas),
  store, show, update, destroy
- FormRequest para validación
- Rutas protegidas con auth:api
- Corré migrations y hacé commit
```

**Puntos a destacar para la audiencia:**
- Claude ya conoce el código de la etapa anterior (AuthController, rutas, etc.)
- No necesitás repetir contexto, Claude lee el repo
- Genera código consistente con lo que ya existe
- Mantiene el patrón de rutas y respuestas JSON establecido

---

### ETAPA 4: Frontend React — Login y Registro (10 min)
**Objetivo:** Mostrar que Claude Code no es solo backend, genera frontend completo y conectado.

**Lo que se muestra:**
- Estructura de componentes React
- Páginas de Login y Register con formularios
- Service/API layer con Axios para conectar con Laravel
- Manejo de JWT en el frontend (almacenar token, enviar en headers)
- React Router para navegación
- Diseño limpio con Tailwind CSS

**Prompt de ejemplo para la demo:**
```
Ahora necesito el frontend React. Trabajá en la carpeta frontend/.

Implementá:
1. Instalá axios, react-router-dom y tailwindcss
2. Service layer (api.js) que:
   - Configura axios con baseURL http://localhost:8000/api
   - Interceptor que agrega el token JWT en Authorization header
   - Guarda/lee el token de localStorage
3. Contexto de autenticación (AuthContext) con:
   - Estado del usuario, login, register, logout
   - Protección de rutas (redirect a login si no hay token)
4. Páginas:
   - LoginPage: formulario email + password, botón login, link a register
   - RegisterPage: formulario name + email + password + confirm, botón registrar
   - DashboardPage: placeholder que muestra "Hola {nombre}" y botón logout
5. Router con rutas públicas (/login, /register) y protegidas (/dashboard)
6. Diseño con Tailwind: centrado, cards con sombra, colores modernos

Hacé commit cuando termines.
```

**Puntos a destacar para la audiencia:**
- Claude genera frontend Y lo conecta con el backend que ya creó
- Conoce los endpoints exactos porque leyó el código Laravel
- Genera interceptores de Axios, manejo de tokens, rutas protegidas
- Todo en un solo prompt, múltiples archivos coordinados

---

### ETAPA 5: Frontend — Lista de Tareas y CRUD (5 min)
**Objetivo:** Completar la app conectando el CRUD de tareas en el frontend.

**Lo que se muestra:**
- Componente TaskList con las tareas del usuario
- Formulario para crear tarea nueva
- Marcar como completada / eliminar
- Integración con los endpoints del backend

**Prompt de ejemplo para la demo:**
```
Completemos el frontend con la funcionalidad de tareas.

En el DashboardPage, reemplazá el placeholder con:
1. Formulario inline para crear tarea (título + descripción + botón agregar)
2. Lista de tareas del usuario obtenidas del API
3. Cada tarea muestra: título, descripción, checkbox para completar, botón eliminar
4. Las tareas completadas se muestran tachadas y en gris
5. Feedback visual al crear/eliminar (loading states)
6. Si no hay tareas: mensaje "No tenés tareas aún, creá una!"

Usá el service layer que ya tenemos para las llamadas al API.
Commit cuando esté listo.
```

**Puntos a destacar para la audiencia:**
- Claude reutiliza el service layer existente sin que se lo repitamos
- Genera UI con estados de loading, vacío y error
- Mantiene consistencia visual con lo que ya creó
- Cada prompt construye sobre el anterior: desarrollo incremental

---

### ETAPA 6: Prueba End-to-End en Vivo con Docker (3 min)
**Objetivo:** Mostrar la app funcionando completa, de punta a punta, levantada con Docker.

**Lo que se muestra:**
- Levantar todo el proyecto con `docker compose up --build`
- Verificar que ambos containers están corriendo (`docker compose ps`)
- Registro de un usuario nuevo en http://localhost:5173
- Login con las credenciales
- Crear tareas, completarlas, eliminarlas
- Logout y verificar que la ruta protegida redirige
- Mostrar los logs en tiempo real (`docker compose logs -f`)

**Alternativa sin Docker (por si falla):**
- Levantar Laravel (`php artisan serve`)
- Levantar React (`cd frontend && npm run dev`)

**Puntos a destacar para la audiencia:**
- Una app funcional construida en ~35 minutos con Claude
- Backend + Frontend + Auth + CRUD completo
- Todo versionado en Git con commits descriptivos
- **Un solo comando levanta todo el proyecto, sin instalar dependencias localmente**
- Los containers tienen hot-reload: cambios en el código se reflejan al instante

---

### ETAPA 7: Debugging Asistido (5 min)
**Objetivo:** Mostrar cómo Claude Code resuelve errores en tiempo real.

**Lo que se muestra:**
- Introducir un error a propósito (por ejemplo, cambiar una ruta del API, romper una validación, o crear un typo en un import)
- Copiar el error del navegador o terminal
- Pedirle a Claude que lo resuelva

**Prompt de ejemplo para la demo:**
```
Tengo este error en la consola del navegador:

[pegar error exacto aquí]

Encontrá la causa y arreglalo.
```

**Puntos a destacar para la audiencia:**
- Claude lee el stack trace y navega el código fuente para encontrar la causa raíz
- No se limita al archivo donde está el error, busca en toda la cadena
- Propone el fix y lo aplica directamente
- Esto es lo que más tiempo ahorra en el día a día

---

### ETAPA 8: Flujo de Trabajo en Equipo con Cowork (5 min)
**Objetivo:** Mostrar cómo Cowork complementa Claude Code para tareas no-técnicas del equipo.

**Lo que se muestra:**
- Desde Cowork, analizar el proyecto creado:
  * "Leé el código de este proyecto y generá un README.md completo"
  * "Generá las User Stories del backlog basándote en el código actual"
  * "Creá un checklist de QA para testear la autenticación"
- Mostrar cómo un Scrum Master o QA puede interactuar con el proyecto sin tocar código
- Demostrar la creación de documentación automática

**Puntos a destacar para la audiencia:**
- Cowork no requiere terminal ni conocimiento técnico
- Ideal para QA (generar casos de prueba), Scrum Masters (User Stories, documentación)
- Trabaja sobre los mismos archivos que los devs
- Complementa a Claude Code, no lo reemplaza
- Todo el equipo puede beneficiarse, no solo los developers

---

## Resumen de Tiempos

| Etapa | Duración | Acumulado |
|-------|----------|-----------|
| 1. Setup, Docker y repositorio | 7 min | 7 min |
| 2. Backend Auth JWT | 10 min | 17 min |
| 3. Backend CRUD Tareas | 5 min | 22 min |
| 4. Frontend Login/Registro | 10 min | 32 min |
| 5. Frontend CRUD Tareas | 5 min | 37 min |
| 6. Prueba E2E con Docker | 3 min | 40 min |
| 7. Debugging Asistido | 5 min | 45 min |
| 8. Flujo Cowork en equipo | 5 min | 50 min |
| **Consultas y cierre** | **10 min** | **60 min** |

---

## Guía de Setup desde Cero (si hay que recrear el proyecto)

Esta guía documenta los pasos exactos para levantar el proyecto desde un directorio vacío.
Todos los comandos usan Docker — **no se necesita PHP, Composer ni Node instalados localmente**.

### Paso 1: Crear directorio y archivos base

```bash
mkdir taskboard && cd taskboard
git init
```

### Paso 2: Crear proyecto Laravel via Docker

```bash
# Crear Laravel en un directorio temporal
docker run --rm -v "$(pwd)":/app -w /app composer:2 create-project laravel/laravel temp-laravel --no-interaction

# Mover archivos al directorio raíz (sin pisar los que ya existan)
cp -r temp-laravel/.env temp-laravel/.env.example temp-laravel/.editorconfig temp-laravel/.gitattributes . 2>/dev/null
for item in app artisan bootstrap composer.json composer.lock config database package.json phpunit.xml public resources routes storage tests vendor vite.config.js; do
  cp -r "temp-laravel/$item" .
done
rm -rf temp-laravel
```

> **Importante:** `composer:2` usa la última versión de PHP disponible en su imagen. Las dependencias de Symfony/Laravel se resuelven para esa versión. El Dockerfile del backend **debe usar la misma versión mayor de PHP** (actualmente 8.4). Si no coincide, `composer install` falla con errores de versión.

### Paso 3: Crear proyecto React manualmente

> **No usar `npx create-vite` dentro de Docker.** Tiene problemas con templates (genera vanilla en vez de React) y con versiones de Node. Es más rápido y confiable crear los archivos manualmente.

```bash
mkdir -p frontend/src frontend/public
```

Crear `frontend/package.json`:
```json
{
  "name": "taskboard-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.4.1",
    "@tailwindcss/vite": "^4.2.2",
    "tailwindcss": "^4.2.2",
    "vite": "^6.3.1"
  }
}
```

Crear `frontend/vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
```

Crear `frontend/index.html`:
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TaskBoard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Crear `frontend/src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Crear `frontend/src/App.jsx`:
```jsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-indigo-600">TaskBoard</h1>
    </div>
  )
}

export default App
```

Crear `frontend/src/index.css`:
```css
@import "tailwindcss";
```

### Paso 4: Instalar dependencias del frontend

```bash
cd frontend && npm install && cd ..
```

> Si npm no está disponible localmente, usar Docker:
> `docker run --rm -v "$(pwd)/frontend":/app -w /app node:22-alpine npm install`

### Paso 5: Crear archivos Docker

Los Dockerfiles y docker-compose.yml deben respetar estas reglas:

**Dockerfile (backend):**
- Imagen base: `php:8.4-cli` (NO 8.2, Laravel 13 requiere >= 8.4)
- Composer: `composer install` sin flag `--no-dev` (PailServiceProvider necesita deps dev)

**frontend/Dockerfile:**
- Imagen base: `node:22-alpine`
- **NO copiar `package-lock.json`** al container (solo `package.json`). El lock file se genera en macOS y tiene binarios nativos incompatibles con Linux ARM64 del container, causando error de `@rollup/rollup-linux-arm64-musl`

**docker-compose.yml:**
- NO incluir `version: "3.8"` (obsoleto en Docker Compose v2, genera warning)

### Paso 6: Configurar CORS en Laravel

Crear `config/cors.php` manualmente (Laravel 13 no lo trae por defecto):
```php
<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### Paso 7: Levantar y verificar

```bash
docker compose up --build
```

Verificar:
- http://localhost:8000 → Laravel welcome page
- http://localhost:5173 → React "TaskBoard"

Si hay errores de cache o módulos nativos:
```bash
docker compose down -v
docker compose build --no-cache
docker compose up
```

### Paso 8: Commit inicial

```bash
git add . && git commit -m "feat: setup inicial del proyecto TaskBoard"
```

### Resumen de problemas conocidos y soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| `composer install` falla con "requires php >=8.4" | Dockerfile usa `php:8.2-cli` pero deps requieren 8.4 | Usar `php:8.4-cli` en el Dockerfile |
| `PailServiceProvider not found` | Composer instaló con `--no-dev` | Quitar flag `--no-dev` de `composer install` |
| `Cannot find module @rollup/rollup-linux-arm64-musl` | `package-lock.json` de macOS copiado al container Linux | No copiar `package-lock.json` en el Dockerfile del frontend |
| `create-vite` genera template vanilla (no React) | Bug con versiones viejas de Node en Docker | Crear archivos React manualmente |
| Warning "attribute version is obsolete" | `version: "3.8"` en docker-compose.yml | Eliminar la línea `version` |

---

## Requisitos Técnicos Previos (para el capacitador)

### Software necesario
- **Docker Engine 20+** y **Docker Compose v2** (para levantar el proyecto sin instalar dependencias)
- Git
- Claude Code instalado y autenticado (`npm install -g @anthropic-ai/claude-code`)
- Claude Desktop con Cowork habilitado
- VS Code o editor visual (para mostrar los archivos generados)
- Navegador con DevTools abierto

> **Nota:** Con Docker no es necesario tener PHP, Composer, Node ni SQLite instalados localmente. Todas las dependencias corren dentro de los containers. Si Docker no está disponible, instalar: PHP 8.4+ con Composer, Node.js 20+ con npm, SQLite3.

### Preparación pre-demo
1. Tener Docker instalado y verificado (`docker compose version`)
2. **Pre-descargar las imágenes Docker** para no depender de la red durante la demo:
   ```bash
   docker pull php:8.4-cli
   docker pull composer:2
   docker pull node:22-alpine
   ```
3. Tener un proyecto "de respaldo" ya construido por si algo falla en vivo
4. **Pre-buildear los containers del backup**: `docker compose build` en el proyecto de respaldo
5. Tener los prompts copiados y listos para pegar (no tipear en vivo)
6. Probar la conexión a internet (Claude Code necesita API)
7. Terminal con fuente grande visible para la audiencia
8. Dos terminales listas: una para Claude Code, otra para `docker compose up`

### Tips para la demo en vivo
- Si Claude tarda, llenar el silencio explicando qué está haciendo
- Tener el proyecto backup listo para switchear si algo se rompe
- **Si Docker falla, tener el fallback manual listo** (`php artisan serve` + `npm run dev`). Requiere PHP 8.4+, Composer y Node 20+ local
- **Si hay errores de módulos nativos en el frontend** (rollup, esbuild), limpiar volumes: `docker compose down -v` y rebuildar con `docker compose build --no-cache`
- **Composer debe instalar CON deps dev** (sin `--no-dev`) para evitar error de PailServiceProvider
- Mostrar los archivos generados en VS Code para que la audiencia vea el código
- Pausar después de cada etapa para preguntas rápidas
- Si un error surge inesperadamente, aprovecharlo para la etapa de debugging
- **Mostrar `docker compose ps` y `docker compose logs` para que la audiencia vea la orquestación**

---

## Mensajes Clave del Día 2

1. **Claude Code no genera fragmentos, genera proyectos completos** — Toda la coordinación entre archivos la resuelve solo porque lee el repositorio entero. Incluyendo la infraestructura Docker para levantar todo con un solo comando.
2. **El prompt es tu especificación** — Cuanto más preciso el prompt, más preciso el resultado. Los prompts de hoy son las specs técnicas de mañana.
3. **Desarrollo iterativo, no prompt perfecto** — Construimos en etapas, cada prompt construye sobre lo anterior. No hace falta meter todo en un solo prompt.
4. **Debugging con Claude es el game changer** — Ahorra más tiempo que la generación de código nueva. Pegarle un error y que lo resuelva cambia el flujo diario.
5. **Todo el equipo participa** — Cowork permite que QA y Scrum Masters interactúen con el proyecto sin conocimientos técnicos.

---

## Conexión con Día 3

Al cierre, recordar que en el Día 3 cada equipo trae su caso de uso real (enviado con 48hs de anticipación) y se trabaja con Claude aplicado directamente a su proyecto. Lo que aprendieron en el Día 2 sobre cómo armar prompts para desarrollo full-stack lo van a aplicar a su propio código.
