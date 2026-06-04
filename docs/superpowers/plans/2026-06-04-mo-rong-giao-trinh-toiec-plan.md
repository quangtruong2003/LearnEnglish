# Mở rộng Giáo trình TOEIC 700+ — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mở rộng giáo trình `GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` với bài tập, ví dụ, lỗi sai thường gặp, chiến thuật làm bài, ngân hàng từ vựng, và phần mở rộng TOEIC (Part 6/7/Listening/mini test) theo 5 đợt.

**Architecture:** Mở rộng chiều ngang — giữ nguyên 12 chương hiện tại, chèn phần mở rộng ngay sau mỗi chương (Đợt 1-4) và thêm 6 chương mới (13-18) vào cuối file (Đợt 5). Triển khai tuần tự theo 5 đợt, người dùng duyệt từng chương.

**Tech Stack:** Markdown, file editor (Read/StrReplace/Write tools)

**Spec:** `docs/superpowers/specs/2026-06-04-mo-rong-giao-trinh-toiec-design.md`

**File chính:** `d:\leantoiec\GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (~3,086 dòng, sẽ mở rộng lên ~5,000-5,200 dòng)

**File phụ:** `d:\leantoiec\docs\superpowers\specs\2026-06-04-mo-rong-giao-trinh-toiec-design.md` (spec đã duyệt)

---

## CẤU TRÚC 5 ĐỢT

| Đợt | Tên | Số task | Số dòng dự kiến |
|---|---|---|---|
| 1 | Bài tập + Ví dụ TOEIC | 12 task (1/chương) | ~360 dòng |
| 2 | Lỗi sai thường gặp | 12 task (1/chương) | ~240 dòng |
| 3 | Chiến thuật làm bài nhanh | 12 task (1/chương) | ~240 dòng |
| 4 | Ngân hàng từ vựng | 12 task (1/chương) | ~360 dòng |
| 5 | Phần mở rộng TOEIC (P6/P7/Listen/Mini test) | 6 task (1/chương 13-18) | ~700 dòng |
| **Tổng** | | **54 task** | **~1,900 dòng** |

---

## QUY TẮC CHUNG

1. **Mỗi task là 1 chương** — viết xong → người dùng duyệt → chuyển task tiếp
2. **Vị trí chèn:**
   - Đợt 1-4: Chèn ngay sau nội dung gốc của chương tương ứng
   - Đợt 5: Thêm vào cuối file, sau mục "TỔNG KẾT 3 GIAI ĐOẠN"
3. **Format markdown** dùng trong file gốc:
   - Heading chương: `## CHƯƠNG X: ...`
   - Heading mục: `### A.`, `### B.`...
   - Bảng dùng Markdown table (cú pháp `| col | col |`)
   - Bài tập đánh số: `**Câu 1:**`, `**Câu 2:**`
   - Phân cách chương: `---`
4. **Không commit git** (file không phải git repo)
5. **Sau Đợt 5 hoàn thành:** cập nhật MỤC LỤC đầu file

---

## ĐỢT 1: BÀI TẬP BỔ TRỢ + VÍ DỤ TOEIC THỰC TẾ

### Task 1.1: Mở rộng Chương 1 — Parts of Speech (Đợt 1)

**Files:**
- Modify: `d:\leantoiec\GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (chèn sau dòng 719, trước `## CHƯƠNG 2`)

**Anchor chèn:** Tìm chuỗi `## CHƯƠNG 2: CẤU TRÚC CÂU TIẾNG ANH (SENTENCE STRUCTURE)` và chèn nội dung mới NGAY TRƯỚC chuỗi này.

- [ ] **Step 1: Chèn heading "CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 1)"**

Chèn ngay trước `## CHƯƠNG 2:` nội dung sau:

```markdown
---

## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 1)

### A. BÀI TẬP BỔ TRỢ - PARTS OF SPEECH

**Câu 1:** The manager's ____ was praised by the entire team.
(A) decide
(B) decision
(C) decisive
(D) deciding

**Câu 2:** Please submit all required ____ by Friday afternoon.
(A) document
(B) documents
(C) documentary
(D) documentation

**Câu 3:** The company is seeking ____ employees for its new branch.
(A) qualify
(B) qualification
(C) qualified
(D) quality

**Câu 4:** She made an important ____ during the meeting.
(A) announce
(B) announcement
(C) announced
(D) announcing

**Câu 5:** The ____ of the new product increased sales significantly.
(A) introduce
(B) introduction
(C) introduced
(D) introducing

**Câu 6:** All employees must follow the company's ____ carefully.
(A) policy
(B) policies
(C) policying
(D) policyed

**Câu 7:** His ____ to the project was evident in his daily work.
(A) commit
(B) commitment
(C) committed
(D) committing

### B. VÍ DỤ TOEIC THỰC TẾ

**Email ngữ cảnh 1:**
> *"Dear Mr. Smith,*
> *Thank you for your **cooperation** in the recent **negotiation**. We are pleased to announce the **establishment** of a new **partnership** between our companies. The **proposed** **amendment** to the contract will be reviewed by our **legal** department. We will provide **further** **information** by next Monday.*
> *Best regards, **Management** Team"*

**Phân tích từ loại:**
- Cooperation (N) | negotiation (N) | establishment (N) | partnership (N) | proposed (Adj) | amendment (N) | legal (Adj) | further (Adj) | information (N-uncountable) | management (N)

**Email ngữ cảnh 2:**
> *"The **annual** **conference** will be held at the **Hilton** Hotel from June 15-17. All **participants** are required to **register** online before May 30. The **registration** fee includes access to all **sessions**, **materials**, and the **closing** dinner. For more **details**, please visit our website."*

**Phân tích từ loại:**
- annual (Adj) | conference (N) | Hilton (N-proper) | participants (N-pl) | register (V) | registration (N) | sessions (N-pl) | materials (N-pl/uncountable) | closing (Adj/N) | details (N-pl)

### C. ĐÁP ÁN & GIẢI THÍCH

| Câu | Đáp án | Giải thích |
|---|---|---|
| 1 | B | Sau possessive "manager's" cần DANH TỪ → "decision" (quyết định). (A) decide là V, (C) decisive là Adj, (D) deciding là V-ing |
| 2 | B | "all required ___" → danh từ SỐ NHIỀU (vì "all" + adj) → "documents" |
| 3 | C | Trước danh từ "employees" cần TÍNH TỪ → "qualified employees" (nhân viên đủ tiêu chuẩn) |
| 4 | B | "make an important ___" → cần DANH TỪ → "announcement" (thông báo) |
| 5 | B | "The ___ of the new product" → chủ ngữ là DANH TỪ → "introduction" |
| 6 | B | "company's ___" → cần DANH TỪ SỐ NHIỀU (mỗi nhân viên follow nhiều policy) → "policies" |
| 7 | B | "His ___ to the project" → sau possessive cần DANH TỪ → "commitment" (cam kết) |

---
```

