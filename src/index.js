//crear constantes
const express =require('express');//importar 
const app=express();

const morgan =require('morgan');

//settings
app.set('PORT', process.env.PORT || 13000); //establecer una variable en express indicando el puerto

//middleware secciones de codigo que permiten intercambiar informacion entre aplicaciones 

app.use(morgan("dev")); //Se ejecuta morgan
app.use(express.urlencoded({extended:false}));//permite al servidor entender los datos enviados desde formularios
app.use(express.json());//permite al servidor recibir y entender datos en formato json

//rutas que se usa en la aplicación
app.use(require('./routes/index'));
app.use('/api/cliente', require('./routes/cliente')); // se va a usar la ruta que es la api de movies y se va a requerir el archivo movies.js 

//definir puerto de escucha del servidor - iniciar el servidor
app.listen(app.get('PORT'), () => {
    console.log(`Server on Port ${app.get('PORT')}`);
});
