import path from 'path';
import fsPromises from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const source = path.join(__dirname, 'files');
  const destination = path.join(__dirname, 'files_copy');
  try {
    const copyInner = async (src, dest) => {
      const files = await fsPromises.readdir(src, { withFileTypes: true });
      await fsPromises.mkdir(dest);
      for (const file of files) {
        const srcInnerPath = path.join(src, file.name);
        const destInnerPath = path.join(dest, file.name);
        try {
          if (file.isDirectory()) {
            await copyInner(srcInnerPath, destInnerPath);
          } else {
            await fsPromises.copyFile(srcInnerPath, destInnerPath);
          }
        } catch (error) {
          if (error.code == 'EEXIST' || error.code == 'ENOENT') throw new Error('FS operation failed');
        }
      }
    }
    await copyInner(source, destination);
  } catch (error) {
    if (error.code == 'EEXIST' || error.code == 'ENOENT') throw new Error('FS operation failed');
  }
};

await copy();
