const service = require('../services/swapi')
const params = process.argv.slice(3);
const search = params[0] || 'a';
const main = async () => {
    try {
        console.info('STARTING REQUEST')
        const result = await service.obterPessoas(search);
        const names = [];
        // for (let i = 0; i < result.results.length; i++) {
        //     const pessoa = result.results[i];
        //     names.push(pessoa.name);            
        // }

        // for (const i in result.results) {
        //     if (Object.hasOwnProperty.call(result.results, i)) {
        //         const pessoa = result.results[i];
        //         names.push(pessoa.name);

        //     }
        // }
        for (const pessoa of result.results) {
            names.push(pessoa.name);
        }
        console.log('RESULT: ', names);
    } catch (error) {
        console.error('erro interno', error)
    }
}
main();