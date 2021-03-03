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
        await this.escreverArquivo('');
    }

    async escreverArquivo(content) {
        await writeFileAsync(this.NOME_ARQUIVO, content);
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo() || [];
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        Object.assign({ id }, { ...heroi });
        const dadosAtualizados = [...dados, heroi]
        return this.escreverArquivo(JSON.stringify(dadosAtualizados));
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo();
        if (id) {
            return dados.filter(item => item.id === id);
        }

        return dados;
    }
}

module.exports = new Database();