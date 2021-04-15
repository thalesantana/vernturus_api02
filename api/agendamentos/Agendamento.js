const TabelaAgendamento = require('../agendamentos/TabelaAgendamento')
const CampoInvalido = require('../errors/CampoInvalido')
const DadosNaoInformados = require('../errors/DadosNaoInformados')
const NaoEncontrado = require('../errors/NaoEncontrado')
class Agendamento {
    constructor(
        {
            id,
            nome_cliente,
            nome_servico,
            status,
            data_agendamento,
            data_criacao,
            data_atualizacao
        }
    )
        {
            this.id = id;
            this.nome_cliente = nome_cliente;
            this.nome_servico = nome_servico;
            this.status = status;
            this.data_agendamento = data_agendamento;
            this.data_criacao = data_criacao;
            this.data_atualizacao = data_atualizacao;
        }

        async criar(){
            this.validar() 
            const result = await TabelaAgendamento.adicionar({
                nome_cliente:this.nome_cliente,
                nome_servico:this.nome_servico,
                status:this.status,
                data_agendamento:this.data_agendamento
            });
            this.id = result.id;
            this.data_criacao = result.data_criacao;
            this.data_atualizacao = result.data_atualizacao;
        }

        async buscar(){
            const result = await TabelaAgendamento.buscarPorPK(this.id);

            if(!result){ throw new NaoEncontrado('Agendamento')}
            
            this.nome_cliente = result.nome_cliente;
            this.nome_servico = result.nome_servico;
            this.status = result.status;
            this.data_agendamento = result.data_agendamento;
            this.data_criacao = result.data_criacao;
            this.data_atualizacao = result.data_atualizacao;
        }

        async remover() {
            await TabelaAgendamento.buscarPorPK(this.id);
            await TabelaAgendamento.remover(this.id)
        }
        
        async atualizar(){
                
                await TabelaAgendamento.buscarPorPK(this.id);
                const camposAtualizaveis = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento']
                const dadosAtualizar = {}

                camposAtualizaveis.forEach((campo) => {
                    const valor = this[campo];
                    if(typeof valor == 'string' && valor.length > 0){
                        dadosAtualizar[campo] = valor
                    }
                })
                if(Object.keys(dadosAtualizar).length === 0) {
                    throw new DadosNaoInformados()
                }
                else{
                    this.validar();
                }
                await TabelaAgendamento.atualizar(this.id, dadosAtualizar)      
        }

        validar(){
            const camposObrigatorios = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento']

            camposObrigatorios.forEach((campo) =>{
                const valor = this[campo];
                if(typeof valor !== 'string' || valor.length === 0){
                    throw new CampoInvalido(campo)
                }

            })
        }
}

module.exports = Agendamento;