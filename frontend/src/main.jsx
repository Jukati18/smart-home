// Điểm vào của React: gắn <App/> vào #root, bọc BrowserRouter để dùng được routing (đổi trang không tải lại)
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
