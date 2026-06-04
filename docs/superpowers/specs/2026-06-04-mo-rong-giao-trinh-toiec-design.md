# Thiết kế Mở rộng Giáo trình TOEIC 700+ — Giai đoạn 1, 2, 3

**Ngày tạo:** 2026-06-04
**Tác giả:** Brainstorming session với người dùng
**Trạng thái:** ĐÃ ĐƯỢC PHÊ DUYỆT — chờ chuyển sang writing-plans

---

## 1. BỐI CẢNH & VẤN ĐỀ

### File hiện tại
- **Đường dẫn:** `d:\leantoiec\GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md`
- **Dung lượng:** ~3,086 dòng
- **Cấu trúc:** 12 chương chia 3 giai đoạn
  - **GĐ1 (Chương 1-4):** Parts of Speech, Sentence Structure, Phrases & Clauses, Common Errors
  - **GĐ2 (Chương 5-7):** 12 thì, Bảng so sánh, Bài tập thì
  - **GĐ3 (Chương 8-12):** Quy tắc vị trí từ loại, Word Form, Dạng câu hỏi, Chiến thuật, 100 bài tập

### Yêu cầu của người dùng
"Viết đầy đủ hơn nữa cho file GIAI ĐOẠN 1-2-3 để tôi có thể ôn tập thật sự sâu hơn."

### Mục tiêu ôn tập sâu (đã xác nhận)
Người dùng muốn ôn tập thật sự sâu, bao gồm:
- **A:** Thêm bài tập + ví dụ TOEIC thực tế
- **B:** Phân tích lỗi sai thường gặp
- **C:** Chiến thuật làm bài + mẹo loại trừ
- **D:** Ngân hàng từ vựng theo chủ đề TOEIC

**Phạm vi đã chốt:** Mở rộng CẢ 3 giai đoạn + thêm Part 6, Part 7, Listening tips, mini test (theo xác nhận cuối cùng của người dùng "Tất cả ABCD").

---

## 2. PHƯƠNG ÁN ĐÃ CHỌN

**Phương án A: Mở rộng theo chiều ngang**

- Giữ nguyên 12 chương hiện tại
- Thêm các **phần phụ trợ** ở cuối mỗi chương theo 5 đợt
- Thứ tự triển khai: **theo từng loại nội dung** (rộng → sâu)

**Lý do chọn A:**
- Phù hợp với yêu cầu triển khai theo từng đợt
- Giữ nguyên cấu trúc 12 chương, dễ tra cứu
- Mỗi đợt ~200-400 dòng, dễ review
- Có thể dừng bất cứ lúc nào nếu đủ

---

## 3. KIẾN TRÚC TỔNG THỂ

### Vị trí chèn nội dung
- **Đợt 1, 2, 3, 4:** Thêm vào **cuối mỗi chương hiện tại (1-12)**, theo mẫu:
  ```
  ## CHƯƠNG 1: CÁC LOẠI TỪ (PARTS OF SPEECH)
  ... [nội dung gốc] ...
  ---
  ## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 1)   ← MỚI
  ### A. BÀI TẬP BỔ TRỢ
  ### B. VÍ DỤ TOEIC THỰC TẾ
  ### C. ĐÁP ÁN & GIẢI THÍCH CHI TIẾT
  ---
  ## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 2)   ← MỚI
  ...
  ```

- **Đợt 5:** Thêm vào **cuối file**, sau mục "TỔNG KẾT 3 GIAI ĐOẠN", tạo **PHẦN II** mới gồm Chương 13-18.

### Quy ước đánh số
- Dùng `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT Y)` cho nội dung mở rộng
- Dùng `### A.`, `### B.`, `### C.` cho các mục con trong mỗi phần mở rộng
- Cập nhật MỤC LỤC đầu file sau mỗi đợt

---

## 4. CHI TIẾT 5 ĐỢT MỞ RỘNG

### ĐỢT 1: BÀI TẬP BỔ TRỢ + VÍ DỤ TOEIC THỰC TẾ
**Dung lượng dự kiến:** ~300-400 dòng
**Áp dụng cho:** Chương 1-12 (12 chương)

