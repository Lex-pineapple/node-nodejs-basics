import { createHash } from 'crypto';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files/fileToCalculateHashFor.txt');
  try {
    const file = await fsPromises.readFile(filePath);
    const hash = createHash('sha256').update(file).digest('hex');
    console.log(hash);
  } catch (error) {
    console.error(error.message);
  }
};

await calculateHash();