- [ ] **Step 2: Xác minh file đã chèn đúng**

Đọc file, tìm dòng `## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 1)` xuất hiện trước `## CHƯƠNG 2:`. Nếu OK → tiếp.

- [ ] **Step 3: Báo cáo cho người dùng**

In ra: "✅ Đã chèn xong Đợt 1 cho Chương 1. Vui lòng mở file kiểm tra và duyệt."

- [ ] **Step 4: Đợi người dùng duyệt**

Dừng tại đây. Khi người dùng duyệt → chuyển Task 1.2.

---

### Task 1.2: Mở rộng Chương 2 — Sentence Structure (Đợt 1)

**Files:**
- Modify: `d:\leantoiec\GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (chèn sau Chương 2, trước `## CHƯƠNG 3`)

**Anchor chèn:** Tìm chuỗi `## CHƯƠNG 3: CỤM TỪ VÀ MỆNH ĐỀ (PHRASES AND CLAUSES)` và chèn NGAY TRƯỚC.

- [ ] **Step 1: Chèn heading "CHƯƠNG 2 - PHẦN MỞ RỘNG (ĐỢT 1)"**

Chèn ngay trước `## CHƯƠNG 3:` nội dung sau:

```markdown
---

## CHƯƠNG 2 - PHẦN MỞ RỘNG (ĐỢT 1)

### A. BÀI TẬP BỔ TRỢ - SENTENCE STRUCTURE

**Câu 1:** The committee ____ a new policy yesterday.
(A) announce
(B) announced
(C) announcing
(D) announcement

**Câu 2:** She ____ to the manager about the project.
(A) speaks
(B) spoken
(C) speaking
(D) spoke

**Câu 3:** The new employees ____ their training next week.
(A) start
(B) starts
(C) starting
(D) started

**Câu 4:** Mr. Tanaka ____ in the marketing department.
(A) work
(B) works
(C) working
(D) worked

**Câu 5:** The report ____ on the manager's desk this morning.
(A) is
(B) are
(C) was
(D) were

**Câu 6:** All staff ____ required to attend the meeting.
(A) is
(B) are
(C) was
(D) has

**Câu 7:** The client ____ the proposal before signing the contract.
(A) review
(B) reviews
(C) reviewed
(D) reviewing

### B. VÍ DỤ TOEIC THỰC TẾ

**Câu hoàn chỉnh 1 (S+V):**
> *"The conference **starts** at 9 AM. All participants **arrive** on time. The keynote speaker **presents** the new strategy."*
- Cấu trúc: S + V (chủ ngữ + động từ)

**Câu hoàn chỉnh 2 (S+V+O):**
> *"The manager **sent** an **email** to all staff. The HR department **scheduled** an **interview** for tomorrow. The team **completed** the **project** ahead of deadline."*
- Cấu trúc: S + V + O (chủ ngữ + động từ + tân ngữ)

**Câu hoàn chỉnh 3 (S+V+C):**
> *"Ms. Lee **is** the **director** of sales. The product **is** very **popular**. The meeting **was** a **success**."*
- Cấu trúc: S + V + C (chủ ngữ + động từ + bổ ngữ)

**Câu hoàn chỉnh 4 (S+V+O+O):**
> *"The company **gave** the employees **bonuses**. The CEO **offered** the staff **flexible hours**. The manager **showed** the clients **the new product**."*
- Cấu trúc: S + V + O + O (chủ ngữ + động từ + tân ngữ + tân ngữ)

### C. ĐÁP ÁN & GIẢI THÍCH

| Câu | Đáp án | Giải thích |
|---|---|---|
| 1 | B | Dấu hiệu "yesterday" → QUÁ KHỨ → "announced" (V2). S + V-ed |
| 2 | D | Dấu hiệu quá khứ (implied by context) → "spoke" (V2 bất quy tắc) |
| 3 | A | Dấu hiệu "next week" → TƯƠNG LAI → "start" (V nguyên mẫu vì chủ ngữ "employees" số nhiều) |
| 4 | B | Chủ ngữ "Mr. Tanaka" (số ít, ngôi 3) → động từ thêm "s" → "works" |
| 5 | C | "this morning" → QUÁ KHỨ + "the report" số ít → "was" |
| 6 | B | Chủ ngữ "All staff" số nhiều → "are". (D) has = V số ít, không hợp |
| 7 | C | Dấu hiệu "before" + thì quá khứ (implied) → "reviewed" |

---
```

- [ ] **Step 2: Xác minh file đã chèn đúng**

