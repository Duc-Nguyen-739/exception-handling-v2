const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// KHỚP client index.html: pager mobile 20 don/trang (mockup v5 duyet).
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const MOB_PAGE = 20;
function pageSlice(list, page) {
  const pages = Math.max(1, Math.ceil(list.length / MOB_PAGE));
  const p = Math.min(Math.max(1, page), pages);
  return { page: p, pages, items: list.slice((p - 1) * MOB_PAGE, p * MOB_PAGE) };
}
function pgLabel(p) { return 'Trang ' + p + ' · 20 đơn'; }

test('mob-pager: cat lat 20 don/trang', () => {
  const list = Array.from({ length: 45 }, (_, i) => i);
  assert.strictEqual(pageSlice(list, 1).items.length, 20);
  assert.strictEqual(pageSlice(list, 3).items.length, 5);
  assert.strictEqual(pageSlice(list, 3).pages, 3);
  assert.strictEqual(pageSlice(list, 9).page, 3);
  assert.deepStrictEqual(pageSlice([], 1), { page: 1, pages: 1, items: [] });
});

test('mob-pager: nhan dung mau Trang X · 20 don', () => {
  assert.strictEqual(pgLabel(1), 'Trang 1 · 20 đơn');
  assert.ok(html.includes('Trang <b id="pgCur">1</b> · 20 đơn'));
});

test('mob-pager: DOM + CSS mobile', () => {
  assert.ok(html.includes('id="navCreate"'), 'thieu nut Tao moi giua nav');
  assert.ok(html.includes('id="gridPager"'), 'thieu thanh phan trang');
  assert.ok(html.includes('var MOB_PAGE=20'), 'thieu MOB_PAGE=20');
  assert.ok(html.includes('#btnCreateMain{display:none!important}'), 'mobile phai an +Create canh In Ma');
  assert.ok(html.includes('#rangebar .rg-l1{flex:none}'), 'Display Range mobile phai 1 hang');
  assert.ok(html.includes("document.getElementById('navCreate').onclick=document.getElementById('btnCreateTop').onclick"), 'navCreate phai mo form Create');
  assert.ok(html.includes('pgList.forEach'), 'renderGrid phai render theo lat trang');
});
