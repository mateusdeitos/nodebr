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

    it('deve remover um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id);

        deepStrictEqual(resultado, expected);
    })

    it('deve atualizar um heroi pelo id', async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRADO);
        const expected = { ...DEFAULT_ITEM_CADASTRADO, nome: 'Batman', poder: 'dinheiro' };
        const resultado = await database.atualizar(expected.id, expected);
        deepStrictEqual(resultado, expected);
    })
})