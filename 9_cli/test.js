const { deepStrictEqual } = require('assert');

const database = require('./database')
const DEFAULT_ITEM_CADASTRADO = { id: 1, nome: 'Flash', poder: 'speed' };

describe('Suite de manipulação de Herois', () => {

    before(async () => {
        await database.limparArquivo();
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const result = await database.cadastrar(DEFAULT_ITEM_CADASTRADO);
        deepStrictEqual(result, true);
    })

    it('deve pesquisar herois, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO;
        const [result] = await database.listar(expected.id);

        deepStrictEqual(result, expected);
    })
})