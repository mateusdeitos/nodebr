const { obterPessoas } = require('../services/swapi')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial === 'undefined' ? 0 : valorInicial;
    for (let i = 0; i < this.length; i++) {
        valorFinal = callback(valorFinal, this[i], this);
    }
    return valorFinal;
}

const main = async () => {

    try {
        const { results } = await obterPessoas('a');
        const alturas = results.map(pessoa => parseInt(pessoa.height))
        const total = alturas.meuReduce((prev, curr) => prev + curr);
        console.log(total);
    } catch (error) {
        console.error('deu erro', error);
    }

}

main();