// Trang Dashboard: lưới 2 cột ghép 6 thẻ. Mỗi thẻ nằm trong features/ của người phụ trách. NC-10 (Việt)
import TempHumidityCard from "../features/CB-01_nhiet-do-do-am/TempHumidityCard"; // Việt
import PresenceCard from "../features/NC-02_hien-dien/PresenceCard";              // Việt
import RecentActivityCard from "../features/NC-04_lich-su-hoat-dong/RecentActivityCard"; // Việt
import FanCard from "../features/CB-02_quat/FanCard";                             // Tùng
import CurtainCard from "../features/CB-03_rem/CurtainCard";                      // K' Vớn
import NotifyCard from "../features/NC-06_thong-bao/NotifyCard";                  // K' Vớn

export default function Dashboard() {
  return (
    <div className="grid2">
      <TempHumidityCard /><PresenceCard />
      <FanCard /><CurtainCard />
      <NotifyCard /><RecentActivityCard />
    </div>
  );
}
