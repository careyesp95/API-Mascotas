const express = require('express');
// me traigo los modelos
const {Dog, Temperamento} = require('../db');
const axios = require('axios');

const app = express.Router();


// GET/DOGS
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta
// principal

app.get('/dogs', async (_req, res, next) => {
    try{
        let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
        apiDogs = apiDogs.data;
        let detailDog = apiDogs.map(dogs => {
            let dog = {
                image:dogs.image.url,
                nombre:dogs.name,
                temperamento:dogs.temperament,
                peso:dogs.weight.imperial,
            }
            return dog;
        }) 
        res.json(detailDog)
    }catch(error){
        next(error)
    }
})

// GET/DOGS?name="..."

// Obtener un listado de las razas de perro
// que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro, mostar un mensaje
// adecuado

app.get('/dogs-name', (req, res, next) => {
    try{
        const {name} = req.query;
        let dogsdbPromise = Dog.findAll()
    // busqueda en mi API externa dogs:
        let apiDogsPromise = axios.get('https://api.thedogapi.com/v1/breeds')
        return Promise.all([
            dogsdbPromise,
            apiDogsPromise
        ]).then(result => {
            let dogsdb = result[0];
            dogsdb = dogsdb.map(dogs => {
                return {
                    id:dogs.Id,
                    name:dogs.name,
                }
            })
            let apiDogs = result[1].data
            apiDogs = apiDogs.map(dogs => {
                return {
                    id:dogs.id,
                    name:dogs.name
                }
            })
            let allDogs = dogsdb.concat(apiDogs)
            allDogs = allDogs.find(data => data.name.toLowerCase() === name.toLowerCase())
            if(!allDogs) return res.json({mesagge:'no hay raza'})
            if(allDogs) return res.json(allDogs)
        })
    }catch(error){
        next(error)
    }
})

//[] GET/dogs/{idRaza}:

//Obtener el detalle de una raza de perro en particular
//Debe traer solo los datos pedidos en la ruta 
//de detalle de raza de perro
//incluir los temperamentos asociados
// [] los campos mostrados en la ruta principal 
// para cada raza(imagen, nombre y temperamento)
// [] Altura
// [] peso
// [] años de vida

app.get('/dogs/:idRaza', async (req,res,next) => {
    const {idRaza} = req.params;
    if(!idRaza){
        return next({mesagge:'No ingresaste un id correcto'})
    }
    var dogId;
    try{
        if(typeof idRaza === 'string' && idRaza.length > 10){
            dogId = await Dog.findByPk(idRaza) 
        }else {
            let dogApiResponse = await axios.get('https://api.thedogapi.com/v1/breeds')
            dogApiResponse = dogApiResponse.data
            allDogs = dogApiResponse.find(value => value.id === Number(idRaza))
            dogId = {
                image:allDogs.image.url,
                name:allDogs.name,
                temperamento:allDogs.temperament,
                altura:allDogs.height.imperial,
                peso:allDogs.weight.imperial,
                años:allDogs.life_span,
                
            }
        }
        return res.json(dogId);
    }catch(error){
        next(error)
    }
})


// [] GET/temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberan obtenerlos desde
// la API externa y guardarlos en su propia base de datos
// y luego ya utilizarlos desde alli

app.get('/temperament', async (_req,res,next) => {

    try {
        let temp = await Temperamento.findAll()
        temp = JSON.stringify(temp, null ,2)
        temp = JSON.parse(temp)
        if(temp.length !== 0){
            res.send(temp)
        }else {
            // me traigo los temperamentos de la Api externa y los manipulo.     
            axios.get('https://api.thedogapi.com/v1/breeds')
            .then(async response => {
                let temperamentFinally = [];
                let temperamentdb = response.data.map(data => data.temperament);
                let newTempdb = temperamentdb.map(data => data && data.split(",")).flat();
                newTempdb.forEach(element => {
                        if(temperamentFinally.indexOf(element) < 0)
                            temperamentFinally.push(element)
                        
                });
                // inicialmento solo me voy crear 50 elementos que corresponden a tipos de temperamento
                for(let i = 0; i < 20; i++){
                    await Temperamento.create({
                        name:temperamentFinally[i]
                    })
                }
                res.send(temperamentFinally.slice(0,20))
            })
        }
    }catch(error){
        next(error)
    }

})

// POST/dog:
// Recibe los datos recolectados desde el formulario controlado
// de la ruta de creación de raza de perro por body
// crea una raza de perro en la base de datos.

// Nombre(nombre de la raza)
// -Altura (Diferenciar entre altura mínima y máxima)
// -Peso (Diferenciar entre peso mínimo y máximo)
// -Años de vida
// -Posibilidad de seleccionar/agregar uno o más temperamentos
// -Botón/Opción para crear una nueva raza de perro


app.post('/dog', async (req,res,next) => {
    const {name,altura,peso,años} = req.body;
    try{
        if(!name || !altura || !peso || !años){
            return res.json({message:'por favor ingresar todo los campos'})
        }
        let newdog = await Dog.create({
            name,
            altura, 
            peso,
            años,
            
        })
        res.json(newdog)

    }catch(error){
        next(error)
    }
})


module.exports = app;