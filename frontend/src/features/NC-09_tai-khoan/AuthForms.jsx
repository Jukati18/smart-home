// NC-09 (K' Vớn): form Đăng nhập + Đăng ký
// TODO: gọi POST /api/auth/login và /api/auth/register; lưu JWT vào localStorage("token")
// Hiện tại: bấm "Đăng nhập" chỉ lưu token giả để xem được các trang (XÓA khi làm thật)
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";

export function LoginForm() {
  const navigate = useNavigate();
  const login = () => { localStorage.setItem("token", "dev-token"); navigate("/"); };
  return (
    <Card title="Đăng nhập" className="auth">
      <input placeholder="Email" /><input type="password" placeholder="Mật khẩu" />
      <button className="btn primary" onClick={login}>Đăng nhập</button>
    </Card>
  );
}
export function RegisterForm() {
  return (
    <Card title="Đăng ký" className="auth">
      <input placeholder="Họ tên" /><input placeholder="Email" /><input type="password" placeholder="Mật khẩu" />
      <button className="btn primary">Tạo tài khoản</button>
    </Card>
  );
}
