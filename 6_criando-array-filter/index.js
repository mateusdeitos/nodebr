const { obterPessoas } = require('../services/swapi')

Array.prototype.meuFilter = function (callback) {
    const novoArrayFiltrado = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            novoArrayFiltrado.push(this[i])
        }
    }
    return novoArrayFiltrado;
}

const main = async () => {

    try {
        const { results } = await obterPessoas('a');
        const names = results
            .meuFilter(item => item.name.toLowerCase().includes('lars'))
            .map(pessoa => pessoa.name);
        
        console.log(names);
    } catch (error) {
        console.error('deu erro', error);
    }

}

main();