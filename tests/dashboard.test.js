const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');

// Dashboard bento T4: helpers + tiles + hanh vi bam (KHOP mockup bento/card).
const html = fs.readFileSync('index.html', 'utf8');
const style = html.slice(html.indexOf('<style>'), html.indexOf('</style>'));

test('dashboard: helpers tuoi ton hom nay/gio/feed', () => {
  for (const f of ['function hoursOf(c,code)', 'function ageTxt(h)', 'function overdue72(it)',
    'function billRate()', 'function todayIn()', 'function todayRes()',
    'function hourly()', 'function feedTop(n)', 'function relTime(ts)']) {
    assert.ok(html.includes(f), 'thieu ' + f);
  }
  assert.ok(html.includes('function renderBento()'), 'thieu renderBento');
  assert.ok(html.includes('function bentoAsync_()'), 'thieu nap async tiles');
});

test('dashboard: du 8 tiles + click loc/nhay tab', () => {
  assert.ok(html.includes('id="bento"'), 'thieu host bento');
  assert.ok(html.includes('class="bento"'), 'host bento thieu class (CSS khong khop)');
  assert.ok(html.includes('.nav-sec,#sideFoot,#navFeed{display:none}'), 'mobile phai an nhan + Gop y bottom-bar');
  assert.ok(html.includes('data-kflt="open"') && html.includes('data-kflt="resolve"'), 'tiles phai bam de loc');
  assert.ok(html.includes('data-goto="liq"') && html.includes('data-goto="print"'), 'tiles phai nhay tab');
  assert.ok(html.includes('data-goto="backlog"') && html.includes('data-goto="feed"'), 'tiles backlog/gop y');
  assert.ok(html.includes('data-feed='), 'dong timeline phai bam mo don');
  assert.ok(html.includes("gs('pollPrintJobs'") && html.includes("gs('listFeedback'") && html.includes("gs('listBacklog'"), 'tiles async dung endpoint that');
  assert.ok(html.includes('72h+'), 'thieu badge qua han 72h');
});

test('dashboard: CSS bento + card T4', () => {
  for (const s of ['.bento{', '.bt.hero-tile{', '.bars{', '.feed .f{',
    '.ftag{', '.fage{', '.ovd{', '.cinfo{', '.desc{', '.cfoot{']) {
    assert.ok(style.includes(s), 'thieu CSS ' + s);
  }
  assert.ok(html.includes("it.kind==='Box'?'Thùng':'Kiện hàng'"), 'card phai badge loai');
  assert.ok(html.includes('class="st \'+stClass(it.status)'), 'card dung chip trang thai SSOT');
});
