// Hook nhận dữ liệu realtime từ backend qua WebSocket. NC-10 (Việt)
// Dùng: const d = useSocket("env") -> d là tin mới nhất loại "env" (hoặc null nếu chưa có)
import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_WS_URL || "ws://localhost:3000/ws";

export default function useSocket(type) {
    const [data, setData] = useState(null);
    useEffect(() => {
        let ws, timer, closed = false;
        const connect = () => {
            ws = new WebSocket(URL);
            ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.type === type) setData(m); };
            ws.onclose = () => { if (!closed) timer = setTimeout(connect, 3000); }; // rớt mạng thì nối lại
        };
        connect();
        return () => { closed = true; clearTimeout(timer); ws.close(); }; // rời trang thì đóng kết nối
    }, [type]);
    return data;
}