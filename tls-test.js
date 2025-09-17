import tls from 'tls';
const host = process.argv[2] || 'ac-j8ffsxe-shard-00-00.dsiror4.mongodb.net';
const port = parseInt(process.argv[3] || '27017', 10);

const s = tls.connect(port, host, { servername: host, rejectUnauthorized: false, timeout: 8000 }, () => {
  try {
    console.log('CONNECTED: protocol=', s.getProtocol(), 'authorized=', s.authorized);
  } catch (e) {
    console.log('CONNECTED (no protocol available) authorized=', s.authorized);
  }
  s.end();
});

s.on('error', e => console.error('TLS_ERROR', e && e.message || e));
s.on('timeout', () => { console.error('TLS_TIMEOUT'); s.destroy(); });
