# My Next.js Project

## Descripción
Esta es una aplicación desarrollada con Next.js 14, React 18 y TypeScript que consume datos de JSONPlaceholder. La aplicación muestra usuarios, publicaciones y comentarios, utilizando React Query para la gestión de datos y Bootstrap para el estilo.

## Instalación
Para instalar y ejecutar la aplicación localmente, sigue estos pasos:
1. Clona el repositorio:
   git clone https://github.com/tuusuario/tu-repositorio.git

2. Navega al directorio del proyecto:
   cd tu-repositorio

3. Instala las dependencias:
   npm install

4. Ejecuta la aplicación en modo de desarrollo:
   npm run dev
   
5. Abre tu navegador y ve a http://localhost:3000.

## Uso
* /users: Lista todos los usuarios. Permite filtrar por nombre o username.
* /users/[id]: Muestra los detalles de un usuario específico.
* /posts: Lista todas las publicaciones. Permite filtrar por título y ordenar por título.
* /posts/[id]: Muestra los detalles de una publicación y sus comentarios. Permite añadir un comentario.

## Decisiones Arquitectónicas
Utilicé SSR en las páginas de detalles de usuarios y publicaciones para asegurar que los datos se actualicen dinámicamente en cada solicitud.

## React Query
Utilicé React Query para gestionar las solicitudes de datos, el estado y la caché. Esto permite una revalidación automática de datos y reduce las recargas innecesarias.

## Estructura de Carpetas
La estructura del proyecto sigue la convención de Next.js con la carpeta /pages para definir las rutas y componentes de la aplicación:

/pages
  |_ /users
      |_ index.tsx        // Página principal de usuarios
      |_ [id].tsx         // Página de detalles de usuario
  |_ /posts
      |_ index.tsx        // Página principal de publicaciones
      |_ [id].tsx         // Página de detalles de publicación
  |_ _app.tsx             // Configuración global de la aplicación
  |_ index.tsx            // Página principal

## Estilos
Utilicé Bootstrap y estilos globales para asegurar una interfaz responsiva y consistente.

## Cuestionario Teórico 

## A. Verdadero / Falso
1. Verdadero - Next.js 14 introduce Server Actions que permiten ejecutar lógica del lado del servidor sin necesidad de un endpoint API  adicional.

2. Falso - En React 18, la función useEffect se ejecuta después de renderizar el componente en la pantalla.

3. Falso - El tipado en TypeScript ayuda a reducir errores en tiempo de ejecución, pero no los elimina por completo.

4. Verdadero - TanStack Query permite manejar la caché de datos y revalidación de manera automática, optimizando solicitudes HTTP.

5. Falso - ShadCN no está enfocado únicamente en la creación de dashboards empresariales; se puede usar en una amplia variedad de aplicaciones.

## B. Opción Múltiple (una sola respuesta correcta)
6. B. Renderizar componentes en el servidor, reduciendo el JavaScript que se envía al cliente.

7. B. Configurar la opción revalidate al usar getStaticProps().

8. B. Permite crear interfaces y tipos para ayudar a detectar errores de forma anticipada.

9. B. Cacheo y revalidación automática de datos, reduciendo llamadas innecesarias a la API.

10. A. Es una colección de componentes (como botones, modales, etc.) creada para React, con énfasis en accesibilidad y personalización.