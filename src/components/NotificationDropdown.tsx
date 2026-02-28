"use client";

import React from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './ui/popover';
import { Bell, Check, Info, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';

const notifications = [
  { id: 1, title: 'Novo Lead', message: 'João Silva acabou de se cadastrar.', time: '2 min atrás', type: 'info' },
  { id: 2, title: 'Orçamento Atingido', message: 'Campanha Verão 2024 atingiu 80% do limite.', time: '1 hora atrás', type: 'warning' },
  { id: 3, title: 'Campanha Aprovada', message: 'Sua campanha no TikTok foi aprovada.', time: '3 horas atrás', type: 'success' },
];

const NotificationDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-2 text-slate-400 hover:text-slate-600 relative outline-none">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white border-slate-200 shadow-xl" align="end">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900">Notificações</h3>
          <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto">
            Marcar todas como lidas
          </Button>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex space-x-3">
                <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  n.type === 'warning' ? 'bg-orange-100 text-orange-600' : 
                  n.type === 'success' ? 'bg-green-100 text-green-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  {n.type === 'warning' ? <AlertTriangle size={14} /> : 
                   n.type === 'success' ? <Check size={14} /> : 
                   <Info size={14} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 text-center border-t border-slate-100">
          <Button variant="ghost" size="sm" className="w-full text-xs text-slate-500">
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;