// NC-04 (Việt): "Tổng quan hôm nay" (trung bình nhiệt/ẩm, số lượt điều khiển, số lần chuyển động)
// TODO: gọi API tổng hợp trong ngày từ MongoDB
import Card from "../../components/Card";
export default function TodaySummary() {
  return (
    <Card title="Tổng quan hôm nay" className="side">
      <p className="muted">Nhiệt độ trung bình</p><p className="big">__ °C</p>
      <p className="muted">Độ ẩm trung bình</p><p className="big">__ %</p>
      <hr /><p>Điều khiển thiết bị: __ lượt</p><p>Phát hiện chuyển động: __ lần</p>
    </Card>
  );
}
