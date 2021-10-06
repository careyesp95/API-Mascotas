const express = require('express');
const {Temperamento} = require('../models/Temperamento')

const app = express.Router();

app.get('/', (req, res, next) => {
    res.json('me traigo los perros bravos')
})


module.exports = app; 