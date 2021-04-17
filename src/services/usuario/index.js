const SerializarUser = require('../../shared/Seriealizar').SerializarUser;
const TabelaUsuario = require('../../models/usuarios/TabelaUsuario')
const Usuario = require('../../services/usuario/Usuario');

module.exports = {
    carregarTodosUsuarios: async(req,res, next) =>{
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
        
    },

    carregarUsuario: async(req,res, next) =>{
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
    
    },

    criarUsuario: async (req, res, next) =>{
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
    },

    atualizarUsuario: async(req, res, next) => {
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
    },

    removerUsuario: async (req, res, next) => {
        try{
            const id = req.params.idUsuario;
            const usuario = new Usuario({id:id})
            await usuario.remover()
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}