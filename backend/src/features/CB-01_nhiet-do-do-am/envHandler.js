// CB-01 (Việt): xử lý tin nhắn nhiệt độ/độ ẩm từ topic smarthome/sensor/env
// Định dạng ESP32 gửi: {"temperature": 28.5, "humidity": 65.2}
export function handleEnv(raw, broadcast) {
    let data;
    try { data = JSON.parse(raw); } catch { console.warn("[CB-01] JSON sai:", raw); return; }

    // Kiểm tra dữ liệu hợp lệ trước khi dùng (DHT22 đôi khi gửi lỗi)
    if (typeof data.temperature !== "number" || typeof data.humidity !== "number") return;

    const reading = {
        type: "env",
        temperature: data.temperature,
        humidity: data.humidity,
        ts: Date.now(), // backend tự gắn thời gian, không phụ thuộc đồng hồ ESP
    };
    broadcast(reading); // đẩy xuống web qua WebSocket

    // TODO NC-04 (Việt, tuần 2): gom trung bình mỗi 1 phút rồi ghi collection readings
    // TODO NC-06 (K' Vớn): gọi hàm kiểm tra ngưỡng ở đây
}