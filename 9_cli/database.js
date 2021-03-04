const { readFile, writeFile } = require('fs');
const { promisify } = require('util')
const { resolve } = require('path')

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {

    constructor() {
        this.NOME_ARQUIVO = resolve(__dirname, 'herois.json');
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        if (arquivo) {
            return JSON.parse(arquivo.toString());
        }

        return [];
    }

    async limparArquivo() {
        await this.escreverArquivo([]);
    }

    async escreverArquivo(content) {
        await writeFileAsync(this.NOME_ARQUIVO, content);
        return true;
    }

    async obterProximoId() {
        const dados = await this.obterDadosArquivo() || [];
        if (dados.length === 0) {
            return 1;
        }

        return (Math.max(...dados.map(item => parseInt(item.id))) || 0) + 1;

    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo() || [];
        const id = await this.obterProximoId();
        const dadosAtualizados = [...dados, { ...heroi, id }]
        return this.escreverArquivo(JSON.stringify(dadosAtualizados));
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        if (parseInt(id)) {
            return dados.filter(item => parseInt(item.id) === parseInt(id));
        }

        return dados;
    }

    async atualizar(id, heroi) {
        const dados = await this.obterDadosArquivo();

        if (!parseInt(id)) {
            throw new Error('Id não informado')
        }

        const index = dados.findIndex(item => item.id === parseInt(id));
        if (index < 0) {
            throw new Error(`Herói não encontrado com o id: ${id}`);
        }
        const updatedHeroi = { ...heroi, id };
        dados[index] = updatedHeroi;

        await this.escreverArquivo(JSON.stringify(dados));

        return updatedHeroi;

    }

    async remover(id) {
        const dados = await this.obterDadosArquivo();
        if (parseInt(id)) {
            const novosDados = dados.filter(item => parseInt(item.id) !== parseInt(id));
            return this.escreverArquivo(JSON.stringify(novosDados));
        }

        return this.limparArquivo();

    }
}

module.exports = new Database();