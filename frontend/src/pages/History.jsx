// Trang Lịch sử: biểu đồ + tổng quan + nhật ký. NC-10 (Việt)
import HistoryChartCard from "../features/NC-05_bieu-do/HistoryChartCard";                 // K' Vớn (+ đường dự báo NC-11 của Tùng)
import TodaySummary from "../features/NC-04_lich-su-hoat-dong/TodaySummary";               // Việt
import ActivityLogTable from "../features/NC-04_lich-su-hoat-dong/ActivityLogTable";       // Việt

export default function History() {
  return (
    <>
      <h1>Lịch sử</h1>
      <p className="muted">Theo dõi cảm biến và các thao tác điều khiển trong nhà.</p>
      <div className="row"><HistoryChartCard /><TodaySummary /></div>
      <ActivityLogTable />
    </>
  );
}
