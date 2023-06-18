import os from 'os';
import { Worker, isMainThread } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


const performCalculations = async () => {
  const cpusLength = os.cpus().length;
  const filePath = path.join(__dirname, 'worker.js');
  if (isMainThread) {
    Promise.allSettled(
      Array(cpusLength).fill().map((val, idx) => {
        return new Promise((resolve, reject) => {
          const worker = new Worker(filePath, {
            workerData: { num: idx + 10 }
          });
          // uncomment to check check for rejected worker
          // if (idx == 2) {
          //   reject();
          // }
          worker.on('message', resolve);
          worker.on('error', reject);
          worker.on('exit', (code) => {
            if (code !== 0) {
              reject(new Error(`Worker stopped with exit code ${code}`));
            }
          })
        })
      })
    )
    .then((workers) => {
      const data = [];
      for (let i = 0; i < workers.length; i++) {
        if (workers[i].status == 'fulfilled') data.push({status: 'resolved', data: workers[i].value});
        else data.push({status: 'error', data: null});
      }
      console.log(data);
    })
  }
};

await performCalculations();