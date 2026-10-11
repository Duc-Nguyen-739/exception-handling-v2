const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// Guard regression: Enter o o tim kiem Danh sach giu loc, chi mo chi tiet
// khi trung 100% ma (mockup 16/17 chot B). Khong xoa filter, khong mo drawer
// bang chuoi tho nhu 'test'.
function enterHandler(html) {
  const i = html.indexOf("getElementById('scanMain').addEventListener('keydown'");
  assert.ok(i >= 0, 'thieu Enter handler cua scanMain');
  return html.slice(i, i + 600);
}

test('search-enter: Enter giu tu khoa + loc lai, khong xoa filter', () => {
  const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
  const h = enterHandler(html);
  assert.ok(!h.includes("state.filter=''"), 'Enter con xoa filter (mat ket qua loc)');
  assert.ok(h.includes('state.filter=v'), 'Enter phai giu tu khoa vao filter');
  assert.ok(h.includes('syncScanClear()'), 'Enter phai dong bo nut xoa');
  assert.ok(h.includes('renderGrid()'), 'Enter phai ve lai luoi loc');
});

test('search-enter: chi mo chi tiet khi trung 100% ma', () => {
  const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
  const h = enterHandler(html);
  assert.ok(!h.includes('openDetail(v)'), 'Enter con mo drawer bang chuoi tho');
  assert.ok(h.includes('x.code===v'), 'thieu so khop ma chinh xac');
  assert.ok(/if\(m\)openDetail\(m\.code\)/.test(h), 'phai mo dung ma exact, chuoi tu do khong mo');
});
