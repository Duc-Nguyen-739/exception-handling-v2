const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Guard theme T4 Glass Float (gallery v6 T4): mesh 3 lop + kinh mo + bo lon.
// Card KHONG blur (perf mobile 50 card); sidebar PC giu toi.
const buf = fs.readFileSync(path.join(__dirname, '..', 'index.html'));
const html = buf.toString('utf8');
const style = html.slice(html.indexOf('<style>'), html.indexOf('</style>'));

function rulesFor(sel) {
  const out = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(style)) !== null) {
    if (m[1].split(',').some((s) => s.trim() === sel)) out.push(m[2]);
  }
  return out;
}

test('glass-theme: token T4 day du trong :root', () => {
  for (const t of [
    '--glass:rgba(255,255,255,.62)', '--glass-line:rgba(255,255,255,.8)',
    '--glass-blur:16px', '--r-md:16px', '--r-lg:24px',
    '--glass-sh:0 8px 32px rgba(35,42,69,.10)',
  ]) assert.ok(style.includes(t), 'thieu token ' + t);
});

test('glass-theme: mesh 3 lop mau T4 goc', () => {
  assert.ok(style.includes('radial-gradient(900px 500px at 12% -8%,#dfe4ff'), 'thieu lop lavender');
  assert.ok(style.includes('radial-gradient(800px 480px at 95% 8%,#ffe3f1'), 'thieu lop hong');
  assert.ok(style.includes('radial-gradient(900px 600px at 60% 110%,#d9f8ef'), 'thieu lop mint');
  assert.ok(style.includes('body{background:var(--mesh),#eef1fb'), 'body phai dung mesh');
});

test('glass-theme: header + sheet kinh mo co prefix Safari', () => {
  const hd = rulesFor('header').join(';');
  assert.ok(hd.includes('background:var(--glass)'), 'header phai nen kinh');
  assert.ok(hd.includes('backdrop-filter:blur(var(--glass-blur))'), 'header thieu blur');
  assert.ok(hd.includes('-webkit-backdrop-filter:blur(var(--glass-blur))'), 'header thieu prefix Safari');
  const sh = rulesFor('.sheet').join(';');
  assert.ok(sh.includes('background:var(--glass)'), 'sheet phai nen kinh');
  assert.ok(sh.includes('backdrop-filter:blur(var(--glass-blur))'), 'sheet thieu blur');
});

test('glass-theme: card kinh + bo lon, KHONG blur', () => {
  const cards = rulesFor('.card');
  assert.ok(cards.length > 0, 'thieu rule .card');
  assert.ok(cards.some((b) => b.includes('background:var(--glass)')), 'card phai nen kinh');
  assert.ok(cards.some((b) => b.includes('border-radius:var(--r-md)')), 'card phai bo 16px');
  for (const b of cards) assert.ok(!b.includes('backdrop-filter'), 'card cam blur: ' + b);
});

test('glass-theme: sidebar PC kinh sang T4, drawer giu vuong', () => {
  assert.ok(!style.includes('#1b2434'), 'sidebar khong con nen toi');
  assert.ok(style.includes('.bnav{position:fixed;left:0;top:0;bottom:0;width:250px'), 'sidebar giu so do');
  assert.ok(style.includes('backdrop-filter:blur(var(--glass-blur))'), 'sidebar phai blur');
  assert.ok(style.includes('height:100%;max-height:none;border-radius:0'), 'drawer desktop phai giu vuong');
  assert.ok(style.includes('@supports not ((backdrop-filter:blur(1px))'), 'thieu fallback trinh duyet cu');
});

test('glass-theme: file LF khong BOM', () => {
  assert.ok(!buf.includes(Buffer.from([13, 10])), 'cam CRLF');
  assert.ok(!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf), 'cam BOM');
});
