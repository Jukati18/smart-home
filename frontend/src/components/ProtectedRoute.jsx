// Chặn trang khi chưa đăng nhập. NC-10 (Việt) - chỉ là "khung chặn"
// Logic đăng nhập thật (JWT) là của NC-09 (K' Vớn): sau khi login thành công thì lưu token vào localStorage.
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}
