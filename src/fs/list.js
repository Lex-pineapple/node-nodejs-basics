import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
  const folderPath = path.join(__dirname, 'files');
  try {
    const files = await fsPromises.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (!file.isDirectory()) console.log(file.name);
    }
  } catch (error) {
    if (error.code == 'ENOENT') throw new Error('FS operation failed');
    else console.error(error.message);
  }
};

await list();