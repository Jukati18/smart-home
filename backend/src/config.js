// Cấu hình chung: đọc .env và khai báo tên topic MQTT. NC-10 (Việt)
// Topic là "hợp đồng" giữa ESP32 và backend, đổi tên phải báo cả nhóm.
import "dotenv/config"; // nạp file .env vào process.env

export const config = {
    port: process.env.PORT || 3000,
    // NC-02: minutes without presence before "absent" actions fire (default 10, decimals allowed for testing)
    absentTimeoutMs: (Number(process.env.ABSENT_TIMEOUT_MIN) || 10) * 60 * 1000,
    mqtt: {
        url: process.env.MQTT_URL,           // mqtts:// = MQTT qua TLS (cổng 8883)
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
    },
    topics: {
        env: "smarthome/sensor/env",         // CB-01: nhiệt độ, độ ẩm (Việt)
        motion: "smarthome/sensor/motion",   // NC-02: hiện diện (Việt, tuần 2)
        fan: "smarthome/cmd/fan",            // CB-02 (Tùng)
        curtain: "smarthome/cmd/curtain",    // CB-03 (K' Vớn)
    },
};