import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = path.join(__dirname, 'files/fileToRead.txt');
  try {
    const fileContents = await fsPromises.readFile(filePath, 'utf8');
    console.log(fileContents);
  } catch (error) {
    if (error.code == 'ENOENT') throw new Error('FS operation failed')
    else console.error(error);
  }
};

await read();