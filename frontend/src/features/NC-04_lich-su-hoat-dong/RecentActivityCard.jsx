// NC-04 (Việt): thẻ "Hoạt động gần đây" trên Dashboard (lấy từ collection events)
// TODO: gọi API GET /api/events?limit=3
import Card from "../../components/Card";
const demo = [["__:__", "Quạt bật từ website"], ["__:__", "Phát hiện chuyển động"], ["__:__", "Rèm mở 60%"]];
export default function RecentActivityCard() {
  return (
    <Card title="Hoạt động gần đây">
      <ul className="list">{demo.map(([t, e], i) => <li key={i}><span className="muted">{t}</span> {e}</li>)}</ul>
    </Card>
  );
}
