"use client";

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  FileVideo, 
  BarChart3, 
  Settings, 
  LogOut,
  Users,
  Calendar as CalendarIcon,
  Zap,
  Brain,
  Palette,
  Globe
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Megaphone, label: 'Campanhas', path: '/campaigns' },
  { icon: Users, label: 'Leads', path: '/leads' },
  { icon: FileVideo, label: 'Conteúdo', path: '/content' },
  { icon: Brain, label: 'Gerador de IA', path: '/ai-generator' },
  { icon: Palette, label: 'Brand Kit', path: '/brand-kit' },
  { icon: Globe, label: 'Competidores', path: '/competitors' },
  { icon: CalendarIcon, label: 'Calendário', path: '/calendar' },
  { icon: Zap, label: 'Automações', path: '/workflows' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Equipe', path: '/team' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MidiaOS
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <item.icon size={18} />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;