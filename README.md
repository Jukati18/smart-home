# SmartHome – Hệ thống phòng ngủ thông minh

Đồ án cuối kỳ môn **Vật lý cho Công nghệ thông tin** (HK1/2026-2027) – Nhóm 9, Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM.

SmartHome cho phép theo dõi nhiệt độ, độ ẩm, hiện diện trong phòng; điều khiển quạt, rèm từ website; xem lịch sử, biểu đồ, hỏi chatbot và nhận cảnh báo qua Telegram. Đèn LED được điều khiển bằng giọng nói **offline** ngay trên ESP32-S3 (Edge AI).

---

## 1. Phân công (để tìm code nhanh khi vấn đáp)

| Mã | Chức năng | Người phụ trách | Thư mục frontend / backend |
|---|---|---|---|
| CB-01 | Nhiệt độ, độ ẩm (DHT22) | Việt | `features/CB-01_nhiet-do-do-am` |
| NC-02 | Hiện diện (radar HLK-LD2410C) | Việt | `features/NC-02_hien-dien` |
| NC-04 | Lưu và hiển thị lịch sử hoạt động | Việt | `features/NC-04_lich-su-hoat-dong` |
| NC-10 | Website tự xây (khung chung) | Việt | `App.jsx`, `components/`, `pages/`, `styles.css`, `backend/src/server.js`, `ws/`, `mqtt/` |
| CB-02 | Bật/tắt quạt (relay) | Tùng | `features/CB-02_quat` |
| NC-01 | Giọng nói trên chip (INMP441 + WS2812) | Tùng | Chạy trên ESP32-S3, không có trang web |
| NC-08 | Chatbot (Gemini API) | Tùng | `features/NC-08_chatbot` |
| NC-11 | Dự báo nhiệt độ, phát hiện bất thường | Tùng | Worker Python + đường dự báo trên biểu đồ |
| CB-03 | Độ mở rèm (servo SG90) | K' Vớn | `features/CB-03_rem` |
| NC-05 | Biểu đồ lịch sử (Chart.js) | K' Vớn | `features/NC-05_bieu-do` |
| NC-06 | Cài đặt ngưỡng + thông báo Telegram | K' Vớn | `features/NC-06_thong-bao` |
| NC-09 | Đăng ký, đăng nhập, tài khoản (JWT) | K' Vớn | `features/NC-09_tai-khoan` |

Quy ước mã: **CB** = chức năng căn bản, **NC-xx** = chức năng nâng cao ứng với **yêu cầu số xx** trong quy định đồ án. Các thư mục `features/` chia theo mã này nên mỗi người chỉ cần mở đúng thư mục của mình. Bảng chi tiết phía frontend: [`frontend/src/features/README.md`](frontend/src/features/README.md).

---

## 2. Kiến trúc và luồng dữ liệu

```
Thiết bị Input ──► ESP32-S3 ──MQTT──► Backend (Node/Express) ──WebSocket──► Frontend (React)
Frontend (React) ──REST API──► Backend ──MQTT──► ESP32-S3 ──► Thiết bị Output
```

- **MQTT Broker:** HiveMQ Cloud (TLS, cổng 8883, có tài khoản).
- **Backend:** Express (REST) + WebSocket + MQTT client chạy chung một server, cổng `3000`.
- **Frontend:** React + Vite, cổng `5173`.
- **Cơ sở dữ liệu (kế hoạch):** MongoDB Atlas, gồm `users`, `readings` (time-series), `events`.
- **Dịch vụ ngoài (kế hoạch):** Telegram Bot API, Google Gemini API.

### Topic MQTT ("hợp đồng" giữa ESP32 và backend)

Định nghĩa trong `backend/src/config.js`. Đổi tên topic phải báo cả nhóm.

| Topic | Hướng | Chức năng |
|---|---|---|
| `smarthome/sensor/env` | ESP32 → Backend | CB-01: nhiệt độ, độ ẩm |
| `smarthome/sensor/motion` | ESP32 → Backend | NC-02: hiện diện (tuần 2) |
| `smarthome/cmd/fan` | Backend → ESP32 | CB-02 |
| `smarthome/cmd/curtain` | Backend → ESP32 | CB-03 |

Định dạng tin nhắn nhiệt độ/độ ẩm:

