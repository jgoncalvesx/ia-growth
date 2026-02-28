"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Campaigns from './pages/Campaigns';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/campaigns" element={<Campaigns />} />
      </Routes>
    </Router>
  );
}

export default App;