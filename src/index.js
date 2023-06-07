import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/index.module.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
