# Backend - My Pixel Arts II 🎨

Este es el backend del proyecto **My Pixel Arts II**, una aplicación para crear arte colaborativo en un lienzo de píxeles. Este backend está desarrollado con Node.js, Express y MongoDB.

## 🚀 Estado del Backend

Actualmente, el backend incluye las siguientes funcionalidades:

- **Autenticación de Administradores**:
  - Login de administradores con JWT.
- **Gestión de Píxeles**:
  - Obtener todos los píxeles del lienzo.
  - Pintar un píxel en una posición específica.
- **Gestión del Lienzo**:
  - Obtener el tamaño actual del lienzo.
  - Actualizar el tamaño del lienzo (requiere autenticación).
- **Gestión de Colores**:
  - Obtener todos los colores disponibles.
  - Agregar nuevos colores (requiere autenticación).
- **Scripts Utilitarios**:
  - Crear un administrador por defecto.
  - Poblar la base de datos con colores predefinidos.

## 📂 Estructura del Proyecto

/Backend (My Pixel Arts II)
├── /config
│ ├── db.js # Configuración de la conexión a la base de datos
│ ├── defaultAdmin.js # Script para crear un administrador por defecto
├── /controllers
│ ├── authController.js # Controlador para autenticación
│ ├── pixelController.js # Controlador para gestión de píxeles
│ ├── canvasController.js # Controlador para gestión del lienzo
│ ├── colorController.js # Controlador para gestión de colores
├── /models
│ ├── Admin.js # Modelo de administrador
│ ├── Pixel.js # Modelo de píxel
│ ├── Canvas.js # Modelo del lienzo
│ ├── Color.js # Modelo de color
├── /routes
│ ├── authRoutes.js # Rutas para autenticación
│ ├── pixelRoutes.js # Rutas para gestión de píxeles
│ ├── canvasRoutes.js # Rutas para gestión del lienzo
│ ├── colorRoutes.js # Rutas para gestión de colores
├── /utils
│ ├── jwtHelper.js # Utilidad para manejo de JWT
│ ├── errorHandler.js # Middleware para manejo de errores
├── .env # Variables de entorno
├── .gitignore # Archivos y carpetas ignorados por Git
├── package.json # Dependencias y scripts del proyecto
├── server.js # Punto de entrada del servidor
├── README.md # Documentación del proyecto

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM para MongoDB.
- **JWT**: Para autenticación basada en tokens.
- **dotenv**: Manejo de variables de entorno.
- **bcrypt**: Hashing de contraseñas.

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB Atlas o una instancia local de MongoDB
- npm (v8 o superior)

## ⚙️ Configuración

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
   PORT=3000
   MONGO_URI= <URL_DE_TU_BASE_DE_DATOS>
   JWT_SECRET=secretito_super_secreto_123

4. Configura tu base de datos en MongoDB Atlas o localmente.

🚀 Scripts Disponibles

- Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

- Iniciar el servidor en modo producción:

```bash
npm start
```

- Crear un administrador por defecto:

```bash
npm run create-admin
```

- Poblar la base de datos con colores predefinidos:

```bash
npm run populate-colors
```

📖 Endpoints de la API

- **Autenticación**:

  - `POST /api/auth/login`: Iniciar sesión como administrador.

- **Píxeles**:

  - `GET /api/pixels`: Obtener todos los píxeles del lienzo.
  - `POST /api/pixels`: Pintar un píxel en una posición específica.

- **Lienzo**:
  - `GET /api/canvas`: Obtener el tamaño actual del lienzo.
  - `PUT /api/canvas`: Actualizar el tamaño del lienzo (requiere autenticación).

**Colores**: - `GET /api/colors`: Obtener todos los colores disponibles. - `POST /api/colors`: Agregar nuevos colores (requiere autenticación).

    👨‍💻 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir, por favor abre un issue o envía un pull request.
