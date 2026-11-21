// CB-01 (Việt): GIẢ LẬP ESP32 + DHT22, publish dữ liệu giả mỗi 5 giây lên MQTT.
// Dùng khi chưa có phần cứng. Khi có ESP thật thì không cần chạy file này.
import mqtt from "mqtt";
import { config } from "../src/config.js";

const client = mqtt.connect(config.mqtt.url, {
    username: config.mqtt.username, password: config.mqtt.password,
});

let temp = 28, hum = 65; // giá trị khởi đầu
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

client.on("connect", () => {
    console.log("[SIM] đã kết nối, bắt đầu publish mỗi 5 giây");
    setInterval(() => {
        // Dao động ngẫu nhiên nhẹ như cảm biến thật, giữ trong khoảng hợp lý
        temp = clamp(temp + (Math.random() - 0.5) * 0.6, 20, 38);
        hum = clamp(hum + (Math.random() - 0.5) * 2, 30, 90);
        const payload = JSON.stringify({
            temperature: +temp.toFixed(1), humidity: +hum.toFixed(1),
        });
        client.publish(config.topics.env, payload);
        console.log("[SIM] publish", payload);
    }, 5000);
});
client.on("error", (e) => console.error("[SIM] lỗi:", e.message));