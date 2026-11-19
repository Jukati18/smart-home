// Khung chung: thanh menu ở trên + <Outlet/> là chỗ hiện nội dung từng trang. NC-10 (Việt)
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("token"); navigate("/login"); }; // xóa token = đăng xuất
  return (
    <>
      <nav className="navbar">
        <strong className="brand">SmartHome</strong>
        <div className="links">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/history">Lịch sử</NavLink>
          <NavLink to="/chatbot">Chatbot</NavLink>
          <NavLink to="/settings">Cài đặt</NavLink>
        </div>
        <div className="links right">
          <NavLink to="/account">Tài khoản</NavLink>
          <button className="linkbtn" onClick={logout}>Đăng xuất</button>
        </div>
      </nav>
      <main className="page"><Outlet /></main>
    </>
  );
}
