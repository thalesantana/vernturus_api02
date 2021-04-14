const ModeloTabelaAgendamento = require('../agendamentos/modelTabelaAgendamento');
const ModeloTabelaUsuario = require('../usuarios/modelTabelaUsuario');

ModeloTabelaAgendamento.sync()
.then(() =>{
    console.log('Tabela criada com sucesso')
})
.catch(() =>{
    console.log('Erro, tabela não criada')
});

ModeloTabelaUsuario.sync()
.then(() =>{
    console.log('Tabela criada com sucesso')
})
.catch(() =>{
    console.log('Erro, tabela não criada', error)
});