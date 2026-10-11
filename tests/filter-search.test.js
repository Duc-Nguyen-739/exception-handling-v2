const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// T4: khong Display Range — loc theo trang thai/loai/chu (KHOP visibleItems moi).
// Mirror logic client de khoa hanh vi loc.
function visible(list, q, k, kinds) {
  const t = String(q || '').toLowerCase();
  return list.filter((it) => {
    if (k === 'open' && it.status !== 'chua_xu_ly') return false;
    if (k === 'resolve' && it.status !== 'da_tim_bill') return false;
    if (k === 'liq' && it.status !== 'thanh_ly') return false;
    if (!kinds[it.kind]) return false;
    if (!t) return true;
    return String(it.code).toLowerCase().includes(t)
      || String(it.description || '').toLowerCase().includes(t)
      || String(it.kind || '').toLowerCase().includes(t);
  });
}
const ALL = { Box: true, Item: true };
const ITEMS = [
  { code: 'Box.05-10-2026.1', kind: 'Box', status: 'chua_xu_ly', description: 'Thung ton kho can thanh ly' },
  { code: 'Item.05-10-2026.2', kind: 'Item', status: 'da_tim_bill', description: 'Ao khoac' },
  { code: 'Box.05-09-2026.9', kind: 'Box', status: 'thanh_ly', description: 'Thung cu' },
];

test('filter-search: loc trang thai', () => {
  assert.strictEqual(visible(ITEMS, '', '', ALL).length, 3);
  assert.strictEqual(visible(ITEMS, '', 'open', ALL).length, 1);
  assert.strictEqual(visible(ITEMS, '', 'resolve', ALL).length, 1);
  assert.strictEqual(visible(ITEMS, '', 'liq', ALL).length, 1);
});

test('filter-search: loc loai Box/Item', () => {
  assert.strictEqual(visible(ITEMS, '', '', { Box: true, Item: false }).length, 2);
  assert.strictEqual(visible(ITEMS, '', '', { Box: false, Item: true }).length, 1);
  assert.strictEqual(visible(ITEMS, '', 'open', { Box: false, Item: true }).length, 0);
});

test('filter-search: chu tim thay moi (ma/mo ta/loai, khong gioi han ngay)', () => {
  assert.strictEqual(visible(ITEMS, 'thanh ly', '', ALL).length, 1);
  assert.strictEqual(visible(ITEMS, 'box.05-09', '', ALL).length, 1);
  assert.strictEqual(visible(ITEMS, 'item', '', ALL).length, 1);
  assert.strictEqual(visible(ITEMS, 'khong co', '', ALL).length, 0);
});

test('filter-search: DOM toolbar + kind chip + khong con range', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  assert.ok(!html.includes('id="rangebar"') && !html.includes('rgEdit'), 'bo Display Range');
  assert.ok(!html.includes('state.range') && !html.includes('inRangeDay_'), 'bo logic loc ngay');
  assert.ok(html.includes('id="toolbar"'), 'thieu toolbar T4');
  assert.ok(html.includes('function cycleKind_()'), 'thieu vong lap Box/Item');
  assert.ok(html.includes('BOX + ITEM'), 'thieu nhan kind mac dinh');
  assert.ok(html.includes("state.filter=this.value.trim()"), 'go van loc truc tiep');
});
