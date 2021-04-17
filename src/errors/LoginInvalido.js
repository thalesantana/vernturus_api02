class LoginInvalido extends Error {
    constructor(){
        super('E-mail ou senha não é valido!');
        this.name = 'LoginInvalido'
        this.idError = 7;
    }
}
    module.exports = LoginInvalido 