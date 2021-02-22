const assert = require('assert');
const nock = require('nock')
const { obterPessoas } = require('../services/swapi');

describe('Star Wars Tests', async () => {
    it('deve buscar o r2d2', async () => {
        const expected = [{ nome: 'R2-D2', peso: '96' }];
        const nomeBase = `r2-d2`;

        obterPessoas(nomeBase).then(({ results }) => {
            console.log(results);
            const mapped = results.map(pessoa => ({ nome: pessoa.name, altura: pessoa.height }));
            console.log(mapped)
            assert.deepStrictEqual(mapped[0], expected);
        });
    })
})