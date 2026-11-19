// Trang đăng nhập/đăng ký (không có thanh menu). NC-10 (Việt); form thật: NC-09 (K' Vớn)
import { LoginForm, RegisterForm } from "../features/NC-09_tai-khoan/AuthForms";
export default function AuthPage() {
  return (
    <>
      <nav className="navbar"><strong className="brand">SmartHome</strong></nav>
      <main className="page row center"><LoginForm /><RegisterForm /></main>
    </>
  );
}
