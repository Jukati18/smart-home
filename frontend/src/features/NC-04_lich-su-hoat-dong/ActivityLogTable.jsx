// NC-04 (Việt): bảng nhật ký hoạt động (Thời gian | Thiết bị | Sự kiện | Nguồn) + phân trang
// TODO: gọi API GET /api/events?page=1
import Card from "../../components/Card";
const rows = [["__:__", "Quạt", "Bật quạt", "Website"], ["__:__", "Rèm", "Mở 60%", "Chatbot"]]; // dữ liệu giả
export default function ActivityLogTable() {
  return (
    <Card title="Nhật ký hoạt động">
      <table>
        <thead><tr><th>Thời gian</th><th>Thiết bị</th><th>Sự kiện</th><th>Nguồn</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
      <p className="muted right">1 / 1</p>
    </Card>
  );
}