Đọc file, tìm `## CHƯƠNG 2 - PHẦN MỞ RỘNG (ĐỢT 1)` xuất hiện trước `## CHƯƠNG 3:`.

- [ ] **Step 3: Báo cáo cho người dùng**

In ra: "✅ Đã chèn xong Đợt 1 cho Chương 2. Vui lòng mở file kiểm tra và duyệt."

- [ ] **Step 4: Đợi người dùng duyệt**

---

### Task 1.3 đến 1.12: Mở rộng Chương 3-12 (Đợt 1)

**Cấu trúc lặp lại** cho mỗi chương còn lại (3, 4, 5, 6, 7, 8, 9, 10, 11, 12):
- Anchor: tìm `## CHƯƠNG (X+1):` và chèn trước
- Heading: `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 1)`
- 3 mục con: A (Bài tập 5-8 câu), B (Ví dụ TOEIC), C (Đáp án & giải thích)
- Mỗi chương ~30-35 dòng

**Nội dung cụ thể cho từng chương:**

| Chương | Chủ đề bài tập | Chủ đề ví dụ |
|---|---|---|
| 3 | Phrases & Clauses | Email kết nối các mệnh đề |
| 4 | Common Errors | Câu hay sai trong Part 5 |
| 5 | 12 Tenses | Email/Báo cáo với nhiều thì |
| 6 | Tense Comparison | So sánh trước-sau |
| 7 | Tense Practice | Đoạn văn có nhiều thì |
| 8 | Word Position | Câu trống cần xác định từ loại |
| 9 | Word Form | Bài tập điền dạng từ |
| 10 | Question Types | Phân loại dạng câu hỏi Part 5 |
| 11 | Test Strategy | Chiến thuật thực chiến |
| 12 | Review | Ôn tập tổng hợp |

- [ ] **Step 1-4:** Lặp lại quy trình Task 1.1 cho từng chương 3-12.

**Sau Task 1.12:** Cập nhật MỤC LỤC đầu file để thêm link tới các "PHẦN MỞ RỘNG (ĐỢT 1)".

---

## ĐỢT 2: LỖI SAI THƯỜNG GẶP

### Task 2.1 đến 2.12: Mở rộng Chương 1-12 (Đợt 2)

**Cấu trúc lặp lại** cho mỗi chương:
- Vị trí: chèn NGAY SAU phần "ĐỢT 1" của chương đó, TRƯỚC `---` phân cách chương tiếp theo
- Heading: `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 2)`
- 2 mục con:
  - **A. TOP 5-7 LỖI SAI PHỔ BIẾN NHẤT** (format: ❌ Lỗi → ✅ Đúng → 📌 Nguyên nhân → 🎯 Quy tắc → 💡 Mẹo nhớ → Câu TOEIC tương tự)
  - **B. BẢNG TỔNG HỢP LỖI** (compact table)
- Mỗi chương ~20-25 dòng

**Anchor chèn cho mỗi chương X:** Tìm `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 1)` và chèn NGAY SAU đó (nhưng trước `---` tiếp theo hoặc trước `## CHƯƠNG (X+1)`).

**Ví dụ template cho Chương 1 (Parts of Speech):**

```markdown
## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 2)

### A. TOP 7 LỖI SAI THƯỜNG GẶP - PARTS OF SPEECH

**❌ Lỗi 1:** "an information"
✅ **Đúng:** "a piece of information" / "some information"
📌 **Nguyên nhân:** "information" là danh từ KHÔNG đếm được → không dùng với a/an
🎯 **Quy tắc:** Uncountable noun: information, equipment, furniture, luggage, feedback
💡 **Mẹo nhớ:** Thử đọc "one information" → vô lý → phải dùng "a piece of"
📝 **Câu TOEIC tương tự:** "We need some ____ (inform) about the schedule." → information

**❌ Lỗi 2:** "many feedbacks"
✅ **Đúng:** "much feedback" / "a lot of feedback"
📌 **Nguyên nhân:** "feedback" không đếm được → dùng "much" thay vì "many"
🎯 **Quy tắc:** feedback (uncountable), dù many/much đều có nghĩa "nhiều" nhưng phải khớp từ loại
💡 **Mẹo nhớ:** many + countable (số nhiều) | much + uncountable
📝 **Câu TOEIC:** "The customer provided valuable ____ (feedback)." → feedback (không có s)

**❌ Lỗi 3:** "furnitures"
✅ **Đúng:** "furniture" (không có số nhiều)
📌 **Nguyên nhân:** "furniture" không đếm được → không thêm s
🎯 **Quy tắc:** furniture, equipment, luggage, baggage (uncountable)
💡 **Mẹo nhớ:** Nhớ cụm từ "a piece of furniture" (một món đồ nội thất)
📝 **Câu TOEIC:** "All the ____ (furniture) in the office was replaced." → furniture (was, không phải were)

**❌ Lỗi 4:** "childs"
✅ **Đúng:** "children"
📌 **Nguyên nhân:** "child" có số nhiều BẤT QUY TẮC → children (không phải childs)
🎯 **Quy tắc:** child → children, foot → feet, tooth → teeth, mouse → mice
💡 **Mẹo nhớ:** "child" đổi cả "i" thành "e" + "ren"
📝 **Câu TOEIC ít gặp:** Thường chỉ gặp khi nói về "children's products" - "toy for children"

**❌ Lỗi 5:** "two works of arts"
✅ **Đúng:** "two works of art"
📌 **Nguyên nhân:** "art" ở đây là N danh từ không đếm được, "works" đã ở dạng số nhiều, "art" không thêm s
🎯 **Quy tắc:** work (uncountable, nghĩa "công việc") ≠ works (số nhiều "tác phẩm")
💡 **Mẹo nhớ:** "art" chung chung → không đếm; "a work of art" (một tác phẩm nghệ thuật)
📝 **Câu TOEIC:** "The museum displays ____ (work) of contemporary art." → works of art

**❌ Lỗi 6:** "advices"
✅ **Đúng:** "advice" (không có s)
📌 **Nguyên nhân:** "advice" không đếm được
🎯 **Quy tắc:** advice, information, news, furniture, luggage (uncountable)
💡 **Mẹo nhớ:** Từ kết thúc bằng "-ice" thường không đếm được
📝 **Câu TOEIC:** "Could you give me some ____ (advise)?" → advice (không phải advices)

**❌ Lỗi 7:** "the informations"
✅ **Đúng:** "the information" (số ít)
📌 **Nguyên nhân:** uncountable noun dùng động từ số ít + không có s
🎯 **Quy tắc:** uncountable + singular verb (The information IS useful)
💡 **Mẹo nhớ:** "Many informations" (sai) | "Much information" (đúng)
📝 **Câu TOEIC:** "The ____ (inform) you provided was very helpful." → information (was, không phải were)

### B. BẢNG TỔNG HỢP LỖI - PARTS OF SPEECH

| # | Lỗi sai | Đúng | Quy tắc cốt lõi |
|---|---|---|---|
| 1 | an information | a piece of information | uncountable noun |
| 2 | many feedbacks | much feedback | uncountable |
| 3 | furnitures | furniture | uncountable |
| 4 | childs | children | irregular plural |
| 5 | advices | advice | uncountable |
| 6 | the informations | the information | uncountable + singular verb |
| 7 | two works of arts | two works of art | "art" ở đây uncountable |

---
```

