const Commander = require('commander');
const database = require('./database');
const Heroi = require('./heroi');

const main = async () => {
    const program = new Commander.Command();

    program
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Heroi')
        .option('-p, --poder [value]', 'Poder do Heroi')

        .option('-l, --listar', 'Listar os heróis')
        .option('-o, --obter [value]', 'Obter um heroi')
        .option('-r, --remover [value]', 'Remover um heroi')
        .option('-c, --cadastrar', 'Cadastrar um Heroi')
        .option('-a, --atualizar [value]', 'Atualizar um Heroi')

    program.parse(process.argv);

    const options = program.opts();

    try {
        if (options.atualizar) {
            const id = parseInt(options.atualizar);
            const { nome, poder } = options;
            const resultado = await database.atualizar(id, { nome, poder });
            if (!resultado) {
                console.error('Herói não foi atualizado');
                return;
            }
            console.log('Herói atualizado com sucesso!');
        }
        if (options.cadastrar) {
            const heroi = new Heroi(options);
            const resultado = await database.cadastrar(heroi);
            if (!resultado) {
                console.error('Herói não foi cadastrado');
                return;
            }
            console.log('Herói cadastrado com sucesso!');
        }

        if (options.listar) {
            const resultado = await database.listar();
            if (resultado.length === 0) {
                console.error(`Não foram encontrados Herois`);
                return;
            }
            console.table(resultado);
        }

        if (options.obter) {
            const id = parseInt(options.obter);
            const resultado = await database.listar(id);
            if (resultado.length === 0) {
                console.error(`Não foi encontrado nenhum Herói com o id ${id}`);
                return;
            }
            console.table(resultado);
        }

        if (options.remover) {
            const id = parseInt(options.remover);
            const removido = await database.remover(id)
            if (removido) {
                console.info('Herói removido com sucesso');
            } else {
                console.info(`Não foi possível remover o herói com o id ${id}`);
            }
        }
    } catch (error) {
        console.error('deu erro', error);
    }
}

main();