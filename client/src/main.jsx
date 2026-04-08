import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import { BookProvider } from './context/BookContext.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import SingleBook from './pages/SingleBook.jsx';
import Ebook from './pages/Ebook.jsx';
import EditPage from './pages/EditPage.jsx';
import AddBook from './pages/AddBook.jsx';

createRoot(document.getElementById("root")).render(
  <BookProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Shop />} />
          <Route path="/ebooks" element={<Ebook />} />
          <Route path="/membership" element={<Ebook />} />
          <Route path="/book/add" element={<AddBook/>} />
          <Route path="/book/:id" element={<SingleBook />} />
          <Route path="/book/edit/:id" element={<EditPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </BookProvider>,
);
