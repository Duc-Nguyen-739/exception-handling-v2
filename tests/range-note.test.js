const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// KHỚP mockup 03 duyet: mobile bo nut In Ma khoi thanh Range (dung tab In Ma),
// ghi chu duoi Range hien ca mobile + PC.
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const NOTE = 'Dữ liệu được cập nhật mỗi 5 phút. Nếu không tìm thấy, vui lòng mở rộng phạm vi thời gian này hoặc ↻ Mới.';

test('range-note: text ghi chu moi (khop poll 5 phut that)', () => {
  assert.ok(html.includes(NOTE), 'thieu ghi chu moi');
  assert.ok(!html.includes('mỗi 3 phút'), 'con sot chu 3 phut cu');
  assert.ok(html.includes(',300000)'), 'poll du lieu phai 5 phut nhu ghi chu');
});

test('range-note: mobile an In Ma, hien ghi chu', () => {
  assert.ok(html.includes('#btnPrintMain{display:none!important}'), 'mobile phai an In Ma rangebar');
  assert.ok(html.includes('#rangebar .rg-cap{display:block'), 'mobile phai hien ghi chu');
  assert.ok(html.includes("document.getElementById('btnPrintMain').onclick"), 'handler In Ma desktop phai con');
  assert.ok(html.includes('btnPrintTop') && html.includes('scanPrint'), 'nut In Ma cu phai con nguyen');
});

test('range-note: desktop giu nut + ghi chu 1 dong', () => {
  assert.ok(html.includes('white-space:nowrap}'), 'desktop ghi chu giu 1 dong');
  assert.ok(html.includes('id="btnCreateMain"'), 'desktop giu nut Create');
});
