import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const pathToFile = path.join(__dirname, 'files/fileToRemove.txt');
  fs.unlink(pathToFile, (err) => {
    if (err) {
      if (err.code == 'ENOENT') throw new Error('FS operation failed');
    }
  })
};

await remove();