const router = require('express').Router();
const  servicoUsuario = require('../../services/usuario')
const passport = require('passport')

router.get('/usuarios', passport.authenticate('bearer', {session:false}),servicoUsuario.carregarTodosUsuarios );

router.get('/usuarios/:id', passport.authenticate('bearer', {session:false}),servicoUsuario.carregarUsuario)

router.post('/usuarios', passport.authenticate('bearer', {session:false}),servicoUsuario.criarUsuario)

router.put('/usuarios/:id', passport.authenticate('bearer', {session:false}),servicoUsuario.atualizarUsuario)

module.exports = router;