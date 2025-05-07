<h1 align="center">
    <a href="https://www.tia.com.ec/" target="_blank">
        <img style="width:250px;margin-bottom:10px;" src="https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2Ftia.svg?alt=media&token=e447b3e8-26a0-44bd-a3c1-90a78473e66d" />
    </a>
    <br>
    <img src="https://img.shields.io/badge/FULL--STACK-E53841?style=for-the-badge&label=Prueba+T%C3%A9cnica" title="Prueba Técnica FULL-STACK" height="75" />
</h1>

<div align="center">
	<a target="_blank" style="margin-right: 15px" href="https://github.com/svillacreses/prueba-supermercado-app/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/svillacreses/prueba-supermercado-app.svg?style=for-the-badge&label=Contribuciones&labelColor=364039&color=769c81" title="Contribuciones" height="25" />
    </a>
	<a target="_blank" style="margin-right: 15px" href="https://github.com/svillacreses/prueba-supermercado-app/stargazers">
        <img src="https://img.shields.io/github/stars/svillacreses/prueba-supermercado-app.svg?style=for-the-badge&label=Estrellas&labelColor=364039&color=769c81" title="Estrellas" height="25" />
    </a>
	<a target="_blank" href="https://github.com/svillacreses/prueba-supermercado-app/stargazers">
        <img src="https://img.shields.io/github/license/svillacreses/prueba-supermercado-app?style=for-the-badge&label=Licencia&labelColor=364039&color=769c81" title="Licencia" height="25" />
    </a>
	<br><br>
	<a target="_blank" href="https://linkedin.com/in/sivillacreses" style="margin-left:auto;">
        <img src="https://img.shields.io/badge/Linked--In-0077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&label=SVILLACRESES" title="LinkedIn - Santiago Villacreses" height="50" />
    </a>
	<br>
	<h2>Built With:</h2>
    <a target="_blank" href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" title="Docker" height="40" /></a>
	<a target="_blank" href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-212121?style=for-the-badge&logo=postgresql" title="PostgreSQL" height="40" /></a>
	<a target="_blank" href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-0D121C?style=for-the-badge&logo=nodedotjs" title="Node.js" height="40" /></a>
	<a target="_blank" href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3077C6?style=for-the-badge&logo=typescript&logoColor=white" title="TypeScript" height="40" /></a>
	<a target="_blank" href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs" title="Next.js" height="40" /></a>
</div>

<!-- ABOUT THE PROJECT -->

## Sobre el Proyecto

Este proyecto fue desarrollado siguiendo una serie de indicaciones de acuerdo a un PDF, pero basicamente el objetivo es desarrollar un sistema que gestione precios y promociones de un supermercado X con múltiples tiendas y productos que tendrán diferentes precios y promociones dependiendo de rangos de fechas indicados.

Algunos puntos a tener en cuenta antes de empezar:

- Se usó **Docker** para facilitar el levantamiento local del proyecto.
- Hay un archivo `.env` en la raíz del proyecto el cuál tiene todas las configuraciones necesarias para probar el proyecto. Se incluyó este archivo en el repositorio para facilitar su implementación.
- El archivo `postman-tests.json` que está en la raíz del proyecto se lo debe importar directamente en **Postman** para probar los diferentes endpoints una vez levantado el proyecto.

<div align="center">
	<h2>Modelo ER:</h2>
    <img src="https://firebasestorage.googleapis.com/v0/b/gluzsite.appspot.com/o/External%2FPrueba%20Supermercado%20BD.svg?alt=media&token=33aa232f-251f-4f44-82f5-923bcbe1dce5" />
    <br><br>
    <a href="https://dbdiagram.io/d/Prueba-Supermercado-BD-681bcdc65b2fc4582faa288a" target="_blank"> === Visualizar en dbdiagram.io === </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Inicialización del Proyecto

Este es un proyecto _full-stack_ que utiliza **Node.js** (con TypeScript) en el backend, **Next.js** en el frontend, y **PostgreSQL** para la base de datos, todo gestionado con **Docker**.

### Requisitos

- Docker ([Instalar](https://www.docker.com/get-started))
- Docker Compose ([Instalar](https://docs.docker.com/compose/))

### Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/svillacreses/prueba-supermercado-app.git
   cd prueba-supermercado-app
   ```

2. Construir y levantar los contenedores:

   Usa `docker-compose` para construir y levantar todos los contenedores (backend, frontend y base de datos):

   ```sh
   docker-compose up --build
   ```

   Esto descargará las imágenes necesarias, construirá los contenedores y levantará la aplicación.

3. Acceder a la aplicación:

   - **Frontend:** http://localhost:3000
   - **Backend:** http://localhost:4000
   - **Base de Datos:** Puedes conectarte desde un cliente como [pgAdmin](https://www.pgadmin.org/download/) o desde la terminal via línea de comandos.

4. Comandos útiles:
   - Para parar los contenedores:
     ```sh
     docker-compose down
     ```
   - Para ver los logs de los contenedores:
     ```sh
     docker-compose logs
     ```

<p align="right">(<a href="#top">back to top</a>)</p>
