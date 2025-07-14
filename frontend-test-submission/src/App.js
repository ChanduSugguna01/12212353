import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UrlShortener from './components/UrlShortener';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </Router>
  );
}

export default App;