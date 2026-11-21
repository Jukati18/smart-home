// CB-01 (Việt): thẻ nhiệt độ, độ ẩm theo thời gian thực
// ĐÃ SỬA: nhận dữ liệu từ WebSocket (backend đẩy mỗi 5 giây) thay cho dữ liệu giả
import Card from "../../components/Card";
import useSocket from "../../hooks/useSocket";
export default function TempHumidityCard() {
  const d = useSocket("env"); // null = chưa có dữ liệu
  const temp = d?.temperature ?? null, humidity = d?.humidity ?? null;
  return (<Card title="Nhiệt độ, độ ẩm"><p className="big">{temp ?? "__"}°C · {humidity ?? "__"}%</p></Card>);
}
