const router = require('express').Router()
const TabelaAgemento = require('../../agendamentos/TabelaAgendamento')
const Agendamento = require('../../agendamentos/Agendamento');


router.get('/agendamentos', async (req, res) =>{
    const results = await TabelaAgemento.listar()
    res.send(JSON.stringify(results))
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

module.exports = router