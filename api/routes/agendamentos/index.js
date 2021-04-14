const router = require('express').Router()
const TabelaAgemento = require('../../agendamentos/TabelaAgendamento')
const Agendamento = require('../../agendamentos/Agendamento');
const SerializadorAgendamento = require('../../Seriealizar').SerializarAgendamento


router.get('/agendamentos', async (req, res, next) =>{
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
    
});

router.get('/agendamentos/:id', async(req,res, next) =>{
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
    
})

router.post('/agendamentos', async (req,res, next) => {
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
})

router.delete('/agendamentos/:id', async(req, res, next) => {
    try{
        const id = req.params.id
        const agendamento = new Agendamento({id:id})
        await agendamento.remover();
        res.status(204)
    } catch (error) {
        next(error)
    } 
})


router.put('/agendamentos/:id', async(req, res, next) => {
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
})
module.exports = router