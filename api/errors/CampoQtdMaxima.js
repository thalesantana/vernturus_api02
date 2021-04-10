class CampoQtdMaxima extends Error {
    constructor(campo){
        const mensagem = `O campo ${campo} tem que ter no máximo 64 caracteres!`
        super(mensagem);
        this.name = 'CampoQtdMaxima';
        this.idError = 5;
    }
}

module.exports = CampoQtdMaxima