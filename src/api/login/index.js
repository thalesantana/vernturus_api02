const router = require('express').Router();
const serviceLogin = require('../../services/login')
const passaport = require('passport')

router.post('/login', passaport.authenticate('local', {session: false}), serviceLogin.login);

module.exports = router;