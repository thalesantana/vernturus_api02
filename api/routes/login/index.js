const router = require('express').Router();
const controllerusuario = require('../../usuarios/controllerUsuario')
const passaport = require('passport')

router.post('/login', passaport.authenticate('local', {session: false}), controllerusuario.login);

module.exports = router;