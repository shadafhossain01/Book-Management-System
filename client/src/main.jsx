import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<h2>HomePage</h2>} />
        <Route path="/about" element={<h2>About Page</h2>} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