- [ ] **Step 1-4 cho mỗi task 2.1-2.12:** Lặp lại quy trình, điều chỉnh nội dung theo chủ đề chương.

**Sau Task 2.12:** Cập nhật MỤC LỤC thêm "PHẦN MỞ RỘNG (ĐỢT 2)".

---

## ĐỢT 3: CHIẾN THUẬT LÀM BÀI NHANH

### Task 3.1 đến 3.12: Mở rộng Chương 1-12 (Đợt 3)

**Cấu trúc lặp lại** cho mỗi chương:
- Vị trí: chèn NGAY SAU phần "ĐỢT 2" của chương đó
- Heading: `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 3)`
- 3 mục con:
  - **A. QUY TRÌNH 5 BƯỚC GIẢI NHANH** (áp dụng cho chủ đề chương)
  - **B. MẸO LOẠI TRỪ NHANH** (theo đuôi từ liên quan)
  - **C. CÂU MẪU WALKTHROUGH** (3-5 câu Part 5 mẫu)
- Mỗi chương ~20-25 dòng

**Anchor chèn:** Tìm `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 2)` và chèn NGAY SAU đó.

**Ví dụ template cho Chương 1:**

```markdown
## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 3)

### A. QUY TRÌNH 5 BƯỚC GIẢI NHANH - PARTS OF SPEECH

**Bước 1 - ĐỌC CÂU (2 giây):**
Đọc toàn bộ câu, xác định ý chính
⚠️ Lưu ý: KHÔNG đọc từng từ - đọc theo cụm

**Bước 2 - XÁC ĐỊNH VỊ TRÍ TRỐNG (1 giây):**
Xem từ đứng trước/sau chỗ trống
→ Trước: a/the/this/that/possessive/my/your...
→ Sau: noun/verb/adj/adv

**Bước 3 - XÁC ĐỊNH TỪ LOẠI (1 giây):**
- Có possessive trước + noun vị trí → DANH TỪ
- Có "to" trước + verb vị trí → ĐỘNG TỪ nguyên mẫu
- Có "very/quite" trước → TÍNH TỪ hoặc TRẠNG TỪ
- Có noun trước → TÍNH TỪ (đứng trước noun)

**Bước 4 - LOẠI ĐÁP ÁN SAI TỪ LOẠI (1 giây):**
Nhìn 4 đáp án, loại ngay những đáp án sai từ loại
- Đuôi -tion, -sion, -ment, -ness, -ity → Noun
- Đuôi -ly → Adv (thường)
- Đuôi -ed, -ing (V3/V-ing) → Adj hoặc V
- Đuôi -able, -ible, -ive, -ous, -al, -ic → Adj

**Bước 5 - CHỌN ĐÁP ÁN ĐÚNG NGHĨA (1 giây):**
Trong các đáp án còn lại cùng từ loại, chọn đáp án khớp nghĩa

**TỔNG: ~5-6 GIÂY/CÂU** ✓

### B. MẸO LOẠI TRỪ THEO ĐUÔI TỪ

| Đuôi | Từ loại | Mẹo loại nhanh |
|---|---|---|
| -tion, -sion, -ment, -ness, -ity | Noun | Nếu vị trí KHÔNG phải danh từ → LOẠI |
| -ly | Adv (thường) | Nếu KHÔNG sau V/be → cẩn thận |
| -ed, -ing (V3/V-ing) | Adj hoặc V | Tùy vị trí |
| -able, -ible, -ive, -ous, -al, -ic | Adj | Nếu KHÔNG trước N → cẩn thận |

### C. CÂU MẪU WALKTHROUGH

**Câu mẫu TOEIC 1:** 
"The manager's ____ (decide) was based on careful analysis."
(A) decide  (B) decision  (C) decisive  (D) deciding

**Walkthrough:**
- Bước 1: Đọc → ý: Quyết định của quản lý dựa trên phân tích cẩn thận
- Bước 2: Trước: "manager's" (possessive) | Sau: "was" (to be)
- Bước 3: "manager's" + ___ + "was" → cần NOUN (chủ ngữ)
- Bước 4: 
  - (A) decide = Verb → LOẠI
  - (C) decisive = Adj → LOẠI
  - (D) deciding = V-ing (hiếm khi là N) → LOẠI
  - (B) decision = Noun → ✓
- Bước 5: Chọn **B. decision** ✓

**Câu mẫu TOEIC 2:**
"She spoke ____ at the conference."
(A) confident  (B) confidence  (C) confidently  (D) confidential

**Walkthrough:**
- Bước 1: Đọc → ý: Cô ấy nói ... tại hội nghị
- Bước 2: Trước: "spoke" (V) | Sau: "at the conference" (giới từ + N)
- Bước 3: Sau V, bổ nghĩa cho V → TRẠNG TỪ
- Bước 4:
  - (A) confident = Adj → LOẠI (Adj không bổ nghĩa cho V)
  - (B) confidence = N → LOẠI
  - (D) confidential = Adj → LOẠI
  - (C) confidently = Adv → ✓
- Bước 5: Chọn **C. confidently** ✓

---
```

