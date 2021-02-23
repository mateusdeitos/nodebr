"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Get all folders within project and map it with the prefix as index
let folders = {};
fs_1.default.readdirSync(__dirname, { withFileTypes: true })
    .filter(reg => reg.isDirectory())
    .forEach(dir => {
    const idx = dir.name.split("_")[0];
    folders[idx] = dir.name;
});
// Get index passed as argument, e.g: yarn start 1 -> index = 1
const folderIndex = process.argv[2];
const folder = folders[folderIndex];
if (!folder) {
    throw new Error('modulo nao encontrado');
}
// Build path to file;
const file = path_1.default.resolve(__dirname, folder, 'index.js');
if (!fs_1.default.existsSync(file)) {
    throw new Error('arquivo não existe');
}
// Execute file script
const params = process.argv.slice(2);
child_process_1.default.fork(file, params);
//# sourceMappingURL=index.js.map