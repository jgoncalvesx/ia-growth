"use client";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Calendar from './pages/Calendar';
import Workflows from './pages/Workflows';
import BrandKit from './pages/BrandKit';
import Competitors from './pages/Competitors';
import Budget from './pages/Budget';
import Audiences from './pages/Audiences';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Integrations from './pages/Integrations';
import Funnel from './pages/Funnel';
import Help from './pages/Help';
import Login from './pages/Login';
import ActivityLog from './pages/ActivityLog';
import Strategy from './pages/Strategy';
import Content from './pages/Content';
import Execucao from './pages/Execucao';

function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/strategy" element={<Strategy />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/:id" element={<LeadDetail />} />
        <Route path="/content" element={<Content />} />
        <Route path="/audiences" element={<Audiences />} />
        <Route path="/brand-kit" element={<BrandKit />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/funnel" element={<Funnel />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/execucao" element={<Execucao />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;