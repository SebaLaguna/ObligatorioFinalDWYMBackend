Despues de instalar las dependencias (npm install, npm install express y npm install mongoose), correr 1 vez el index.js que se encuentra en la carpeta de seeds. Esto es un semillero para cargar la base de datos y poder probar las funcionalidades de las aplicaciones.

Fake Instagram Backend
Descripción
Este proyecto es el backend de un clon básico de Instagram, desarrollado con Express y MongoDB para dar soporte al proyecto final de la materia Desarrollo Web y Mobile 2024. El backend incluye funcionalidades como autenticación, manejo de publicaciones, comentarios y gestión de perfiles de usuario.

Instalación
Paso 1: Clonar el repositorio
bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd api-node
Paso 2: Instalar dependencias
Ejecutar el siguiente comando dentro de la carpeta api-node:

bash
Copiar código
npm install
Paso 3: Instalar MongoDB local
Instalar MongoDB:

Navega a https://www.mongodb.com/docs/manual/installation/ y selecciona la versión Community para tu sistema operativo.
Sigue las instrucciones para instalar y levantar una instancia de MongoDB.
Instalar MongoDB Compass (opcional):

Si deseas explorar visualmente las colecciones de tu base de datos, instala MongoDB Compass desde https://www.mongodb.com/try/download/compass.
Configuración
Crear archivo .env
En la raíz del proyecto, crea un archivo .env con el siguiente contenido:

env
Copiar código
MONGO_URI=mongodb://localhost:27017/instagram
JWT_SECRET=supersecretkey
PORT=3001
Asegúrate de ajustar el valor de MONGO_URI si estás utilizando una base de datos en un servidor remoto o un servicio como MongoDB Atlas.

Poblar la Base de Datos (Opcional)
Si deseas cargar datos iniciales (usuarios, publicaciones y comentarios) en tu base de datos:

Asegúrate de que el servicio de MongoDB esté corriendo.
Ejecuta el script de semillas con el siguiente comando:
bash
Copiar código
node seeds/index.js
Esto creará:

20 usuarios de prueba.
7 publicaciones por usuario.
50 comentarios distribuidos entre las publicaciones.
Levantar el Servidor
Para iniciar el servidor:

bash
Copiar código
npm start
El servidor estará disponible en http://localhost:3001.

Documentación de la API
El backend cuenta con un Swagger que documenta todos los endpoints disponibles. Para acceder, navega a:

bash
Copiar código
http://localhost:3001/api-docs
Desde aquí podrás explorar, probar y entender los diferentes endpoints del servidor.

Funcionalidades
Autenticación
Registro: POST /api/auth/register
Login: POST /api/auth/login
Publicaciones
Subir una publicación: POST /api/posts/upload
Obtener el feed: GET /api/posts/feed
Dar like a una publicación: POST /api/posts/:postId/like
Quitar like: DELETE /api/posts/:postId/like
Comentarios
Crear comentario: POST /api/posts/:postId/comments
Eliminar comentario: DELETE /api/posts/:postId/comments/:commentId
Usuarios
Obtener perfil: GET /api/user/profile/:id
Actualizar perfil: PUT /api/user/profile/edit
Agregar amigo: POST /api/user/add-friend/:friendId
Recomendaciones
MongoDB en Producción:

Considera usar un servicio como MongoDB Atlas para entornos en producción.
Usa una variable de entorno para almacenar la URI y las credenciales de acceso.
Seguridad:

Cambia la clave JWT_SECRET a un valor único y complejo para entornos de producción.
Carga Inicial de Datos:

Usa el script de semillas solo en entornos de desarrollo o para pruebas
