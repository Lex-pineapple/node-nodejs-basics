import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { constants } from 'buffer';

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
  const filePath = path.join(__dirname, 'files/fresh.txt');
  const fileExists = await fsPromises.access(filePath, constants.F_OK).then(() => true).catch(() => false);
  try {
    if (fileExists) {
      throw new Error('FS operation failed');
    }
    await fsPromises.writeFile(filePath, 'I am fresh and young');
  } catch (error) {
    console.error(error);
  }
};

await create();