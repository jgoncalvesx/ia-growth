"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
import Chat from './pages/Chat';
function App() {
    return (_jsxs(Router, { children: [_jsx(Toaster, { position: "top-right", richColors: true }), _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/projects", element: _jsx(Projects, {}) }), _jsx(Route, { path: "/projects/:id", element: _jsx(ProjectDetail, {}) }), _jsx(Route, { path: "/strategy", element: _jsx(Strategy, {}) }), _jsx(Route, { path: "/leads", element: _jsx(Leads, {}) }), _jsx(Route, { path: "/leads/:id", element: _jsx(LeadDetail, {}) }), _jsx(Route, { path: "/content", element: _jsx(Content, {}) }), _jsx(Route, { path: "/audiences", element: _jsx(Audiences, {}) }), _jsx(Route, { path: "/brand-kit", element: _jsx(BrandKit, {}) }), _jsx(Route, { path: "/competitors", element: _jsx(Competitors, {}) }), _jsx(Route, { path: "/budget", element: _jsx(Budget, {}) }), _jsx(Route, { path: "/integrations", element: _jsx(Integrations, {}) }), _jsx(Route, { path: "/funnel", element: _jsx(Funnel, {}) }), _jsx(Route, { path: "/calendar", element: _jsx(Calendar, {}) }), _jsx(Route, { path: "/workflows", element: _jsx(Workflows, {}) }), _jsx(Route, { path: "/analytics", element: _jsx(Analytics, {}) }), _jsx(Route, { path: "/execucao", element: _jsx(Execucao, {}) }), _jsx(Route, { path: "/chat", element: _jsx(Chat, {}) }), _jsx(Route, { path: "/activity-log", element: _jsx(ActivityLog, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/help", element: _jsx(Help, {}) })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map