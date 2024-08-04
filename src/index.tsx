// src/index.tsx or src/App.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"; // Make sure this import exists
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
