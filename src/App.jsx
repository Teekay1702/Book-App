import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import BookList from './Components/BookList/BookList';
import BookReviews from './Components/BookReviews/BookReviews';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <Router>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<BookList searchQuery={searchQuery} />} /> */}
        <Route path="/books" element={<BookList searchQuery={searchQuery} />} />
        <Route path="/books/:id" element={<BookReviews />} />
      </Routes>
    </Router>
  );
}

export default App;
