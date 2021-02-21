import { resolve } from 'path';
import util from 'util';

const obterUsuario = () => {
    // erro -> reject(erro)
    // sucesso -> resolve()
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date(),
            })
        }, 1000);
    })
}

const obterTelefone = (idUsuario) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                usuario: idUsuario,
                telefone: '12345679',
                ddd: '54'
            })
        }, 1000);
    })
}

const logResolved = (result) => {
    console.log('resultado', result)
    return Promise.resolve(result);
}
const logError = (error) => {
    console.error('error', error)
}


const obterEndereco = (idUsuario, callback) => {
    setTimeout(() => {
        return callback(null, {
            usuario: idUsuario,
            rua: 'dos bobos',
            numero: 0,
        })
    }, 2000);
}

const obterEnderecoAsync = util.promisify(obterEndereco);

const main = async () => {
    try {
        const usuario = await obterUsuario();

        const promises = [
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ];

        // Execução em paralelo
        const [telefone, endereco] = await Promise.all(promises);
        logResolved({
            usuario,
            telefone,
            endereco,
        });

        // Execução sequencial agregando os resultados de todas promises
        const result = await promises
            .reduce(async (result, promise) => ({ ...await result, ...await promise }), Promise.resolve());
        console.log('sequencial: ', result);

    } catch (error) {
        logError(error);
    }
}
console.time('main')
await main();
console.timeEnd('main')