const TabelaAgemento = require('../../models/agendamentos/TabelaAgendamento')
const Agendamento = require('./Agendamento');
const SerializadorAgendamento = require('../../shared/Seriealizar').SerializarAgendamento
const token = require('../../shared/gerarToken')

module.exports = {
    criarAgendamento: async (req,res, next) => {
        try{
            const reqAgendamento = req.body;
            
            const agendamento = new Agendamento(reqAgendamento)
            await agendamento.criar()
            const serializador = new SerializadorAgendamento(
                res.getHeader('Content-Type'),
                ['nome_servico', 'status']
            );
            res.status(200).send(serializador.transformar(agendamento))
        } catch (error) {
            next(error)
        } 
    },

    carregarTodosAgendamentos: async (req, res, next) =>{
        try{
            const results = await TabelaAgemento.listar()
            const serializador = new SerializadorAgendamento(
                res.getHeader('Content-Type'),
                ['nome_servico', 'status']
            );
            agendamentos = serializador.transformar(results)
            res.status(200).send(agendamentos)
        } catch (error){
            next(error)
        }
        
    },

    carregarAgendamento: async(req,res, next) =>{
        try{
            const id = req.params.id
            const agendamento = new Agendamento({id:id})
            await agendamento.buscar();
            const serializador = new SerializadorAgendamento(
                res.getHeader('Content-Type'),
                ['nome_servico', 'status']
            );
            res.status(200).send(serializador.transformar(agendamento))
        } catch(error){
            next(error)
        }
    },

    alterarAgendamento: async(req, res, next) => {
        try{
            const id = req.params.id
            const atualizar = req.body;
            const dados = Object.assign({id:id}, atualizar)
            const agendamento = new Agendamento(dados)
            await agendamento.atualizar();
            res.status(204).send()
        } catch (error) {
            next(error)
        } 
    },

    deletarAgendamento: async(req, res, next) => {
        try{
            const id = req.params.id
            const agendamento = new Agendamento({id:id})
            await agendamento.remover();
            res.status(204)
        } catch (error) {
            next(error)
        } 
    },
}