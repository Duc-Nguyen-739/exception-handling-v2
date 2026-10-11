const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// T4 Glass Float: sidebar kinh sang, nav Chuc nang (6 muc) + Trang thai + Loai
// luon mo (khong nut gap), giu rail/flyout/Reset. KHOP index.html.
const html = fs.readFileSync('index.html', 'utf8');

test('sidebar-filter: nav T4 + groups luon mo + Reset co mat', () => {
  assert.ok(html.includes('id="navMain"'), 'thieu Danh sach');
  assert.ok(html.includes('id="navFeed"'), 'thieu Gop y (mo fbModal)');
  assert.ok(html.includes('id="navCount"'), 'thieu badge dem tren Danh sach');
  assert.ok(html.includes('id="fStatus"') && html.includes('id="fKind"'), 'thieu groups Trang thai/Loai');
  assert.ok(html.includes('id="sideFilterReset"'), 'thieu nut Reset');
  assert.ok(html.includes('id="sideFoot"'), 'thieu chan sidebar');
  assert.ok(!html.includes('id="sideFilterToggle"'), 'bo nut gap Bo loc (T4 luon mo)');
  assert.ok(!html.includes('id="sideFilterPanel"'), 'bo panel gap');
  assert.ok(!html.includes('class="fhead"'), 'bo CSS nut gap');
  assert.ok(html.includes('class="rwrap"'), 'Reset phai can giua (rwrap)');
});

test('sidebar-filter: CSS kinh sang desktop, mobile giu nguyen', () => {
  assert.ok(!html.includes('#1b2434'), 'sidebar khong con nen toi');
  assert.ok(html.includes('backdrop-filter:blur(var(--glass-blur))'), 'sidebar phai blur');
  assert.ok(html.includes('.side-brand,.sfilter,.railbox,.rfly,.nav-sec,#sideFoot,#navFeed{display:none}'), 'mobile phai an sidebar + flyout + nhan/nav thua');
  assert.ok(!html.includes('border-left-color:var(--o)'), 'bo vien cam muc mo');
});

test('footer-divider: vach kinh + nut ria phai can giua chieu cao', () => {
  assert.ok(html.includes('.bottom-row{display:flex;gap:8px;margin-top:auto;align-items:center;justify-content:flex-end;border-top:1px solid var(--glass-line);height:28px;padding:0 10px}'), 'o chan: vach kinh + cao 28px + nut ria phai');
  assert.ok(html.includes('.bottom-row .side-toggle{width:22px;height:22px;'), 'nut Thu/Mo 22px treo giua (B gon)');
  assert.ok(html.includes('body.rail .railbox .expand{margin-top:auto;width:100%;height:28px;'), 'o chan rail: vach + cao 28px');
});

test('rail-flyout: nut pheu + bang phu + hover wiring', () => {
  assert.ok(html.includes('id="railFlyout"'), 'thieu flyout');
  assert.ok(html.includes('id="flyStatus"') && html.includes('id="flyKind"'), 'thieu host flyout');
  assert.ok(html.includes('id="flyReset"'), 'thieu Reset flyout');
  assert.ok(html.includes('railFilterBtn'), 'thieu nut pheu rail');
  assert.ok(html.includes('.rfly.open'), 'thieu CSS mo flyout');
  assert.ok(html.includes('left:72px'), 'flyout phai sat rail');
  assert.ok(html.includes('.railbox,.rfly,.nav-sec,#sideFoot,#navFeed{display:none}'), 'mobile phai an flyout');
  assert.ok(html.includes("addEventListener('mouseenter',openRailFly)"), 'thieu hover mo');
  assert.ok(html.includes("addEventListener('mouseleave',schedRailFly)"), 'thieu hover dong');
  assert.ok(html.includes('function buildFilterInto_('), 'thieu builder SSOT');
  const i = html.indexOf("getElementById('flyReset').onclick");
  assert.ok(html.slice(i, i + 200).includes('resetKindStatus()'), 'Reset flyout tai su dung');
});
test('sidebar-filter: Reset tai su dung resetKindStatus', () => {
  assert.ok(html.includes("getElementById('sideFilterReset').onclick"), 'thieu wiring Reset');
  assert.ok(html.includes('function resetKindStatus()'), 'thieu ham goc resetKindStatus');
  const i = html.indexOf("getElementById('sideFilterReset').onclick");
  assert.ok(html.slice(i, i + 260).includes('resetKindStatus()'), 'Reset phai goi lai resetKindStatus (khong logic moi)');
});
