# Mi_primer_app_web-frontend
# Gestión de Tareas Colaborativas - Backend

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)](https://www.mongodb.com/cloud/atlas)
[![Express](https://img.shields.io/badge/Express-4.x-orange)](https://expressjs.com/)

Este proyecto es la parte del **backend** para una herramienta de gestión de tareas colaborativas, diseñada para que pequeños equipos puedan crear, organizar y asignar tareas. La API permite realizar operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) sobre las tareas y gestionar su estado.

---

## Tecnologías Utilizadas 💻

- **Node.js**: Entorno de ejecución del servidor.  
- **Express**: Framework web para construir la API REST.  
- **MongoDB**: Base de datos NoSQL para el almacenamiento de las tareas.  
- **Mongoose**: Librería para la modelización de datos de MongoDB.  
- **express-validator**: Middleware para la validación de los datos en las rutas.  
- **dotenv**: Gestión de variables de entorno.  
- **cors**: Para habilitar las peticiones desde el frontend.  

---

## Requerimientos de Instalación ⚙

Para ejecutar este proyecto, necesitas tener instalado:  

- **Node.js** (versión 14 o superior)  
- **MongoDB** (local o en la nube, como MongoDB Atlas)  

Sigue estos pasos para la instalación:


# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>

# Navega al directorio del proyecto
cd gestion-tareas-backend

# Instala las dependencias
npm install

## Variables de Entorno (.env) 🔑

Crea un archivo .env en la raíz del proyecto con la siguiente estructura:

PORT=5000
MONGODB_URI=<TU_URL_DE_CONEXION_MONGODB>
CORS_ORIGIN=<URL_DEL_FRONTEND>


PORT: Puerto en el que se ejecutará el servidor.

MONGODB_URI: Cadena de conexión a tu base de datos MongoDB.

CORS_ORIGIN: URL del frontend para permitir las peticiones. Si estás desarrollando localmente, usa http://localhost:3000.Variables de Entorno (.env) 🔑

Crea un archivo .env en la raíz del proyecto con la siguiente estructura:

PORT=5000
MONGODB_URI=<TU_URL_DE_CONEXION_MONGODB>
CORS_ORIGIN=<URL_DEL_FRONTEND>


PORT: Puerto en el que se ejecutará el servidor.

MONGODB_URI: Cadena de conexión a tu base de datos MongoDB.

CORS_ORIGIN: URL del frontend para permitir las peticiones. Si estás desarrollando localmente, usa http://localhost:3000.

## Endpoints de la API 🚀

Todos los endpoints tienen la base /api/tasks. Ejemplos de cómo consumirlos:

Crear una nueva tarea (POST /api/tasks)

Descripción: Crea una nueva tarea en la base de datos.

Cuerpo de la Petición:

{
  "titulo": "Implementar login",
  "descripcion": "Crear el formulario y la lógica de inicio de sesión.",
  "fechaLimite": "2024-12-31T23:59:59Z",
  "responsable": "Juan Pérez"
}


 ## Obtener todas las tareas (GET /api/tasks)

Descripción: Recupera todas las tareas.

Respuesta Exitosa:

[
  {
    "_id": "60c72b2f9b1e8e4e9c1e7f2a",
    "titulo": "Implementar login",
    "estado": "pendiente",
    "responsable": "Juan Pérez"
  }
]

## Actualizar una tarea (PUT /api/tasks/:id)

Descripción: Actualiza una tarea existente por su ID.

Cuerpo de la Petición:

{
  "estado": "completada"
}


## Eliminar una tarea (DELETE /api/tasks/:id)

Descripción: Elimina una tarea por su ID.

## Repositorio del Frontend 🖼️

Este backend está diseñado para funcionar con el siguiente frontend:

Link al repositorio del Frontend
