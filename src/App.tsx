"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Content from './pages/Content';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Calendar from './pages/Calendar';
import Workflows from './pages/Workflows';
import Team from './pages/Team';
import AIGenerator from './pages/AIGenerator';
import BrandKit from './pages/BrandKit';
import Competitors from './pages/Competitors';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetail />} />
        <Route path="/content" element={<Content />} />
        <Route path="/ai-generator" element={<AIGenerator />} />
        <Route path="/brand-kit" element={<BrandKit />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;