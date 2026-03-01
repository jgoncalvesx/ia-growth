"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Bell, Check, Info, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
const initialNotifications = [
    { id: 1, title: 'Novo Lead', message: 'João Silva acabou de se cadastrar.', time: '2 min atrás', type: 'info', read: false },
    { id: 2, title: 'Orçamento Atingido', message: 'Campanha Verão 2024 atingiu 80% do limite.', time: '1 hora atrás', type: 'warning', read: false },
    { id: 3, title: 'Campanha Aprovada', message: 'Sua campanha no TikTok foi aprovada.', time: '3 horas atrás', type: 'success', read: true },
];
const NotificationDropdown = () => {
    const [notifications, setNotifications] = React.useState(initialNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        toast.success('Todas as notificações foram marcadas como lidas.');
    };
    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs("button", { className: "p-2 text-slate-400 hover:text-slate-600 relative outline-none", children: [_jsx(Bell, { size: 20 }), unreadCount > 0 && (_jsx("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" }))] }) }), _jsxs(PopoverContent, { className: "w-80 p-0 bg-white border-slate-200 shadow-xl", align: "end", children: [_jsxs("div", { className: "p-4 border-b border-slate-100 flex justify-between items-center", children: [_jsx("h3", { className: "font-semibold text-slate-900", children: "Notifica\u00E7\u00F5es" }), unreadCount > 0 && (_jsx(Button, { variant: "ghost", size: "sm", className: "text-xs text-blue-600 hover:text-blue-700 p-0 h-auto", onClick: markAllAsRead, children: "Marcar todas como lidas" }))] }), _jsx("div", { className: "max-h-[300px] overflow-y-auto", children: notifications.length > 0 ? (notifications.map((n) => (_jsxs("div", { className: `p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer relative ${!n.read ? 'bg-blue-50/30' : ''}`, onClick: () => markAsRead(n.id), children: [!n.read && (_jsx("div", { className: "absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full" })), _jsxs("div", { className: "flex space-x-3", children: [_jsx("div", { className: `mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                                                n.type === 'success' ? 'bg-green-100 text-green-600' :
                                                    'bg-blue-100 text-blue-600'}`, children: n.type === 'warning' ? _jsx(AlertTriangle, { size: 14 }) :
                                                n.type === 'success' ? _jsx(Check, { size: 14 }) :
                                                    _jsx(Info, { size: 14 }) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: `text-sm font-medium ${!n.read ? 'text-slate-900' : 'text-slate-600'}`, children: n.title }), _jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: n.message }), _jsx("p", { className: "text-[10px] text-slate-400 mt-1 uppercase font-semibold", children: n.time })] })] })] }, n.id)))) : (_jsx("div", { className: "p-8 text-center text-slate-400 text-sm", children: "Nenhuma notifica\u00E7\u00E3o no momento." })) }), _jsx("div", { className: "p-3 text-center border-t border-slate-100", children: _jsx(Button, { variant: "ghost", size: "sm", className: "w-full text-xs text-slate-500", children: "Ver todas as notifica\u00E7\u00F5es" }) })] })] }));
};
export default NotificationDropdown;
//# sourceMappingURL=NotificationDropdown.js.map