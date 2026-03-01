"use client";

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  Globe,
  DollarSign,
  Target,
  Layers,
  Star,
  Share2,
  Filter,
  HelpCircle,
  CreditCard,
  History,
  Compass
} from 'lucide-react';
import { toast } from 'sonner';

const menuGroups = [
  {
    title: 'Principal',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      { icon: Layers, label: 'Projetos', path: '/projects' },
      { icon: CalendarIcon, label: 'Calendário', path: '/calendar' },
    ]
  },
  {
    title: 'Estratégia',
    items: [
      { icon: Compass, label: 'Roadmap IA', path: '/strategy' },
      { icon: Palette, label: 'Brand Kit', path: '/brand-kit' },
      { icon: Target, label: 'Audiências', path: '/audiences' },
      { icon: Globe, label: 'Competidores', path: '/competitors' },
    ]
  },
  {
    title: 'Execução',
    items: [
      { icon: Megaphone, label: 'Campanhas', path: '/campaigns' },
      { icon: FileVideo, label: 'Conteúdo', path: '/content' },
      { icon: Brain, label: 'Gerador de IA', path: '/ai-generator' },
      { icon: Star, label: 'Influenciadores', path: '/influencers' },
    ]
  },
  {
    title: 'Performance',
    items: [
      { icon: Filter, label: 'Funil', path: '/funnel' },
      { icon: BarChart3, label: 'Analytics', path: '/analytics' },
      { icon: DollarSign, label: 'Orçamento', path: '/budget' },
    ]
  },
  {
    title: 'Gestão',
    items: [
      { icon: Users, label: 'Leads', path: '/leads' },
      { icon: Zap, label: 'Automações', path: '/workflows' },
      { icon: Share2, label: 'Integrações', path: '/integrations' },
      { icon: Users, label: 'Equipe', path: '/team' },
      { icon: History, label: 'Atividades', path: '/activity-log' },
      { icon: CreditCard, label: 'Faturamento', path: '/billing' },
      { icon: Settings, label: 'Configurações', path: '/settings' },
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.info('Saindo da conta...');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MidiaOS
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-8">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `
                    w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <item.icon size={16} />
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <NavLink
          to="/help"
          className={({ isActive }) => `
            w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
            ${isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
          `}
        >
          <HelpCircle size={18} />
          <span className="font-medium text-sm">Ajuda & Suporte</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;