**Nội dung mỗi chương:**
- **A. BÀI TẬP BỔ TRỢ (5-8 câu):** Multiple choice 4 đáp án, mô phỏng Part 5, độ khó tăng dần
- **B. VÍ DỤ TOEIC THỰC TẾ (8-10 câu):** Câu hoàn chỉnh kèm ngữ cảnh (email/meeting/announcement)
- **C. ĐÁP ÁN & GIẢI THÍCH CHI TIẾT:** Tại sao đúng, tại sao 3 đáp án sai

---

### ĐỢT 2: LỖI SAI THƯỜNG GẶP
**Dung lượng dự kiến:** ~200-300 dòng
**Áp dụng cho:** Chương 1-12 (12 chương)

**Nội dung mỗi chương:**
- **A. TOP 5-7 LỖI SAI PHỔ BIẾN NHẤT** với format:
  - ❌ Lỗi sai → ✅ Sửa lại
  - 📌 Nguyên nhân
  - 🎯 Quy tắc áp dụng
  - 💡 Mẹo nhớ
  - Câu tương tự trong TOEIC
- **B. BẢNG TỔNG HỢP LỖI** (compact, dễ in)

---

### ĐỢT 3: CHIẾN THUẬT LÀM BÀI NHANH
**Dung lượng dự kiến:** ~200-250 dòng
**Áp dụng cho:** Chương 1-12 (12 chương)

**Nội dung mỗi chương:**
- **A. QUY TRÌNH 5 BƯỚC GIẢI NHANH** (~5-6 giây/câu):
  1. Đọc câu (2s)
  2. Xác định vị trí trống (1s)
  3. Xác định từ loại (1s)
  4. Loại đáp án sai từ loại (1s)
  5. Chọn đáp án đúng nghĩa (1s)
- **B. MẸO LOẠI TRỪ NHANH** theo đuôi từ (-tion, -ly, -ed, -ing, -able...)
- **C. CÂU MẪU WALKTHROUGH** (3-5 câu Part 5 với phân tích từng bước)

---

### ĐỢT 4: NGÂN HÀNG TỪ VỰNG TOEIC
**Dung lượng dự kiến:** ~300-400 dòng
**Áp dụng cho:** Chương 1-12 (12 chương)

**Phân bổ chủ đề & số từ:**

| Chương | Chủ đề | Số từ |
|---|---|---|
| 1 | Office & Administration | 40 |
| 2 | Sentence Patterns | 30 |
| 3 | Phrases & Clauses (Connectors) | 35 |
| 4 | Common Errors Vocabulary | 30 |
| 5 | Tenses & Time Markers | 40 |
| 6 | Tense Comparison (Verbs) | 30 |
| 7 | Tense Practice Vocabulary | 30 |
| 8 | Word Position | 25 |
| 9 | Word Form Root Words | 50 |
| 10 | Question Types Vocabulary | 30 |
| 11 | Test Strategy Vocabulary | 30 |
| 12 | Review Vocabulary | 40 |
| **Tổng** | | **~410 từ** |

**Cấu trúc mỗi từ:**
- Từ vựng + Phiên âm IPA + Từ loại + Nghĩa tiếng Việt
- Câu ví dụ TOEIC
- Từ đồng nghĩa / trái nghĩa (nếu có)
- Ghi chú cách dùng đặc biệt (nếu có)

**2 định dạng:**
- Bảng đầy đủ (từ + phiên âm + ví dụ)
- Bảng nhanh (compact, dán tường)

---

### ĐỢT 5: PHẦN MỞ RỘNG TOEIC TOÀN DIỆN
**Dung lượng dự kiến:** ~600-800 dòng
**Vị trí:** Thêm vào CUỐI FILE, tạo PHẦN II mới (Chương 13-18)

| Chương mới | Nội dung |
|---|---|
| **13: Chiến thuật Part 5** | 5 dạng câu hỏi thường gặp, quy trình 30 câu/10 phút, phân bổ thời gian, mẹo quản lý thời gian |
| **14: Part 6 - Text Completion** | Cấu trúc đề (4 đoạn, 16 câu), 3 dạng câu hỏi, chiến thuật, 50 câu + đáp án |
| **15: Part 7 - Reading Comprehension** | Cấu trúc (54 câu, 7+ dạng), 7 dạng bài đọc, skimming/scanning, quản lý 75 phút, 30 câu mẫu |
| **16: Listening Tips (Part 1-4)** | Part 1 (Photos), Part 2 (Q-R), Part 3 (Conversations), Part 4 (Talks), chiến thuật nghe, từ vựng thường gặp |
| **17: 5 Mini Test TOEIC** | Mỗi test 100 câu (P5: 30, P6: 16, P7: 54, Listening: 100), đáp án + giải thích |
| **18: Chiến lược thi 700+** | Phân bổ thời gian, lịch ôn 30 ngày, checklist trước thi, mẹo tâm lý |