```json
{"temperature": 28.5, "humidity": 65.2}
```

Backend kiểm tra dữ liệu hợp lệ, tự gắn `ts` (thời gian backend, không phụ thuộc đồng hồ ESP), rồi đẩy xuống web qua WebSocket dạng `{type:"env", temperature, humidity, ts}`. `ws/hub.js` nhớ tin mới nhất theo từng `type` để người vừa mở web thấy giá trị ngay, không phải chờ 5 giây.

---

## 3. Trạng thái hiện tại

| Hạng mục | Trạng thái |
|---|---|
| CB-01 (fake-dht22 → MQTT → backend → WebSocket → thẻ nhiệt độ) | Chạy thật |
| Khung website (routing, layout, 6 trang, `ProtectedRoute`) | Xong |
| Các thẻ khác (quạt, rèm, hiện diện, lịch sử, biểu đồ, chatbot, cài đặt, tài khoản) | Mới là giao diện, dữ liệu giả, có `TODO` trong từng file |
| MQTT publish lệnh quạt/rèm | Chưa có (mới subscribe) |
| Đăng nhập | Đang dùng token giả `dev-token`, chờ NC-09 |
| Database (`backend/src/db/`) | Chưa có code |

---

## 4. Cấu trúc thư mục

```text
smart-home/
├── Quy đinh đồ án.md, SmartHome.md      # Quy định và thuyết minh dự án
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── tools/fake-dht22.js              # Giả lập ESP32 + DHT22 (CB-01)
│   └── src/
│       ├── config.js                    # Đọc .env, khai báo topic MQTT
│       ├── server.js                    # Điểm vào: Express + WebSocket + MQTT
│       ├── mqtt/client.js               # Kết nối broker, subscribe, chuyển tin cho server
│       ├── ws/hub.js                    # WebSocket: broadcast + nhớ tin mới nhất
│       ├── db/                          # (trống) MongoDB, NC-04
│       └── features/                    # Logic backend theo chức năng
│           ├── CB-01_nhiet-do-do-am/envHandler.js
│           └── CB-02, CB-03, NC-02, NC-04, NC-06, NC-08, NC-09 (đang trống)
└── frontend/
    ├── index.html, vite.config.js, package.json
    └── src/
        ├── main.jsx                     # Điểm vào React, bọc BrowserRouter
        ├── App.jsx                      # Bảng định tuyến URL → trang
        ├── styles.css
        ├── components/                  # Card, Layout (thanh menu ngang), ProtectedRoute
        ├── hooks/useSocket.js           # Hook nhận dữ liệu realtime qua WebSocket
        ├── pages/                       # Dashboard, History, Chatbot, Settings, Account, AuthPage
        └── features/                    # Component theo chức năng, mỗi người một thư mục
```

Mỗi trang trong `pages/` chỉ ghép các thẻ từ `features/`, nên code của từng thành viên nằm riêng, không lẫn vào khung chung.

---

## 5. Cài đặt và chạy

Yêu cầu: **Node.js ≥ 18** và một tài khoản MQTT broker (nhóm dùng HiveMQ Cloud).

### Backend

```bash
cd backend
npm install
```

Tạo file `.env` từ mẫu:

```bash
# macOS / Linux / Git Bash
cp .env.example .env
# Windows cmd
copy .env.example .env
```

Điền thông tin broker thật vào `.env` (xem mục 6), rồi chạy:

```bash
npm run dev     # chạy và tự khởi động lại khi sửa code (node --watch)
# hoặc
npm start       # chạy bình thường
```

Kiểm tra server: mở `http://localhost:3000/api/health`, kết quả đúng là `{"ok":true}`.

### Giả lập cảm biến (khi chưa có phần cứng)

Mở terminal mới (backend vẫn chạy ở terminal cũ):

```bash
cd backend
npm run sim
```

Script dùng chung `.env` với backend nên **bắt buộc đã điền thông tin broker**. Mỗi 5 giây nó publish một tin lên `smarthome/sensor/env`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Mở `http://localhost:5173`. Ở trang đăng nhập bấm "Đăng nhập" (token giả) để vào Dashboard, thẻ **Nhiệt độ, độ ẩm** sẽ cập nhật mỗi 5 giây.

