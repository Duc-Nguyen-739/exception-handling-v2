const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// Command palette T4 (KHOP mockup pal: Ctrl/CK mo, ↑↓Enter chon, Esc dong).
const html = fs.readFileSync('index.html', 'utf8');
const style = html.slice(html.indexOf('<style>'), html.indexOf('</style>'));

test('palette: DOM + mo/dong/chon', () => {
  assert.ok(html.includes('id="palModal"'), 'thieu overlay palette');
  assert.ok(html.includes('id="palIn"'), 'thieu o nhap palette');
  assert.ok(html.includes('id="pallist"'), 'thieu danh sach palette');
  assert.ok(html.includes('id="kbdPal"'), 'thieu nut ⌘K tren topbar');
  assert.ok(html.includes('function palOpen()') && html.includes('function palClose()'), 'thieu open/close');
  assert.ok(html.includes('function palActs(q)'), 'thieu danh sach lenh');
  assert.ok(html.includes("String(e.key||'').toLowerCase()==='k'"), 'thieu Ctrl/CK toggle');
  assert.ok(html.includes("document.getElementById('kbdPal').onclick=palOpen"), 'nut ⌘K phai mo');
  assert.ok(style.includes('#palModal{') && style.includes('.palit.on'), 'thieu CSS palette');
});

test('palette: du lenh tab + tac vu', () => {
  for (const s of ['navBacklog', 'navLiq', 'navPrint', 'navAccess', 'navMain', 'navFeed',
    'loadGrid({reset:true})', 'cycleKind_()']) {
    assert.ok(html.includes(s), 'palette thieu lenh ' + s);
  }
});
