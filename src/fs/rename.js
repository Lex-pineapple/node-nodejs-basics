import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const filePath = path.join(__dirname, 'files/wrongFilename.txt');
  try {
    await fsPromises.rename(filePath, path.join(__dirname, 'files/properFilename.md'));
  } catch (error) {
    if (error.code == 'ENOENT') throw new Error('FS operation failed');
    else console.error(error);
  }
};

await rename();