---

## 6. Biến môi trường

`backend/.env` (mẫu: `backend/.env.example`):

```env
PORT=3000
MQTT_URL=mqtts://xxxxxxxx.s1.eu.hivemq.cloud:8883
MQTT_USERNAME=ten_user
MQTT_PASSWORD=mat_khau
```

Frontend tùy chọn, tạo `frontend/.env` nếu backend không chạy ở `localhost:3000`:

```env
VITE_WS_URL=ws://localhost:3000/ws
```

Lưu ý: `.env` đã nằm trong `.gitignore`, **không commit** mật khẩu broker. Các biến sẽ bổ sung khi các thành viên làm xong (MongoDB, JWT, Telegram, Gemini) và phải cập nhật vào cả `.env.example`.

---

## 7. Công cụ giả lập (`backend/tools/fake-dht22.js`)

- Nhiệt độ bắt đầu 28°C, độ ẩm 65%, dao động ngẫu nhiên nhẹ và bị giới hạn: nhiệt độ **20–38°C**, độ ẩm **30–90%**.
- Gửi mỗi **5 giây**, đúng chu kỳ DHT22 trong thiết kế.
- Khi có ESP32 thật thì không cần chạy file này.

---

## 8. Danh sách chức năng (theo thuyết minh)

**Căn bản**

| Mã | Mô tả |
|---|---|
| CB-01 | DHT22 → ESP32-S3 → MQTT → Backend → WebSocket → Dashboard hiển thị thời gian thực |
| CB-02 | Nút Bật/Tắt quạt trên web → Backend publish `cmd/fan` → ESP32-S3 điều khiển relay → quạt mini 5V |
| CB-03 | Thanh trượt độ mở rèm 0–100% → Backend publish `cmd/curtain` → ESP32-S3 phát PWM 50 Hz → servo SG90 |

**Nâng cao**

| Mã | Yêu cầu đề | Mô tả |
|---|---|---|
| NC-01 | Luồng Input → Output | Nhận dạng "bật đèn", "tắt đèn", "đổi màu" bằng mô hình CNN int8 trên chip, điều khiển vòng LED WS2812, không cần mạng |
| NC-02 | Input → Web | Radar 24GHz báo hiện diện; 10 phút không có chuyển động thì tắt thiết bị |
| NC-04 | Lưu dữ liệu lên Cloud | Backend gom trung bình mỗi 1 phút ghi `readings` (time-series), sự kiện ghi vào `events` (MongoDB Atlas) |
| NC-05 | Hiển thị dạng Chart | Biểu đồ nhiệt độ/độ ẩm theo 1 giờ / 24 giờ / 7 ngày (Chart.js) kèm đường dự báo NC-11 |
| NC-06 | Thông báo nhanh | Cảnh báo qua Telegram khi vượt ngưỡng, có chuyển động hoặc mất kết nối ESP32; mỗi loại chờ 10 phút mới gửi lại |
| NC-08 | Chatbot | Hỏi đáp tình trạng phòng bằng tiếng Việt tự nhiên (Gemini API, dữ liệu lấy từ MongoDB) |
| NC-09 | Bảo mật | Đăng ký/đăng nhập, mật khẩu băm bcrypt lưu MongoDB, cấp JWT |
| NC-10 | Tự xây website | Express + React, không dùng Node-RED |
| NC-11 | AI/DS tự xây | Mô hình hồi quy (scikit-learn) dự báo nhiệt độ 30 phút tới, đánh dấu bất thường, chạy trong worker Python |

---

## 9. Quy ước làm việc

- Mỗi người chỉ sửa trong thư mục `features/` của mình. Muốn sửa khung chung (`App.jsx`, `components/`, `server.js`, `ws/`, `mqtt/`) thì báo Việt.
- Thêm xử lý MQTT mới: viết handler trong `backend/src/features/<mã>/` rồi thêm một dòng định tuyến trong `server.js` (có sẵn `TODO` đánh dấu chỗ).
- Thêm topic mới: khai báo trong `config.js` và cập nhật bảng topic ở mục 2.
- Commit message viết tiếng Anh, ví dụ `feat(CB-01): ...`, `fix(NC-10): ...`, `docs: ...`.
- Không commit `.env` và `node_modules`.
