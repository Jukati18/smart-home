// CB-02 (Tùng): công tắc Bật/Tắt quạt
// TODO: khi bấm -> gọi API POST /api/fan {on:true/false}; backend publish smarthome/cmd/fan
import { useState } from "react";
import Card from "../../components/Card";
export default function FanCard() {
  const [on, setOn] = useState(false);
  return (
    <Card title="Quạt">
      <label className="switch"><input type="checkbox" checked={on} onChange={(e) => setOn(e.target.checked)} /><span /></label>
      <span> {on ? "Bật" : "Tắt"}</span>
    </Card>
  );
}
