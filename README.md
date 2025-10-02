
# proyecto_express_backend_guerrerodaniel_abriljuan

Backend para una aplicación de películas, desarrollado con Node.js y Express. Este proyecto proporciona una API RESTful para gestionar usuarios, películas, reseñas y reacciones.

## ✨ Features

-   **Autenticación de Usuarios con JWT**:
    -   Registro de nuevos usuarios con contraseñas encriptadas (bcrypt).
    -   Inicio de sesión seguro con JSON Web Tokens (JWT).
    -   Middleware para proteger rutas y verificar la autenticación del usuario.
-   **Gestión de Películas (CRUD)**:
    -   Crear, leer, actualizar y eliminar películas.
    -   Buscar películas por título, género, etc.
-   **Sistema de Reseñas y Calificaciones**:
    -   Los usuarios pueden crear, leer, actualizar y eliminar sus propias reseñas de películas.
    -   Validación para asegurar que los datos de las reseñas sean correctos.
-   **Reacciones a Películas**:
    -   Permite a los usuarios reaccionar a las películas (por ejemplo, "Me gusta").
    -   Creación y eliminación de reacciones.
-   **Panel de Administración**:
    -   Rutas y controladores específicos para administradores.
    -   Funciones para gestionar todos los aspectos de la aplicación: usuarios, películas, reseñas y reacciones.
-   **Documentación de la API con Swagger**:
    -   Generación automática de documentación de la API.
    -   Interfaz de usuario de Swagger para visualizar y probar los endpoints de la API.
-   **Seguridad**:
    -   Limitación de velocidad (rate limiting) para prevenir ataques de fuerza bruta.
    -   Validación de entradas para protegerse de inyecciones de datos maliciosos.

## 🛠️ Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
-   **Express**: Framework web para Node.js.
-   **MongoDB**: Base de datos NoSQL.
-   **Mongoose**: Modelado de datos de objetos (ODM) para MongoDB.
-   **JSON Web Tokens (JWT)**: Para la autenticación de usuarios.
-   **Bcrypt**: Para el hash de contraseñas.
-   **Swagger**: Para la documentación de la API.
-   **Passport.js**: Middleware de autenticación para Node.js.
-   **ESLint**: Para el linting de código y mantenimiento de la calidad.

## 🚀 Getting Started

### Prerequisites

-   Node.js ([https://nodejs.org/](https://nodejs.org/))
-   npm (normalmente se instala con Node.js)
-   MongoDB ([https://www.mongodb.com/](https://www.mongodb.com/))

### Installation

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Danny200523/Proyecto_Express_BackEnd_GuerreroDaniel_AbrilJuan.git
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

3.  Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

    ```env
    PORT=3000
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_NAME=
    JWT_SECRET=
    ```

## 🏃‍♀️ Usage

Para iniciar el servidor en modo de desarrollo (con reinicio automático gracias a Nodemon):

```bash
npm run dev
```

Para iniciar el servidor en modo de producción:

```bash
npm start
```

Para generar la documentación de Swagger:

```bash
npm run swagger
```

## 📖 API Endpoints

La documentación completa de la API se genera con Swagger y está disponible en la ruta `/api-docs` después de iniciar el servidor.

### Autenticación

-   `POST /login`: Iniciar sesión.
-   `POST /register`: Registrar un nuevo usuario.

### Usuarios

-   `GET /users/list`: Listar todos los usuarios (solo para administradores).
-   `GET /users/{id}`: Obtener un usuario por su ID.
-   `PUT /users/update/{id}`: Actualizar un usuario.
-   `DELETE /users/delete/{id}`: Eliminar un usuario (solo para administradores).

### Películas

-   `POST /peliculas/create`: Crear una nueva película (solo para administradores).
-   `GET /peliculas/list`: Listar todas las películas.
-   `GET /peliculas/{id}`: Obtener una película por su ID.
-   `PUT /peliculas/update/{id}`: Actualizar una película (solo para administradores).
-   `DELETE /peliculas/delete/{id}`: Eliminar una película (solo para administradores).

### Reseñas

-   `POST /resenas/create`: Crear una nueva reseña.
-   `GET /resenas/list`: Listar todas las reseñas.
-   `GET /resenas/{id}`: Obtener una reseña por su ID.
-   `PUT /resenas/update/{id}`: Actualizar una reseña.
-   `DELETE /resenas/delete/{id}`: Eliminar una reseña.

### Reacciones

-   `POST /reacciones/create`: Crear una nueva reacción.
-   `GET /reacciones/list`: Listar todas las reacciones.
-   `DELETE /reacciones/delete/{id}`: Eliminar una reacción.

## 🎨 Frontend y Figma

### Frontend

[[Enlace a tu frontend](https://proyecto-express-front-end-guerrero.vercel.app/)] - *Aquí puedes añadir el enlace al repositorio o a la aplicación desplegada de tu frontend.*

### Figma

[Enlace a tu diseño en Figma] - *Aquí puedes añadir el enlace a tu diseño en Figma.*

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4.  Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un Pull Request.

## 👨‍💻 Author

-   **Daniel Guerrero**

