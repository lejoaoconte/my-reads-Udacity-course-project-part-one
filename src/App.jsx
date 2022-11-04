import { Default } from "Layout/Default";
import { Routes, Route } from "react-router-dom";

import { BooksSearch } from "./pages/BooksSearch";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <Default>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/books-search" element={<BooksSearch />} />
      </Routes>
    </Default>
  );
}
