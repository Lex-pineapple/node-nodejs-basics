import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const filePath = path.join(__dirname, 'files/archive.gz');
  const rs = fs.createReadStream(filePath);
  const ws = fs.createWriteStream(path.join(__dirname, 'files/fileToCompress.txt'));
  rs.on('error', (err) => {
    console.error(err.message);
  })

  rs.pipe(zlib.createUnzip()).pipe(ws);
};

await decompress();