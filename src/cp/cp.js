import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const scriptPath = path.join(__dirname, 'files/script.js');
    const subProcess = spawn('node', [scriptPath, ...args], {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc']
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, '2', 'test']);
