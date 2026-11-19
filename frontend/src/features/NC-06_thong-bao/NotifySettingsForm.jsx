// NC-06 (K' Vớn): trang Cài đặt - ngưỡng nhiệt độ, độ ẩm, cảnh báo chuyển động
// TODO: nút "Lưu cài đặt" -> PUT /api/settings
import { useState } from "react";
import Card from "../../components/Card";
export default function NotifySettingsForm() {
  const [s, setS] = useState({ temp: "", hum: "", motion: true });
  return (
    <Card title="Thông báo và cảnh báo">
      <p className="muted">Gửi cảnh báo khi vượt ngưỡng đã chọn.</p>
      <div className="field"><span>Ngưỡng nhiệt độ</span><span><input className="small" value={s.temp} onChange={(e) => setS({ ...s, temp: e.target.value })} placeholder="__" /> °C</span></div>
      <div className="field"><span>Ngưỡng độ ẩm</span><span><input className="small" value={s.hum} onChange={(e) => setS({ ...s, hum: e.target.value })} placeholder="__" /> %</span></div>
      <div className="field"><span>Cảnh báo chuyển động</span>
        <span><label className="switch"><input type="checkbox" checked={s.motion} onChange={(e) => setS({ ...s, motion: e.target.checked })} /><span /></label> {s.motion ? "Bật" : "Tắt"}</span></div>
      <div className="actions"><button className="btn">Hủy</button><button className="btn primary">Lưu cài đặt</button></div>
    </Card>
  );
}
