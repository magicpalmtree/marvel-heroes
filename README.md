# Marvel Challenge

Marvel Challenge es una aplicación web que busca los personajes del universo Marvel. Además permite ver cuales son los comics asociados a cada personaje. En Marvel Challenge se puede añadir comics favoritos y ver en detalle cada uno de ellos.

Este proyecto está continuamente en mejora desde que fue desarrollado por primera vez, así que si deseas ayudar lo único que debes hacer es clonar el proyecto.

`git clone https://github.com/kmiloarguello/testGrability.git`

Debes tener en cuenta que la rama Master está configurada con Heroku, para que por cada `commit` o `pull-request` dentro de esta rama, se despliega directamente al entorno de Producción.

Una vez lo tengas clonado los comandos que debes usar son:

`npm install`

Debido a que necesitas llamar todas las dependencias del proyecto. Si vas a trabajar localmente debes tener en cuenta que el proyecto está configurado para que cuando se esté en un entorno remoto, el servidor cambie de puerto, asi que debes cambiar en la parte `app.listen` del archivo `index.js` las siguientes lineas:

Si estas trabajando en local debes tener lo siguiente:

```
app.listen(app.get('port'), function() {
  console.log('listening on port 3000')
})
```

Y si estas vas a pasar a producción debes tener:

`app.listen(process.env.PORT, process.env.IP);`

Luego de este proceso puedes ejecutar:

`npm start`

Y de este modo lanzas el servidor. Si deseas visualizar el resultado puedes hacerlo en tu navegador. En el puerto 3000.

`http://localhost:3000`

Este proyecto fue realizado para la prueba de Frontend Developer en Grability.

Cualquier duda o comentario contactarme

> Camilo Arguello

> Developer
