# Preparativos de instalación

Antes de iniciar con la instalación del proyecto, es importarte asegurar que se cuenta con una versión valida
de nodejs utilizando el comando **node -v** que mostrará la última versión instalada en el equipo. De igual
forma se recomienda tener descargado su gestor de paquetes y validar su correcta instalación con **npm -v**.

Será necesario cargar la base de datos .sql en un sistema de gestión MySQL y contar con los servicios
Apache y MySQL para poder establecer la conexión con ella. 

##  Instalar dependencias

Es importante instalar todas las dependencias necesarias para la correcta operabilidad del proyecto. Dentro de la 
carpeta client como la de server ejecutamos el comando **npm install**.
También se deberá instalar la herramienta de interfaz shell de Angular con el comando 
**npm install -g@angular/cli**, 
esto dentro de la carpeta client.

## Development server


Para levantar el servidor, dentro de la carpeta server ejecutamos el comando **npm run dev**. Este comando 
establecerá la conexión con el servidor en el puerto 3000 y la conexión con la base de datos.

## Development client

Para levantar el servidor de angular, sera necesario abrir otra terminal y dentro de la
carpeta de client ejecutamos el comando **ng serve –o**. Esto establecerá la conexión con el servidor de
Angular y abrirá un navegador con la dirección en donde se esta ejecutando. 
