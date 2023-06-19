import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = path.join(__dirname, 'files/fileToRead.txt'); 3
  const readableStream = fs.createReadStream(filePath, 'utf-8');
  let data = '';
  readableStream.on('data', chunk => data += chunk);
  readableStream.on('end', () => {
    process.stdout.write(data);
  })
  readableStream.on('error', error => console.log('Error', error.message));
};

await read();