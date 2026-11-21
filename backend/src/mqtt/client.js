// Kết nối MQTT Broker, subscribe topic cảm biến, chuyển tin nhắn cho server.js. NC-10 (Việt)
import mqtt from "mqtt";
import { config } from "../config.js";

export function connectMqtt(onMessage) {
    const client = mqtt.connect(config.mqtt.url, {
        username: config.mqtt.username,
        password: config.mqtt.password,
        reconnectPeriod: 3000, // mất kết nối thì tự thử lại sau 3 giây
    });

    client.on("connect", () => {
        console.log("[MQTT] đã kết nối broker");
        // Subscribe = "đăng ký nhận" mọi tin được publish lên các topic này
        client.subscribe([config.topics.env, config.topics.motion]);
    });
    client.on("message", (topic, payload) => onMessage(topic, payload.toString()));
    client.on("error", (err) => console.error("[MQTT] lỗi:", err.message));
    return client; // sau này Tùng/K' Vớn dùng client.publish(...) để gửi lệnh quạt/rèm
}