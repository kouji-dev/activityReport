import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./style.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