---

## 5. QUY TRÌNH THỰC THI

```
Đợt 1: Bài tập + Ví dụ        → 12 chương × ~30 dòng = ~360 dòng
         ↓ (người dùng duyệt từng chương)
Đợt 2: Lỗi sai thường gặp     → 12 chương × ~20 dòng = ~240 dòng
         ↓
Đợt 3: Chiến thuật làm bài    → 12 chương × ~20 dòng = ~240 dòng
         ↓
Đợt 4: Ngân hàng từ vựng      → 12 chương × ~30 dòng = ~360 dòng
         ↓
Đợt 5: Mở rộng TOEIC          → 6 chương mới (13-18) = ~700 dòng
         ↓
HOÀN THÀNH: file ~5,000-5,200 dòng
```

**Quy tắc trong mỗi đợt:**
- Tôi viết nội dung **từng chương một**
- Người dùng xem và duyệt **từng chương**
- Sau khi duyệt hết 12 chương → chuyển sang đợt tiếp theo
- (Đợt 5: tôi viết từng chương 13-18)

---

## 6. CẬP NHẬT MỤC LỤC

Sau mỗi đợt, tôi sẽ cập nhật **MỤC LỤC** ở đầu file để thêm link tới các phần mở rộng mới. Format dự kiến:

```
# MỤC LỤC
## PHẦN I: 3 GIAI ĐOẠN
- Chương 1-12 (nội dung gốc + mở rộng)
## PHẦN II: MỞ RỘNG TOEIC (Đợt 5)
- Chương 13-18
```

---

## 7. TIÊU CHÍ THÀNH CÔNG

Sau khi hoàn thành 5 đợt, giáo trình sẽ đạt:

✅ Mỗi chương có thêm 5-8 bài tập bổ trợ với đáp án giải thích chi tiết
✅ Mỗi chương có phần "Lỗi sai thường gặp" với 5-7 lỗi + phân tích
✅ Mỗi chương có chiến thuật làm bài 5-10 giây/câu
✅ Tổng cộng ~410 từ vựng TOEIC theo chủ đề (phiên âm, ví dụ, đồng nghĩa)
✅ Phần mở rộng Part 6, Part 7, Listening với chiến thuật + bài tập
✅ 5 mini test TOEIC 100 câu/bài với đáp án giải thích
✅ Mục lục được cập nhật đầy đủ, dễ tra cứu
✅ Người dùng có thể ôn tập "sâu" mọi khía cạnh

---

## 8. RỦI RO & GIẢM THIỂU

| Rủi ro | Giảm thiểu |
|---|---|
| File quá dài (~5,200 dòng) khó mở | Tách chương rõ ràng bằng `---` và cập nhật mục lục |
| Người dùng không kịp review hết | Duyệt từng chương, có thể dừng bất cứ lúc nào |
| Trùng lặp nội dung giữa các đợt | Tránh lặp lại lý thuyết gốc, tập trung vào mở rộng/bổ sung |
| Lỗi đánh máy / typo | Duyệt từng đoạn nhỏ, dễ phát hiện |
| Thay đổi yêu cầu giữa chừng | Triển khai theo đợt, dễ điều chỉnh |

---

## 9. BƯỚC TIẾP THEO

Sau khi spec này được phê duyệt, workflow sẽ là:

1. **Tự review spec** (placeholder scan, internal consistency, scope check, ambiguity check)
2. **Người dùng review spec** (xem file `docs/superpowers/specs/2026-06-04-mo-rong-giao-trinh-toiec-design.md`)
3. **Invoke skill `writing-plans`** để tạo implementation plan chi tiết cho từng đợt
4. **Bắt đầu Đợt 1** theo kế hoạch

---

**Trạng thái:** ✅ ĐÃ ĐƯỢC PHÊ DUYỆT (5/5 phần trong thiết kế đã được người dùng duyệt)
