// Điểm vào backend: gắn Express (REST) + WebSocket + MQTT vào cùng một server. NC-10 (Việt)
import http from "http";
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { initWs, broadcast } from "./ws/hub.js";
import { connectMqtt } from "./mqtt/client.js";
import { handleEnv } from "./features/CB-01_nhiet-do-do-am/envHandler.js";

const app = express();
app.use(cors());          // cho phép frontend (cổng 5173) gọi API (cổng 3000)
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ ok: true })); // kiểm tra server sống
// TODO: các route /api/... của từng chức năng sẽ gắn thêm ở đây

const server = http.createServer(app); // WebSocket dùng chung cổng với Express
initWs(server);

// Định tuyến: tin MQTT đến topic nào thì giao cho handler của topic đó
connectMqtt((topic, raw) => {
  if (topic === config.topics.env) handleEnv(raw, broadcast);
  // TODO NC-02 (Việt, tuần 2): if (topic === config.topics.motion) handleMotion(...)
});

server.listen(config.port, () => console.log(`Backend chạy tại http://localhost:${config.port}`));