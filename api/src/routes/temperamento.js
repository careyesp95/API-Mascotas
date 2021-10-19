const express = require('express');
const {Temperamento} = require('../db')

const app = express.Router();

app.post('/createmperamento', async (req,res,next) => {
    const {name} = req.body;
    try{
        let newTemp = await Temperamento.create({
            name,         
        })
        res.json(newTemp.dataValues)

    }catch(error){
        next(error)
    }
})

module.exports = app; 