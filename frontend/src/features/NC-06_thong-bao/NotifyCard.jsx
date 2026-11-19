// NC-06 (K' Vớn): thẻ "Cài đặt thông báo" trên Dashboard (ngưỡng nhiệt độ + chế độ Vắng nhà)
// TODO: đọc/ghi cài đặt qua API /api/settings
import { useState } from "react";
import Card from "../../components/Card";
export default function NotifyCard() {
  const [temp, setTemp] = useState(""); const [away, setAway] = useState(false);
  return (
    <Card title="Cài đặt thông báo">
      <p>Ngưỡng nhiệt độ: <input className="small" value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="__" /> °C</p>
      <p>Chế độ Vắng nhà: <label className="switch"><input type="checkbox" checked={away} onChange={(e) => setAway(e.target.checked)} /><span /></label> {away ? "Bật" : "Tắt"}</p>
    </Card>
  );
}
