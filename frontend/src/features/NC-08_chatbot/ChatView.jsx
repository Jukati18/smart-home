// NC-08 (Tùng): giao diện chatbot (danh sách cuộc trò chuyện + khung chat + lệnh gợi ý)
// TODO: gửi tin nhắn tới API POST /api/chat (backend gọi Gemini)
import { useState } from "react";
import Card from "../../components/Card";
export default function ChatView() {
  const [msgs, setMsgs] = useState([{ from: "user", text: "Phòng đang bao nhiêu độ?" }, { from: "bot", text: "Phòng đang __ °C, độ ẩm __%." }]);
  const [text, setText] = useState("");
  const send = () => { if (!text.trim()) return; setMsgs([...msgs, { from: "user", text }]); setText(""); };
  return (
    <div className="row">
      <Card title="Cuộc trò chuyện" className="side">
        <button className="btn full">+ Trò chuyện mới</button>
        <p className="muted">Hôm nay</p><p>Điều khiển phòng</p><p>Kiểm tra nhiệt độ</p>
        <h4>Lệnh gợi ý</h4><p>"Bật quạt"</p><p>"Mở rèm 60%"</p>
      </Card>
      <Card title="Trợ lý SmartHome" className="chat">
        <div className="msgs">{msgs.map((m, i) => <div key={i} className={"bubble " + m.from}>{m.text}</div>)}</div>
        <div className="inputrow">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập câu hỏi hoặc lệnh..." />
          <button className="btn" onClick={send}>Gửi</button>
        </div>
      </Card>
    </div>
  );
}
