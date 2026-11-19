// NC-05 (K' Vớn): biểu đồ lịch sử nhiệt độ/độ ẩm (1 giờ / 24 giờ / 7 ngày); đường dự báo 30 phút là NC-11 (Tùng)
// TODO: cài chart.js, gọi API lịch sử theo khoảng đã chọn, vẽ vào <canvas>
import { useState } from "react";
import Card from "../../components/Card";
export default function HistoryChartCard() {
  const [range, setRange] = useState("24h");
  return (
    <Card title="Lịch sử và dự báo nhiệt độ" className="grow">
      <div className="tabs">
        {[["1h", "1 giờ"], ["24h", "24 giờ"], ["7d", "7 ngày"]].map(([k, l]) =>
          <button key={k} className={range === k ? "on" : ""} onClick={() => setRange(k)}>{l}</button>)}
      </div>
      <div className="chartbox">Biểu đồ ({range}) sẽ vẽ ở đây</div>
    </Card>
  );
}
