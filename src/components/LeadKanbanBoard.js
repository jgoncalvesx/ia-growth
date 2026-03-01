"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MoreHorizontal, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const columns = [
    { id: 'novo', title: 'Novos Leads', color: 'bg-blue-500' },
    { id: 'em-contato', title: 'Em Contato', color: 'bg-orange-500' },
    { id: 'qualificado', title: 'Qualificados', color: 'bg-purple-500' },
    { id: 'convertido', title: 'Convertidos', color: 'bg-green-500' },
];
const leadsData = [
    { id: 1, name: 'João Silva', status: 'novo', source: 'Instagram', email: 'joao@exemplo.com' },
    { id: 2, name: 'Maria Oliveira', status: 'em-contato', source: 'Google Ads', email: 'maria@exemplo.com' },
    { id: 3, name: 'Pedro Santos', status: 'qualificado', source: 'TikTok', email: 'pedro@exemplo.com' },
    { id: 4, name: 'Ana Costa', status: 'convertido', source: 'Facebook', email: 'ana@exemplo.com' },
    { id: 5, name: 'Lucas Souza', status: 'novo', source: 'Instagram', email: 'lucas@exemplo.com' },
    { id: 6, name: 'Carla Dias', status: 'em-contato', source: 'LinkedIn', email: 'carla@exemplo.com' },
];
const LeadKanbanBoard = () => {
    const navigate = useNavigate();
    return (_jsx("div", { className: "flex space-x-6 overflow-x-auto pb-6 min-h-[600px]", children: columns.map((column) => (_jsxs("div", { className: "flex-shrink-0 w-80", children: [_jsxs("div", { className: "flex items-center justify-between mb-4 px-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${column.color}` }), _jsx("h3", { className: "font-bold text-slate-700 uppercase text-xs tracking-wider", children: column.title }), _jsx(Badge, { variant: "secondary", className: "ml-2 bg-slate-100 text-slate-500 border-none", children: leadsData.filter(l => l.status === column.id).length })] }), _jsx("button", { className: "text-slate-400 hover:text-slate-600", children: _jsx(MoreHorizontal, { size: 16 }) })] }), _jsxs("div", { className: "space-y-3", children: [leadsData
                            .filter((lead) => lead.status === column.id)
                            .map((lead) => (_jsx(Card, { className: "bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group", onClick: () => navigate(`/leads/${lead.id}`), children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "flex justify-between items-start mb-3", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Avatar, { className: "h-8 w-8 border border-slate-100", children: _jsx(AvatarFallback, { className: "text-[10px] bg-slate-50 text-slate-600", children: lead.name.substring(0, 2).toUpperCase() }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors", children: lead.name }), _jsx("p", { className: "text-[10px] text-slate-400 font-medium uppercase", children: lead.source })] })] }) }), _jsxs("div", { className: "flex items-center space-x-3 text-slate-400", children: [_jsx("div", { className: "flex items-center space-x-1", children: _jsx(Mail, { size: 12 }) }), _jsx("div", { className: "flex items-center space-x-1", children: _jsx(Phone, { size: 12 }) })] }), _jsxs("div", { className: "mt-4 pt-3 border-t border-slate-50 flex justify-between items-center", children: [_jsx("span", { className: "text-[10px] text-slate-400", children: "Atualizado h\u00E1 2h" }), _jsx(Badge, { variant: "outline", className: "text-[9px] font-bold uppercase border-slate-100 text-slate-400", children: "Quente" })] })] }) }, lead.id))), _jsx("button", { className: "w-full py-2 border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-xs font-medium hover:bg-slate-50 hover:border-slate-200 transition-all", children: "+ Adicionar Lead" })] })] }, column.id))) }));
};
export default LeadKanbanBoard;
//# sourceMappingURL=LeadKanbanBoard.js.map