// CB-03 (K' Vớn): thanh trượt độ mở rèm 0-100%
// TODO: khi thả thanh trượt -> POST /api/curtain {percent}; backend publish smarthome/cmd/curtain
import { useState } from "react";
import Card from "../../components/Card";
export default function CurtainCard() {
  const [pct, setPct] = useState(60);
  return (
    <Card title="Rèm">
      <input type="range" min="0" max="100" value={pct} onChange={(e) => setPct(+e.target.value)} className="slider" />
      <p>Độ mở {pct}%</p>
    </Card>
  );
}
