// CB-01 (Việt): thẻ nhiệt độ, độ ẩm theo thời gian thực
// TODO: nhận dữ liệu từ WebSocket (backend đẩy mỗi 5 giây) thay cho "__"
import Card from "../../components/Card";
export default function TempHumidityCard() {
  const temp = null, humidity = null; // null = chưa có dữ liệu
  return (<Card title="Nhiệt độ, độ ẩm"><p className="big">{temp ?? "__"}°C · {humidity ?? "__"}%</p></Card>);
}
