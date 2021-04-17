const modeloUsuario = require('./modelTabelaUsuario');

module.exports = {
    async listar(){
        try{
            return await modeloUsuario.findAll({
                raw: true,
            })
        } catch(error) {
            throw error
        }
        
    },

    async adicionar(usuario){
        try{
            return await modeloUsuario.create(usuario)
        } catch (error){
            throw error
        }
    },

    async buscarPorPk(id){
        try{
            usuario = await modeloUsuario.findByPk(id)
            return usuario
        } catch (error){
            throw error
        }
    },

    async buscarPorEmail(email) {
        try{
            usuario = await modeloUsuario.findOne({
                where: {
                    email: email
                }
            });
            return usuario
        } catch (error){
            throw error
        }
    },

    async atualizar(id, dados){
        try{
            return await modeloUsuario.update(
                dados,
                {
                    where: {
                        id:id
                    }
                }
            )
        } catch (error){
            throw error
        }
    },

    async remover(id) {
        try{
            return await modeloUsuario.destroy(
                {
                    where:{
                        id:id
                    }
                }
            )
        } catch (error){
            throw error
        }
    } 
}