- [ ] **Step 1-4 cho mỗi task 3.1-3.12:** Lặp lại, điều chỉnh theo chủ đề chương.

**Sau Task 3.12:** Cập nhật MỤC LỤC thêm "PHẦN MỞ RỘNG (ĐỢT 3)".

---

## ĐỢT 4: NGÂN HÀNG TỪ VỰNG TOEIC

### Task 4.1 đến 4.12: Mở rộng Chương 1-12 (Đợt 4)

**Cấu trúc lặp lại** cho mỗi chương:
- Vị trí: chèn NGAY SAU phần "ĐỢT 3" của chương đó
- Heading: `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 4)`
- 2 mục con:
  - **A. TỪ VỰNG THEO CHỦ ĐỀ** (bảng đầy đủ: từ + phiên âm IPA + từ loại + nghĩa + ví dụ)
  - **B. BẢNG TỪ VỰNG NHANH** (compact 2 cột, dán tường)
- Mỗi chương ~30-50 dòng (tùy số từ)

**Phân bổ từ vựng:**

| Chương | Chủ đề | Số từ |
|---|---|---|
| 1 | Office & Administration | 40 |
| 2 | Business Verbs | 30 |
| 3 | Connectors & Conjunctions | 35 |
| 4 | Common Error Words | 30 |
| 5 | Time Markers & Tense Signals | 40 |
| 6 | Action Verbs (Past/Present/Future) | 30 |
| 7 | Business Communication | 30 |
| 8 | Position Words (Adj/Adv) | 25 |
| 9 | Word Formation Roots | 50 |
| 10 | Part 5 Question Vocabulary | 30 |
| 11 | Test Strategy Terms | 30 |
| 12 | Review Vocabulary | 40 |

**Anchor chèn:** Tìm `## CHƯƠNG X - PHẦN MỞ RỘNG (ĐỢT 3)` và chèn NGAY SAU đó.

**Ví dụ template cho Chương 1:**

```markdown
## CHƯƠNG 1 - PHẦN MỞ RỘNG (ĐỢT 4)

### A. TỪ VỰNG THEO CHỦ ĐỀ - OFFICE & ADMINISTRATION

| # | Từ vựng | Phiên âm | Từ loại | Nghĩa | Ví dụ TOEIC |
|---|---|---|---|---|---|
| 1 | schedule | /ˈʃedjuːl/ | N/V | lịch trình / lên lịch | Please **schedule** a meeting for next Monday. |
| 2 | appointment | /əˈpɔɪntmənt/ | N | cuộc hẹn | I have an **appointment** with the director at 3 PM. |
| 3 | deadline | /ˈdedlaɪn/ | N | hạn chót | The project **deadline** is next Friday. |
| 4 | postpone | /pəˈspəʊn/ | V | hoãn lại | The meeting has been **postponed** until tomorrow. |
| 5 | reschedule | /ˌriːˈʃedjuːl/ | V | sắp xếp lại | We need to **reschedule** our quarterly review. |
| 6 | agenda | /əˈdʒendə/ | N | chương trình nghị sự | Please review the meeting **agenda**. |
| 7 | minutes | /ˈmɪnɪts/ | N | biên bản họp | The **minutes** from last meeting were circulated. |
| 8 | attend | /əˈtend/ | V | tham dự | All staff must **attend** the training session. |
| 9 | attendee | /əˌtenˈdiː/ | N | người tham dự | There were 50 **attendees** at the conference. |
| 10 | participate | /pɑːˈtɪsɪpeɪt/ | V | tham gia | Employees are encouraged to **participate** in the program. |
| ... | ... | ... | ... | ... | ... |

### B. BẢNH TỪ VỰNG NHANH - 40 TỪ OFFICE

| Từ | Nghĩa | | Từ | Nghĩa |
|---|---|---|---|---|
| schedule | lịch trình | | postpone | hoãn lại |
| appointment | cuộc hẹn | | deadline | hạn chót |
| meeting | cuộc họp | | agenda | chương trình nghị sự |
| minutes | biên bản | | attend | tham dự |
| conference | hội nghị | | participant | người tham gia |
| presentation | thuyết trình | | presenter | người thuyết trình |
| report | báo cáo | | submit | nộp |
| memo | thông báo nội bộ | | circulate | lưu hành |
| announcement | thông báo | | inform | thông báo |
| update | cập nhật | | notification | thông báo |
| deadline | hạn chót | | due date | ngày đến hạn |
| extension | gia hạn | | extend | gia hạn |
| postpone | hoãn | | delay | trì hoãn |
| reschedule | đổi lịch | | rearrange | sắp xếp lại |
| confirm | xác nhận | | acknowledge | thừa nhận |
| reminder | lời nhắc | | follow-up | theo dõi tiếp |
| itinerary | lịch trình chi tiết | | venue | địa điểm |
| registration | đăng ký | | register | đăng ký |
| RSVP | phản hồi lời mời | | invitation | lời mời |
| workshop | hội thảo | | seminar | hội thảo nhỏ |
| training | đào tạo | | orientation | định hướng |

---
```

