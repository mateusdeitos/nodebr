const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// const myEvent = 'usuario:click';

// emitter.on(myEvent, (click) => {
//     console.log('um usuário clicou', click);
// })

// let count = 0;
// setInterval(() => {
//     emitter.emit(myEvent, `${count++} vezes`);
    
// }, 1000);

const stdin = process.openStdin();
const main = () => {
    return new Promise((resolve, reject) => {
        stdin.addListener('data', value => {
            return resolve(value);
        })
    })
}

main().then(resultado => console.log(resultado.toString().trim()))