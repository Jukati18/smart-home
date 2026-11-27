// Entry point of the backend: attaches Express (REST) + WebSocket + MQTT to one server. NC-10 (Viet)
import http from "http";
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { initWs, broadcast } from "./ws/hub.js";
import { connectMqtt } from "./mqtt/client.js";
import { handleEnv } from "./features/CB-01_nhiet-do-do-am/envHandler.js";
import { handleMotion, startAbsenceWatcher } from "./features/NC-02_hien-dien/motionHandler.js";

const app = express();
app.use(cors());          // allow the frontend (port 5173) to call the API (port 3000)
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ ok: true })); // health check
// TODO: REST routes (/api/...) of each feature will be added here

const server = http.createServer(app); // WebSocket shares the same port as Express
initWs(server);

// Routing: each MQTT topic goes to its own handler
const mqttClient = connectMqtt((topic, raw) => {
  if (topic === config.topics.env) handleEnv(raw, broadcast);
  if (topic === config.topics.motion) handleMotion(raw, broadcast); // NC-02
});

// NC-02: start the background timer; onAbsent runs once after 10 minutes without presence
startAbsenceWatcher(broadcast, () => {
  // TODO: publish "off" to config.topics.fan (needs Tung's payload format)
  // TODO: publish "close" to config.topics.curtain (needs K' Von's payload format)
  // Example later: mqttClient.publish(config.topics.fan, "off");
});

server.listen(config.port, () => console.log(`Backend chạy tại http://localhost:${config.port}`));