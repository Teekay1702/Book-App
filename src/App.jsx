import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import BookList from './Components/BookList/BookList';
import './App.css';


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<BookList searchQuery={searchQuery} />} />
        <Route path="/books" element={<BookList searchQuery={searchQuery} />} />
      </Routes>
    </Router>
  );
}

export default App;
