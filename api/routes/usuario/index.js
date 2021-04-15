const router = require('express').Router();
const SerializarUser = require('../../Seriealizar').SerializarUser;
const TabelaUsuario = require('../../usuarios/TabelaUsuario')
const Usuario = require('../../usuarios/Usuario');

router.get('/usuarios', async(req,res, next) =>{
    try{
        const results = await TabelaUsuario.listar();
        const serializador = new SerializarUser(
            res.getHeader('Content-Type'),
            ['nome', 'email']
        );
        usuarios = serializador.transformar(results)
        res.status(200).send(usuarios)
    } catch(error) {
        next (error)
    }
    
});

router.get('/usuarios/:id', async(req,res, next) =>{
    try{
        const id = req.params.id
        const usuario = new Usuario({id:id})
        await usuario.buscarPorId();
        const serializador = new SerializarUser(
            res.getHeader('Content-Type'),
            ['nome_servico', 'status']
        );
        res.status(200).send(serializador.transformar(usuario))
    } catch(error){
        next(error)
    }

})

router.post('/usuarios', async (req, res, next) =>{
    try{
        const reqUsuario = req.body;
        const usuario = new Usuario(reqUsuario);
        await usuario.criar();
        const serializador = new SerializarUser(
            res.getHeader('Content-Type')
        )
        res.status(201).send(serializador.transformar(usuario))
    } catch(error) {
        next (error)
    }
})

router.put('/usuarios/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const atualizar = req.body;
        const dados = Object.assign({},{id:id}, atualizar)
        const usuario = new Usuario(dados)
        await usuario.atualizar();
        const serializar = new SerializarUser(
            res.getHeader('Content-Type')
        )
        res.status(204).send(serializar.transformar(usuario))
    } catch (error) {
        next(error)
    } 
})

module.exports = router;