- [ ] **Step 1-4 cho mỗi task 4.1-4.12:** Lặp lại, điều chỉnh theo chủ đề chương.

**Sau Task 4.12:** Cập nhật MỤC LỤC thêm "PHẦN MỞ RỘNG (ĐỢT 4)".

---

## ĐỢT 5: PHẦN MỞ RỘNG TOEIC TOÀN DIỆN

### Task 5.1: Chương 13 — Chiến thuật Part 5

**Files:**
- Modify: `d:\leantoiec\GIAI ĐOẠN 1-2-3 - Giáo trình hoàn chỉnh.md` (thêm vào CUỐI FILE, sau mục "TỔNG KẾT 3 GIAI ĐOẠN")

**Anchor chèn:** Tìm dòng cuối cùng của file (sau "Lưu ý: Giáo trình này là tài liệu học tập dành cho mục tiêu TOEIC 700+. Để đạt điểm cao hơn, cần tiếp tục luyện tập với đề thi thực tế và ôn luyện các kỹ năng Reading Comprehension, Error Recognition, và Incomplete Sentences.") và chèn SAU đó.

- [ ] **Step 1: Chèn Chương 13**

Chèn nội dung sau vào cuối file (sau dòng "Lưu ý: ..."):

```markdown
---

# PHẦN II: MỞ RỘNG TOEIC TOÀN DIỆN

## CHƯƠNG 13: CHIẾN THUẬT LÀM BÀI PART 5

### 13.1. TỔNG QUAN PART 5

**Cấu trúc Part 5:**
- 30 câu hỏi trắc nghiệm
- Thời gian: 10 phút (khoảng 20 giây/câu)
- Mỗi câu có 4 đáp án (A, B, C, D)
- Đề thi dạng Incomplete Sentences (câu không hoàn chỉnh)

**Các dạng câu hỏi:**
1. **Word Form (30-40%)** - điền dạng đúng của từ gốc
2. **Vocabulary (25-30%)** - chọn từ vựng phù hợp
3. **Grammar (30-35%)** - chọn từ/cụm từ đúng ngữ pháp
4. **Prepositions/Conjunctions (5-10%)** - chọn giới từ/liên từ

### 13.2. CHIẾN THUẬT PHÂN BỔ THỜI GIAN

| Loại câu | Thời gian | Ghi chú |
|---|---|---|
| Câu dễ (quen thuộc) | 5-10 giây | Làm ngay, không suy nghĩ |
| Câu trung bình | 15-20 giây | Áp dụng quy trình 5 bước |
| Câu khó (Word Form phức tạp) | 25-30 giây | Đánh dấu, làm sau |
| Câu bỏ qua (không biết) | 5 giây | Khoanh bừa, quay lại nếu còn thời gian |

**Mẹo:** Nếu 1 câu > 30 giây mà chưa có đáp án → BỎ QUA, làm câu khác, quay lại sau.

### 13.3. MẸO QUẢN LÝ THỜI GIAN

1. **Không dừng lại quá lâu** ở 1 câu
2. **Làm câu dễ trước**, đánh dấu câu khó
3. **Câu 1-10:** Ưu tiên làm nhanh, tạo đà tự tin
4. **Câu 11-25:** Tốc độ vừa phải, áp dụng chiến thuật
5. **Câu 26-30:** Thường khó hơn, không sao nếu mất thêm thời gian
6. **Cuối cùng:** Kiểm tra câu đánh dấu

---
```

- [ ] **Step 2: Xác minh file đã chèn đúng**

Đọc file, tìm `## CHƯƠNG 13: CHIẾN THUẬT LÀM BÀI PART 5` xuất hiện.

- [ ] **Step 3: Báo cáo cho người dùng**

In ra: "✅ Đã chèn xong Chương 13. Vui lòng mở file kiểm tra và duyệt."

- [ ] **Step 4: Đợi người dùng duyệt**

---

### Task 5.2: Chương 14 — Part 6 Text Completion

**Files:**
- Modify: file giáo trình, chèn NGAY SAU Chương 13

- [ ] **Step 1-4:** Lặp lại quy trình Task 5.1, nội dung là:

```markdown
## CHƯƠNG 14: PART 6 - TEXT COMPLETION

### 14.1. CẤU TRÚC ĐỀ PART 6

- 16 câu hỏi
- 4 đoạn văn (mỗi đoạn có 3-5 chỗ trống)
- Thời gian: 10 phút (~37 giây/câu)
- Các dạng đoạn văn: email, thư, thông báo, hướng dẫn, quảng cáo

### 14.2. 3 DẠNG CÂU HỎI

**Dạng 1: Chọn từ/cụm từ (Word/Phrase)**
- Chọn 1 từ hoặc cụm từ phù hợp vào chỗ trống
- Tương tự Part 5 nhưng trong ngữ cảnh đoạn văn

**Dạng 2: Chọn câu (Sentence)**
- Chọn 1 câu hoàn chỉnh để chèn vào đoạn văn
- Câu phải liên kết logic với câu trước và sau

**Dạng 3: Chọn đoạn văn (Paragraph)**
- Chọn 1 đoạn văn ngắn để thêm vào vị trí thích hợp
- Thường là đoạn giới thiệu, kết luận, hoặc chuyển ý

### 14.3. CHIẾN THUẬT LÀM BÀI

1. **Đọc toàn bộ đoạn văn trước** (~30 giây/đoạn)
2. **Xác định chủ đề** và mục đích đoạn văn
3. **Đoán nội dung chỗ trống** TRƯỚC khi nhìn đáp án
4. **Loại đáp án** không phù hợp về ngữ pháp/nghĩa
5. **Kiểm tra liên kết** với câu trước và sau

### 14.4. 50 CÂU PART 6 MẪU + ĐÁP ÁN

[Câu 1-50: Format email/letter/announcement có chỗ trống, 4 đáp án, đáp án ở cuối]

---
```

