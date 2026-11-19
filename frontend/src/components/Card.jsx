// Thẻ (khung viền bo góc + tiêu đề) dùng lại ở mọi trang. NC-10 (Việt)
export default function Card({ title, children, className = "" }) {
  return (
    <section className={"card " + className}>
      {title && <h3>{title}</h3>}
      {children}
    </section>
  );
}
