# Plan: header icons PC về cạnh email (mockup duyệt trước)

> Bối cảnh: sau mockup mobile-pager-icons đã port (2 nút `#btnIntro/#btnFeedback` nằm trong `#rangebar .rg-icons` cả PC + mobile — 1 code path), user yêu cầu: "2 nút 🔔 💬 này trên web PC thì để lại chỗ cũ, ngay cạnh email ... D duc.nguyenvan05. Làm mockup tôi xem".
> Phạm vi hiện tại: CHỈ làm mockup duyệt, CHƯA sửa `index.html` thật. Chờ user duyệt mockup mới port.

## Quyết định
1. Giữ nguyên behavior/logic: ID/handler giữ nguyên (`#btnIntro`, `#btnFeedback`, `#whoChip`, `#rgEdit`, `#btnPrintMain`, `#btnCreateMain`). Mockup không gọi API thật.
2. Mockup 1 file gallery `mockups/13-header-icons-pc.html` (độc lập, không gọi `google.script.run`):
   - Khung A (PC đề xuất, wide): header `.hact` = [🔔][💬][chip D duc.nguyenvan05] — icons về chỗ cũ cạnh email; `#rangebar` gọn KHÔNG có `.rg-icons` (chỉ Display Range + Edit + caption + In Mã + Create).
   - Khung B (hiện tại để so sánh, mobile 390px): `#rangebar .rg-line` giữ `.rg-icons` cạnh Edit như screenshot user gửi.
3. Port thật (SAU duyệt, commit khác trên `main`): PC (min-width:900px) icons nằm header; mobile (max-width:899px) icons nằm rangebar. Cần 2 vị trí DOM hoặc JS di chuyển theo `matchMedia` — chốt sau khi duyệt mockup (không làm trước).
4. Không đụng server/API (`Code.gs`, `api/`). Không `clasp push` (CI lo). Không commit `main` khi chưa duyệt.

## Chi tiết từng bước (mockup — chưa chạm code thật)
- B1 (mục đích: lưu vết plan): ghi file `plan.md` này (gitignored, không commit). Verify: `git status --short` không hiện `plan.md`.
- B2 (mục đích: dựng mockup): tạo `mockups/13-header-icons-pc.html` — copy subset CSS từ `index.html:12-70` (biến, header, bellbtn, whoChip, rangebar) + khung gallery + JS demo toast (click 🔔/💬/Edit/In Mã/Create chỉ toast, không API). Hành động: 1 file mới, tiếng Việt LF utf-8 không BOM. Verify: `python3 -c` kiểm tra CRLF=0, BOM=False + mở file kiểm tra 2 khung render.
- B3 (mục đích: link xem): branch preview tạm `preview/header-icons-pc` → `git add mockups/13-header-icons-pc.html` → commit → push → `gh gist create` (secret, không `--public`) → link `https://gist.githack.com/Duc-Nguyen-739/<id>/raw/<file>` → `webfetch` verify trước khi gửi. Verify: webfetch trả 200 + thấy 2 khung.
- B4 (sau duyệt): port vào `index.html` + sync `README.md` cùng commit `main`, chạy gate `§7`, rồi xóa branch preview + gist tạm (theo `§14`).

## Verify (§7 — áp dụng khi port, mockup chỉ cần B2-B3)
- Mockup: LF + BOM check + webfetch link 200.
- Port (sau): `npm test` + `npm run build:local` + `npm run test:chrome` (+ `test:py` miễn vì không đổi `api/`).

## Rủi ro
- PC header chật khi thêm 2 icons cạnh chip: mockup đo thực tế, nếu chật sẽ giảm padding `.hact`/`bellbtn` lúc port.
- Dual-placement PC/mobile cần 2 nút hoặc JS move — chốt sau duyệt để giữ 1 code path đơn giản nhất.
- Githack cache theo URL: mỗi bản sửa tạo gist mới, không edit gist cũ.
