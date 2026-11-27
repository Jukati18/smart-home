// NC-02 (Viet): presence status from the HLK-LD2410C radar
// Receives live data from the backend via WebSocket (type "motion")
import Card from "../../components/Card";
import useSocket from "../../hooks/useSocket";

// Format a timestamp (ms) as HH:MM:SS, or "--:--" if nobody was ever seen
const fmt = (ms) => (ms ? new Date(ms).toLocaleTimeString("vi-VN") : "--:--");

export default function PresenceCard() {
  const d = useSocket("motion"); // null = no data yet
  return (
    <Card title="Chuyển động">
      <p className="big">{d === null ? "Chưa có dữ liệu" : d.present ? "Có người" : "Không có người"}</p>
      <p className="muted">lần cuối: {fmt(d?.lastSeen)}</p>
    </Card>
  );
}