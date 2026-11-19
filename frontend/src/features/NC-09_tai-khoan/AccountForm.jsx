// NC-09 (K' Vớn): trang Tài khoản - họ tên, email, vai trò, ngôn ngữ
// TODO: đọc thông tin từ GET /api/me, lưu bằng PUT /api/me
import Card from "../../components/Card";
export default function AccountForm() {
  return (
    <Card title="Thông tin cá nhân">
      <p className="muted">Thông tin dùng cho tài khoản SmartHome.</p>
      <div className="field"><span>Họ và tên</span><input placeholder="Người dùng" /></div>
      <div className="field"><span>Email</span><input placeholder="nguoidung@example.com" /></div>
      <hr /><div className="field"><span className="muted">Vai trò</span><strong>Chủ nhà</strong></div>
      <div className="field"><span>Ngôn ngữ</span><span className="muted">Tiếng Việt</span></div>
      <div className="actions"><button className="btn">Hủy</button><button className="btn primary">Lưu thông tin</button></div>
    </Card>
  );
}
