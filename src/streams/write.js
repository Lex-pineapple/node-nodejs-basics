import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const outputPath = path.join(__dirname, 'files/fileToWrite.txt');
  const stream = fs.createWriteStream(outputPath);
  fs.writeFile(outputPath, '', (err) => {
    if (err) console.error(err);
  });
  process.stdout.write('To finish writing to file and exit the process write \'exit\'\n');
  
  const rl = readline.createInterface({input: process.stdin});

  rl.on('line', (input) => {
    if (input == 'exit') {
      process.stdout.write('Goodbye!');
      rl.close();
    } else {
      fs.appendFile(outputPath, (input + '\n'), (err) => {
        if (err) console.error(err.message);
      });
    }
  });

  process.on('SIGINT', () => {
    process.stdout.write('Goodbye!');
    rl.close();
  });
};

await write();