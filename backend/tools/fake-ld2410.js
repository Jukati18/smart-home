// NC-02 (Viet): SIMULATES ESP32 + HLK-LD2410C radar, publishes presence data every 5 seconds.
// Use when hardware is not available. Not needed once the real ESP32 is connected.
import mqtt from "mqtt";
import { config } from "../src/config.js";

const client = mqtt.connect(config.mqtt.url, {
    username: config.mqtt.username, password: config.mqtt.password,
});

let present = true;
let switchAt = Date.now() + randomMs(); // when to flip the state next

// Random duration between 20 and 60 seconds
function randomMs() { return 20000 + Math.random() * 40000; }

client.on("connect", () => {
    console.log("[SIM-LD2410] connected, publishing every 5 seconds");
    setInterval(() => {
        // Flip between "someone in the room" and "empty room" at random intervals
        if (Date.now() >= switchAt) {
            present = !present;
            switchAt = Date.now() + randomMs();
        }
        const payload = JSON.stringify({
            present,
            // Radar also reports distance: 50-300 cm when present, 0 when empty
            distance: present ? Math.round(50 + Math.random() * 250) : 0,
        });
        client.publish(config.topics.motion, payload);
        console.log("[SIM-LD2410] publish", payload);
    }, 5000);
});
client.on("error", (e) => console.error("[SIM-LD2410] error:", e.message));