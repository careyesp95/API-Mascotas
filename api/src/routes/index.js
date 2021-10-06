const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./dogs');
const temperamentoRoutes = require('./temperamento')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api', dogsRoutes)
router.use('/api', temperamentoRoutes)


module.exports = router;
