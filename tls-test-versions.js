import tls from 'tls';
const host = process.argv[2] || 'ac-j8ffsxe-shard-00-00.dsiror4.mongodb.net';
const port = parseInt(process.argv[3] || '27017', 10);
const tests = [
  { name: 'default', opts: { servername: host, rejectUnauthorized: false, timeout: 8000 } },
  { name: 'TLSv1.3', opts: { servername: host, rejectUnauthorized: false, minVersion: 'TLSv1.3', maxVersion: 'TLSv1.3', timeout: 8000 } },
  { name: 'TLSv1.2', opts: { servername: host, rejectUnauthorized: false, minVersion: 'TLSv1.2', maxVersion: 'TLSv1.2', timeout: 8000 } }
];

async function runTest(test) {
  return new Promise(resolve => {
    const s = tls.connect(port, host, test.opts, () => {
      console.log(`${test.name} => connected protocol=${s.getProtocol()} authorized=${s.authorized}`);
      s.end();
      resolve();
    });
    s.on('error', e => { console.log(`${test.name} => ERROR:`, e && e.message); resolve(); });
    s.on('timeout', () => { console.log(`${test.name} => TIMEOUT`); s.destroy(); resolve(); });
  });
}

(async () => {
  for (const t of tests) {
    await runTest(t);
  }
})();
