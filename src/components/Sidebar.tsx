"use client";

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  LogOut,
  Users,
  Calendar as CalendarIcon,
  Zap,
  Palette,
  Globe,
  DollarSign,
  Target,
  Share2,
  Filter,
  HelpCircle,
  History,
  Compass,
  PlayCircle,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import ClientSwitcher from './ClientSwitcher';
import { fetchAcoesPendentes } from '../services/api.service';
import { useClient } from '../context/ClientContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { selectedClient } = useClient();
  const [pendingCount, setPendingCount] = React.useState(0);

  const menuGroups = [
    {
      title: 'Principal',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: MessageSquare, label: 'Chat IA', path: '/chat' },
        { icon: CalendarIcon, label: 'Calendário', path: '/calendar' },
      ]
    },
    {
      title: 'Estratégia',
      items: [
        { icon: Compass, label: 'Roadmap IA', path: '/strategy' },
        { icon: Palette, label: 'Brand Kit', path: '/brand-kit' },
        { icon: Target, label: 'Audiências', path: '/audiences' },
        { icon: Globe, label: 'Concorrência', path: '/competitors' },
      ]
    },
    {
      title: 'Performance',
      items: [
        { icon: Filter, label: 'Funil', path: '/funnel' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: DollarSign, label: 'Orçamento', path: '/budget' },
        { icon: PlayCircle, label: 'Execução', path: '/execucao', showBadge: true },
      ]
    },
    {
      title: 'Gestão de Leads',
      items: [
        { icon: Users, label: 'Leads', path: '/leads' },
        { icon: Zap, label: 'Automações', path: '/workflows' },
      ]
    },
    {
      title: 'Configurações',
      items: [
        { icon: Share2, label: 'Integrações', path: '/integrations' },
        { icon: History, label: 'Atividades', path: '/activity-log' },
        { icon: Settings, label: 'Configurações', path: '/settings' },
      ]
    }
  ];

  React.useEffect(() => {
    const getCount = async () => {
      try {
        const data = await fetchAcoesPendentes();
        setPendingCount(Array.isArray(data) ? data.length : 0);
      } catch (e) {
        setPendingCount(0);
      }
    };
    getCount();
  }, [selectedClient.id]);

  const handleLogout = () => {
    toast.info('Saindo da conta...');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
          Growth Midia IA
        </h1>
        <ClientSwitcher />
      </div>
      
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto pb-8 pt-6">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-foreground' 
                      : 'text-muted-foreground hover:bg-slate-800 hover:text-foreground'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={16} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.showBadge && pendingCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {pendingCount}
                    </span>
                  )}
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
            ${isActive ? 'bg-slate-800 text-foreground' : 'text-muted-foreground hover:bg-slate-800 hover:text-foreground'}
          `}
        >
          <HelpCircle size={18} />
          <span className="font-medium text-sm">Ajuda & Suporte</span>
        </NavLink>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-muted-foreground hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;