---

### Task 5.3: Chương 15 — Part 7 Reading Comprehension

**Files:**
- Modify: file giáo trình, chèn NGAY SAU Chương 14

- [ ] **Step 1-4:** Lặp lại quy trình, nội dung:

```markdown
## CHƯƠNG 15: PART 7 - READING COMPREHENSION

### 15.1. CẤU TRÚC ĐỀ PART 7

- 54 câu hỏi
- Thời gian: 75 phút (~83 giây/câu)
- 7+ dạng bài đọc:
  - Single passage (29 câu): 1 đoạn văn, 2-5 câu hỏi
  - Double passage (10 câu): 2 đoạn văn liên quan
  - Triple passage (15 câu): 3 đoạn văn liên quan

### 15.2. CÁC DẠNG BÀI ĐỌC

- Email/Letter
- Advertisement
- Notice/Announcement
- Article/Report
- Form/Schedule
- Memo

### 15.3. CHIẾN THUẬT ĐỌC NHANH

**Skimming (Đọc lướt):**
- Đọc nhanh toàn bộ đoạn văn
- Xác định chủ đề chính
- Tìm ý chính của từng đoạn

**Scanning (Đọc quét):**
- Tìm thông tin cụ thể (số liệu, ngày tháng, tên riêng)
- Áp dụng khi câu hỏi yêu cầu chi tiết

### 15.4. CHIẾN THUẬT LÀM BÀI

1. **Đọc câu hỏi trước** (~10 giây)
2. **Xác định thông tin cần tìm** trong đoạn văn
3. **Scanning** tìm vị trí có thông tin
4. **Đọc kỹ** đoạn đó (~30 giây)
5. **Loại đáp án sai** và chọn đáp án đúng

### 15.5. 30 CÂU PART 7 MẪU

[Câu 1-30: Đoạn văn + 2-4 câu hỏi + đáp án]

---
```

---

### Task 5.4: Chương 16 — Listening Tips

**Files:**
- Modify: file giáo trình, chèn NGAY SAU Chương 15

- [ ] **Step 1-4:** Lặp lại quy trình, nội dung:

```markdown
## CHƯƠNG 16: LISTENING TIPS (PART 1-4)

### 16.1. TỔNG QUAN LISTENING

- 100 câu hỏi
- Thời gian: 45 phút
- 4 phần: Photos, Question-Response, Conversations, Talks

### 16.2. PART 1 - PHOTOGRAPHS (6 câu)

**Mô tả:** Chọn mô tả đúng nhất cho bức ảnh
**Chiến thuật:**
- Nhìn ảnh trước khi nghe
- Dự đoán nội dung (vị trí, hành động, đối tượng)
- Loại đáp án không khớp ảnh

### 16.3. PART 2 - QUESTION-RESPONSE (25 câu)

**Mô tả:** Chọn câu trả lời phù hợp nhất
**Chiến thuật:**
- Nghe câu hỏi kỹ (WHO/WHAT/WHERE/WHEN/WHY/HOW)
- Đáp án sai thường lặp từ câu hỏi
- Loại đáp án vô lý/ngữ pháp sai

### 16.4. PART 3 - CONVERSATIONS (39 câu)

**Mô tả:** Nghe hội thoại ngắn, trả lời câu hỏi
**Chiến thuật:**
- Đọc câu hỏi trước khi nghe
- Ghi chú nhanh (tên, số, ý chính)
- Đáp án thường là paraphrase, không lặp từ

### 16.5. PART 4 - TALKS (30 câu)

**Mô tả:** Nghe bài nói/bài phát biểu, trả lời câu hỏi
**Chiến thuật:**
- Đoán chủ đề từ tiêu đề
- Chú ý từ khóa chuyển tiếp (However, Therefore, In addition)
- Ghi chú thông tin chi tiết (ngày, giờ, số liệu)

### 16.6. TỪ VỰNG LISTENING THƯỜNG GẶP

[Bảng 50-80 từ/cụm từ thường xuất hiện trong Listening TOEIC]

---
```

---

### Task 5.5: Chương 17 — 5 Mini Test TOEIC

**Files:**
- Modify: file giáo trình, chèn NGAY SAU Chương 16

- [ ] **Step 1-4:** Lặp lại quy trình, nội dung:

```markdown
## CHƯƠNG 17: 5 MINI TEST TOEIC (MỖI TEST 100 CÂU)

### MINI TEST 1

#### PART 5: INCOMPLETE SENTENCES (30 câu)

**Câu 1-30:** [Câu Part 5 mô phỏng TOEIC, 4 đáp án mỗi câu]

#### PART 6: TEXT COMPLETION (16 câu)

**Câu 31-46:** [4 đoạn văn có chỗ trống, 4 đáp án mỗi câu]

#### PART 7: READING COMPREHENSION (54 câu)

**Câu 47-100:** [Đoạn văn + câu hỏi mô phỏng TOEIC]

#### ĐÁP ÁN MINI TEST 1

[Bảng đáp án + giải thích chi tiết]

### MINI TEST 2, 3, 4, 5

[Tương tự Mini Test 1]

---
```

**Ghi chú:** Mỗi mini test 100 câu, cần viết cô đọng nhưng đầy đủ. Nội dung Part 5 có thể tham khảo lại các bài tập ở Đợt 1-4.

---

### Task 5.6: Chương 18 — Chiến lược thi TOEIC 700+

