const router = require('express').Router()
const TabelaAgemento = require('../../agendamentos/TabelaAgendamento')
const Agendamento = require('../../agendamentos/Agendamento');
const SerializadorAgendamento = require('../../Seriealizar').SerializarAgendamento


router.get('/agendamentos', async (req, res) =>{
    try{
        const results = await TabelaAgemento.listar()
        const serializador = new SerializadorAgendamento(
            res.getHeader('Content-Types'),
            ['nome_servico', 'status']
        );
        agendamentos = serializador.transformar(results)
        res.status(200).send(agendamentos)
    } catch (error){
        res.send(error)
    }
    
});

router.get('/agendamentos/:id', async(req,res) =>{
        try{
            const id = req.params.id
            const agendamento = await new Agendamento({id:id})
            await agendamento.buscar();
            res.send(JSON.stringify(agendamento))
        } catch(error){
            res.send(JSON.stringify({
                message:error.message
            }));
        }
    
})

router.post('/agendamentos', async (req,res) => {
    const reqAgendamento = req.body;
    const agendamento = new Agendamento(reqAgendamento)
    await agendamento.criar()
    res.send(JSON.stringify(agendamento))
})

router.delete('/agendamentos/:id', async(req, res) => {
    try{
        const id = req.params.id
        const agendamento = await new Agendamento({id:id})
        await agendamento.remover();
        res.status(200).json({
            mensagem: `Agendamento com ${id} removido com sucesso`
        });
    } catch (error) {
        res.send(JSON.stringify({
            message: error.message
        }))
    } 
})


router.put('/agendamentos/:id', async(req, res) => {
    try{
        const id = req.params.id
        const atualizar = req.body;
        const dados = Object.assign({id:id}, atualizar)
        const agendamento = new Agendamento(dados)
        await agendamento.atualizar();
        res.status(200).json({
            mensagem: `Agendamento com ${id} atualizado com sucesso`
        });
    } catch (error) {
        res.status(400).json({
            messagem: error.message
        })
    } 
})
module.exports = router