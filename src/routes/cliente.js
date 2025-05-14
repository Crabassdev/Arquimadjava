const {Router} = require('express'); //se crea una constante llamada Router, para importar express que permite crear rutas, la API son rutas para enviar solicitudes al servidor
const res=require('express/lib/response');
const router =Router();//crear una instancia de un enrutador usndo la clase Router importada de express y que almacena todas las rutas
const_ = require('underscore') ;

const cliente = require('../sample.json'); //crear variable para pasarle los datos que hay en sample.json, movies es el arreglo que contiene las películas 
console.log(cliente); // va a tener en consola lo que contiene movies=datos

//router.get es la solicitud de cargue de los datos contenidos en el arreglo movies
//se define la ruta get para la ruta raiz del servidor y se hace el cargue como segundo argumento
router.get('/', (req,res) => {
    res.json(cliente); //es una respuesta tipo json que carga el arreglo con las películas
});

//Agrega un registro a la BD
router.post('/', (req,res) => {
    //console.log(req.body);
    const {nombre, direccion, Telefono, mail } = req.body; //almacena datos
    if(nombre && direccion && Telefono && mail){ //Comprobar que los datos estén
        const id = cliente.length + 1; // asignar id autoincrementable
        const newcliente ={...req.body, id}; //agrega id al objeto nuevo
        console.log(newcliente); //visualizando en consola la nueva pelicula almacenada
        cliente.push(newcliente); //se guarda la película en la base de datos
        res.json(cliente);    
    }else{
        res.status(500).json({error:'Aquí hubo un error'});
    }    
});

//Eliminar un registro de la BD
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Captura lo que trae la URL id
    let indexToRemove = -1; //se declara variable de ámbito local para asignar temporarlmente antes de buscar 
    cliente.forEach((cliente, i) => { //se recorre el arreglo
        if (cliente.id == id) { //Se compara el id del arreglo con el que se desea borrar
            indexToRemove = i;  // si aparece coincidencia asigna valor a la variable indexremove
        }
    }); //cierre ciclo for 
    if (indexToRemove !== -1) {//valida si la variable temporal cambió de valor -1
        cliente.splice(indexToRemove, 1); // elimina los datos del arreglo pertenecientes al índice
        res.json({ message: 'Campo eliminado con éxito' }); //mensaje tipo json si se elimina correctamente
    }else {
        res.status(404).json({ error: 'Número no Valido' });
    }
});
    
module.exports =router;
