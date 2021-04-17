const express = require('express');
const routesAgendamento = require('../api/agendamentos');
const routesLogin = require ('../api/login')
const routesUsuario = require('../api/usuario')
const FormatoInvalido = require('../errors/FormatoInvalido')
const FormatosValidos = require('../shared/Seriealizar').FormatoValidos;
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');
const SerializarErro  = require('../shared/Seriealizar').SerializarErro;
const DadosNaoInformados = require('../errors/DadosNaoInformados')
const passport = require('./autenticacao')

module.exports = () => {
    const app = express()

    app.use((req, res, next) =>{
        let formatoSolicitado= req.header('Accept');
        if(formatoSolicitado  === '*/*'){
            formatoSolicitado ='application/json'
        }
        if(FormatosValidos.indexOf(formatoSolicitado) === -1){
            res.status(406);
            return res.send()
        }

        res.setHeader('Content-Type', formatoSolicitado);
        next();
    })
    app.use(express.json())
    app.use('/api', routesAgendamento)
    app.use('/api', routesUsuario)
    app.use('/api', routesLogin)
    app.use((error, req, res, next) =>{
        let status = 500;
        if(error instanceof CampoInvalido ||  error instanceof DadosNaoInformados){
            status = 400
        }
        if(error instanceof NaoEncontrado){
            status = 404
        }
        if(error instanceof FormatoInvalido){
            status = 406
        }  
        let serializarError = new SerializarErro(
            res.getHeader('Content-Type')
        )
        res.status(status).send(
            serializarError.transformar({
                id: error.idError,
                mensagem: error.message
            })
        )
    })
    return app
}