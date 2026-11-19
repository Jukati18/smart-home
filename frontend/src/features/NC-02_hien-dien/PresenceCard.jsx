// NC-02 (Việt): trạng thái hiện diện từ radar HLK-LD2410C
// TODO: nhận topic smarthome/sensor/motion qua WebSocket
import Card from "../../components/Card";
export default function PresenceCard() {
  const present = true, lastSeen = "__:__"; // dữ liệu giả để dựng giao diện
  return (
    <Card title="Chuyển động">
      <p className="big">{present ? "Có người" : "Không có người"}</p>
      <p className="muted">lần cuối: {lastSeen}</p>
    </Card>
  );
}
