# Plan: port mockup mobile đã duyệt (pager cố định + icon cạnh Edit + pill badge treo)

> Bối cảnh: mockup `preview/mobile-pager-icons` đã được user duyệt ("Ok. Làm và test cẩn thận trước khi push").
> Chỉ chạm client `index.html` + sync `README.md`. Không đụng server/API (`Code.gs`, `api/`).

## Quyết định
1. Giữ nguyên behavior/logic: pager vẫn 20 đơn/trang (`MOB_PAGE`, `renderPager_` giữ nguyên), counts pill giữ nguyên, popup Intro/Feedback giữ nguyên (nút dời chỗ, handler theo ID giữ nguyên).
2. Dời 2 nút `#btnIntro/#btnFeedback` khỏi header `.hact` vào `rg-line` trong `#rangebar` (cùng hàng Edit, icon 34px). Desktop cũng theo (1 code path).
3. `#gridPager` mobile: `sticky` → `fixed` full-bleed đáy trên nav (`bottom:72px` đo từ CSS `.bnav`), gọn (10px/28px). Logic nút `‹ 1 … ›` giữ nguyên.
4. Pill mobile (`#pillsRow`): 1 dòng, không wrap, không cuộn ngang; label bọc `span.t` (ellipsis); badge `.n` treo trên đầu chữ (`absolute top:-5px`, số 8px < chữ 10px); nút refresh icon-only `↻` (JS 1 dòng). Rút kinh nghiệm mockup: `overflow:visible` cả `.pill` lẫn hàng (pill tự cắt badge).
5. Desktop pills giữ nguyên (rule mới scope `#pillsRow` trong `@media max-899`).

## Chi tiết file:line (index.html)
- E1 `566-568`: `.hact` chỉ giữ `#whoChip`.
- E2 `571`: `rg-line` thêm `</span><span class="rg-icons">` + 2 nút (giữ nguyên ID/class/title).
- E3 `~67` (sau `#rgEdit` rule): base `#rangebar .rg-icons` + `.bellbtn` boxed.
- E4 `172` (mobile block): `#gridPager` → fixed gọn; nút 28px.
- E5 trước `173`: block mobile mới cho `#pillsRow` (visible/nowrap/badge treo/last-child gọn).
- E6 `1023`: pill innerHTML thêm `span.t`.
- E7 `1026`: refresh `'↻ Mới'` → `'↻'`.
- E8 `README.md:34`: sync 3 cụm (header icons, 5 pill, pager) cùng commit.

## Verify (§7)
`npm test` + `npm run build:local` + `npm run test:chrome` (+ `test:py` không đổi api nên miễn). Kiểm tra LF + BOM sau edit.
Rủi ro: chiều cao nav ước lượng 72px cho pager — lệch thì hở/chồng nhẹ, user báo sẽ chỉnh.

## Sau push
Xóa `preview/mobile-pager-icons` (local+remote) + gist mockup tạm (theo §14: chốt → port → xóa).
