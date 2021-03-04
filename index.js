const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

// Get all folders within project and map it with the prefix as index
let folders = {};
fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(reg => reg.isDirectory())
    .forEach(dir => {
        const idx = dir.name.split("_")[0];
        folders[idx] = dir.name;
    });

// Get index passed as argument, e.g: yarn start 1 -> index = 1
const folderIndex = process.argv[2];

const folder = folders[folderIndex];
if (!folder) {
    throw new Error('modulo nao encontrado', folderIndex);
}

// Build path to file;
const file = path.resolve(__dirname, folder, 'index.js');

if (!fs.existsSync(file)) {
    throw new Error('arquivo não existe', file);
}

// Execute file script
const params = process.argv.slice(3);
childProcess.fork(file, params);
