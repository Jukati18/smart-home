// WebSocket: backend chủ động đẩy dữ liệu xuống trình duyệt (không cần web hỏi liên tục). NC-10 (Việt)
import { WebSocketServer } from "ws";

const latest = {}; // nhớ tin mới nhất theo loại, để người mới mở web thấy ngay giá trị
let wss;

export function initWs(httpServer) {
    wss = new WebSocketServer({ server: httpServer, path: "/ws" });
    wss.on("connection", (socket) => {
        // Vừa kết nối: gửi ngay các giá trị mới nhất, khỏi chờ 5 giây
        Object.values(latest).forEach((m) => socket.send(JSON.stringify(m)));
    });
    // TODO NC-09 (K' Vớn): kiểm tra JWT khi client kết nối
}

export function broadcast(msg) {
    latest[msg.type] = msg;
    const text = JSON.stringify(msg);
    wss?.clients.forEach((c) => { if (c.readyState === 1) c.send(text); }); // 1 = đang mở
}