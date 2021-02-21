const { obterPessoas } = require('../services/swapi')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = [];
    for (let i = 0; i < this.length; i++) {
        novoArrayMapeado.push(callback(this[i], i))        
    }
    return novoArrayMapeado;
}

const main = async () => {

    try {
        const { results } = await obterPessoas('a');
        const names = results.meuMap((pessoa, idx) => `${idx}->${pessoa.name}`);
        console.log(names);
    } catch (error) {
        console.error('deu erro', error);
    }

}

main();