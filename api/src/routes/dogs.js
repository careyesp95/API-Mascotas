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
        let dogsdbPromise = Dog.findAll({
            include:Temperamento
        })

        let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds')
        apiDogs = apiDogs.data;

        return Promise.all([
            dogsdbPromise,
            apiDogs
        ]).then(response => {
            let dogsdb = response[0];
            let apiDogs = response[1];
            dogsdb = dogsdb.map(dogs => {
                console.log('Nuevamente yooooooooo',dogs.dataValues)
                return {
                    id:dogs.Id,
                    image:dogs.image,
                    temperamento:dogs.dataValues.Temperamentos[0].name,
                    name:dogs.name,
                    altura:dogs.altura,
                    peso:dogs.peso,
                    años:dogs.años
                }
            })

            apiDogs = apiDogs.map(dogs => {
                return {
                    id:dogs.id,
                    image:dogs.image.url,
                    name:dogs.name,
                    temperamento:dogs.temperament,
                    peso:dogs.weight.imperial,
                }
            })

            let allDogs = dogsdb.concat(apiDogs)
            if(allDogs) return res.json(allDogs)
        
        }) 
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
                    image:dogs.image,
                }
            })
            let apiDogs = result[1].data
            apiDogs = apiDogs.map(dogs => {
                return {
                    id:dogs.id,
                    name:dogs.name,
                    image:dogs.image.url
                }
            })
            let allDogs = dogsdb.concat(apiDogs)
            if(name){
                allDog = allDogs.find(data => data.name.toLowerCase() === name.toLowerCase())
                if(!allDogs) return res.json({mesagge:'no hay raza'})
                if(allDogs) return res.json(allDog)
            }else{
                res.send(allDogs)

            }
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
            dogId = await Dog.findByPk(idRaza, {
                include:Temperamento
            }) 
        }else {
            let dogApiResponse = await axios.get('https://api.thedogapi.com/v1/breeds')
            dogApiResponse = dogApiResponse.data
            allDogs = dogApiResponse.find(value => value.id == idRaza)
            
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
                for(let i = 0; i < temp.length; i++){
                    await Temperamento.findOrCreate({
                        where:{name:temperamentFinally[i]}
                    })
                }
                res.send(temperamentFinally)
                //res.send(temperamentFinally.slice(0,20))
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
    let {name, altura, peso, años, image, temperamento } = req.body;
    console.log('ASI LLEGO TEMPERAMENTO',temperamento)
    try{
        if(!image) image = 'https://i.imgur.com/tc5eTf9.jpg'
        if(!name || !altura || !peso || !años){
            return res.json({message:'por favor ingresar todo los campos'})
        }
        let dog = await Dog.create({
            name,
            altura, 
            peso,
            años,
            image, 
        })
        let temp = await Temperamento.findAll({
            where:{name:temperamento}
        })
        dog.addTemperamento(temp)
        res.status(200).send("Dog creado con exito")
        // Dog.create({
        //     name,
        //     altura, 
        //     peso,
        //     años,
        //     image, 
        // }).then(dog => {
        //     dog.setTemperamentos(temperamento)
        //     res.status(200).send(dog)
        // })

    }catch(error){
        next(error)
    }
})

// app.post('/createdogandtemp', async (req,res,next) => {
//     try{
//         const { dogid,temperamentid} = req.body;
//         let dogcreate = await Dog.findByPk(dogid)
//         let temperamentcreate = await Temperamento.findByPk(temperamentid)
//         let result = await dogcreate.addTemperamento(temperamentcreate)
//         console.log ('SOY EL RESULTADO DE LA ASOCIACION ', result)
//         res.json(result)

//     }catch(err){
//         next(err)
//     }
// })



module.exports = app;