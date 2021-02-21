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

const obterTelefone = (usuario) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                usuario: usuario,
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

const resolverTelefone = (result) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                usuario: {
                    nome: result.usuario.nome,
                    id: result.usuario.id,
                },
                telefone: result.telefone,
                ddd: result.ddd,
            })
        }, 3000);
    })
}

const obterEndereco = (resultado, callback) => {
    setTimeout(() => {
        return callback(null, {
            resultadoAnterior: resultado,
            rua: 'dos bobos',
            numero: 0,
        })
    }, 2000);
}

const obterEnderecoAsync = util.promisify(obterEndereco);

obterUsuario()
    .then(logResolved)
    .then(obterTelefone)
    .then(logResolved)
    .then(resolverTelefone)
    .then(logResolved)
    .then(obterEnderecoAsync)
    .then(logResolved)
    .catch(logError)