**Files:**
- Modify: file giáo trình, chèn NGAY SAU Chương 17 (chương cuối cùng)

- [ ] **Step 1-4:** Lặp lại quy trình, nội dung:

```markdown
## CHƯƠNG 18: CHIẾN LƯỢC THI TOEIC 700+

### 18.1. PHÂN BỔ THỜI GIAN TOÀN BÀI THI

| Phần | Thời gian | Số câu | Ghi chú |
|---|---|---|---|
| Listening | 45 phút | 100 | Nghe 1 lần |
| Reading | 75 phút | 100 | Tự đọc |
| **Tổng** | **120 phút** | **200** | ~36 giây/câu |

### 18.2. LỊCH ÔN TẬP 30 NGÀY

| Ngày | Nội dung ôn |
|---|---|
| 1-3 | GĐ1: Parts of Speech, Sentence Structure |
| 4-6 | GĐ2: 12 Thì, So sánh thì |
| 7-10 | GĐ3: Word Form, Quy tắc vị trí từ loại |
| 11-14 | Bài tập Part 5 (Đợt 1) + Lỗi sai thường gặp (Đợt 2) |
| 15-18 | Chiến thuật làm bài (Đợt 3) + Từ vựng (Đợt 4) |
| 19-22 | Part 6 Text Completion + Part 7 Reading |
| 23-25 | Listening Part 1-4 |
| 26-28 | Làm Mini Test 1-3 (1 test/ngày) |
| 29 | Mini Test 4 + xem lại đáp án |
| 30 | Mini Test 5 + ôn từ vựng cuối |

### 18.3. CHECKLIST TRƯỚC NGÀY THI

- [ ] Ngủ đủ giấc 7-8 tiếng đêm trước
- [ ] Chuẩn bị CMND/CCCD + 2 bút chì + gọt bút
- [ ] Đến điểm thi trước 30 phút
- [ ] Ăn sáng nhẹ, tránh đồ uống có caffeine
- [ ] Không học thêm đêm trước (chỉ đọc lại cheat sheet)

### 18.4. MẸO TÂM LÝ PHÒNG THI

1. **Bình tĩnh, tự tin** — đã chuẩn bị kỹ
2. **Đọc kỹ câu hỏi** trước khi chọn
3. **Không hoảng** nếu gặp câu khó → bỏ qua, làm câu khác
4. **Quản lý thời gian** theo chiến thuật đã học
5. **Kiểm tra lại** 5 phút cuối (Part 5 đã đánh dấu)

### 18.5. MỤC TIÊU ĐIỂM SỐ

- **500+:** Nắm chắc ngữ pháp cơ bản, từ vựng thông dụng
- **600+:** Làm chủ Part 5, biết cách dùng Word Form
- **700+:** Thành thạo tất cả dạng bài, quản lý thời gian tốt
- **800+:** Cần Part 6, 7 nâng cao + Listening chính xác
- **900+:** Bổ sung thêm từ vựng chuyên ngành, luyện đề nhiều

---

## TỔNG KẾT

**Toàn bộ giáo trình bao gồm:**
- 12 chương gốc (nội dung lý thuyết)
- 48 phần mở rộng (4 đợt × 12 chương) — bài tập, lỗi sai, chiến thuật, từ vựng
- 6 chương mới (13-18) — Part 5 strategy, Part 6, Part 7, Listening, Mini test, Chiến lược thi

**Tổng dung lượng cuối:** ~5,000-5,200 dòng

---
```

- [ ] **Step 5: Cập nhật MỤC LỤC**

Sau khi hoàn thành Đợt 5, cập nhật MỤC LỤC đầu file với cấu trúc mới:

```markdown
# MỤC LỤC

## PHẦN I: 3 GIAI ĐOẠN NỀN TẢNG
### Giai đoạn 1 — Nền tảng Ngữ pháp
- Chương 1: Các loại từ (Parts of Speech)
  - Phần mở rộng (Đợt 1): Bài tập + Ví dụ
  - Phần mở rộng (Đợt 2): Lỗi sai thường gặp
  - Phần mở rộng (Đợt 3): Chiến thuật làm bài
  - Phần mở rộng (Đợt 4): Từ vựng
- Chương 2: Cấu trúc câu...
[... tương tự cho Chương 2-12]

## PHẦN II: MỞ RỘNG TOEIC TOÀN DIỆN (Đợt 5)
- Chương 13: Chiến thuật Part 5
- Chương 14: Part 6 - Text Completion
- Chương 15: Part 7 - Reading Comprehension
- Chương 16: Listening Tips (Part 1-4)
- Chương 17: 5 Mini Test TOEIC
- Chương 18: Chiến lược thi 700+
```

---

## TIÊU CHÍ HOÀN THÀNH

Sau khi thực thi xong tất cả 54 task:

✅ Tất cả 12 chương có 4 phần mở rộng (Đợt 1-4)
✅ 6 chương mới (13-18) được thêm vào PHẦN II
✅ MỤC LỤC đầu file được cập nhật đầy đủ
✅ Tổng file: ~5,000-5,200 dòng
✅ Người dùng đã duyệt từng phần trong quá trình thực thi
✅ Có thể in ra / đọc lại để ôn tập sâu

---

## GHI CHÚ QUAN TRỌNG

1. **Mỗi task phải chờ người dùng duyệt** trước khi sang task tiếp
2. **Không commit git** (file không phải git repo)
3. **Nếu gặp lỗi format** khi chèn, dùng Read tool để kiểm tra
4. **Backup file gốc** (đã có sẵn ở git history nếu cần, hoặc copy trước khi bắt đầu)
5. **Khi người dùng yêu cầu thay đổi**, điều chỉnh task tương ứng

---

**Trạng thái plan:** ✅ SẴN SÀNG THỰC THI
