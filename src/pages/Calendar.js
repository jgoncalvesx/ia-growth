"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Instagram, Facebook, Music2 } from 'lucide-react';
const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const calendarData = [
    { day: 15, items: [{ type: 'ig', title: 'Post Coleção Verão', status: 'Agendado' }] },
    { day: 16, items: [] },
    { day: 17, items: [{ type: 'tk', title: 'Trend Dance App', status: 'Pendente' }] },
    { day: 18, items: [{ type: 'fb', title: 'Anúncio Black Friday', status: 'Agendado' }] },
    { day: 19, items: [] },
    { day: 20, items: [{ type: 'ig', title: 'Reels Lifestyle', status: 'Publicado' }] },
    { day: 21, items: [] },
];
const Calendar = () => {
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Calend\u00E1rio de Conte\u00FAdo" }), _jsx("p", { className: "text-slate-500", children: "Planeje e visualize suas postagens em todas as redes." })] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Agendar Post"] })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm overflow-hidden", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(CardTitle, { className: "text-lg font-bold", children: "Maio 2024" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", children: _jsx(ChevronLeft, { size: 16 }) }), _jsx(Button, { variant: "outline", size: "icon", className: "h-8 w-8", children: _jsx(ChevronRight, { size: 16 }) })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: "outline", className: "bg-white", children: "M\u00EAs" }), _jsx(Badge, { variant: "ghost", children: "Semana" }), _jsx(Badge, { variant: "ghost", children: "Dia" })] })] }), _jsxs(CardContent, { className: "p-0", children: [_jsx("div", { className: "grid grid-cols-7 border-b border-slate-100", children: days.map(day => (_jsx("div", { className: "py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-100 last:border-0", children: day }, day))) }), _jsx("div", { className: "grid grid-cols-7 auto-rows-[120px]", children: Array.from({ length: 31 }).map((_, i) => {
                                    const dayNum = i + 1;
                                    const dayData = calendarData.find(d => d.day === dayNum);
                                    return (_jsxs("div", { className: "p-2 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group relative", children: [_jsx("span", { className: "text-sm font-medium text-slate-400 group-hover:text-slate-900", children: dayNum }), _jsx("div", { className: "mt-1 space-y-1", children: dayData?.items.map((item, idx) => (_jsxs("div", { className: `text-[10px] p-1 rounded border flex items-center space-x-1 ${item.type === 'ig' ? 'bg-pink-50 border-pink-100 text-pink-700' :
                                                        item.type === 'tk' ? 'bg-slate-900 border-slate-800 text-white' :
                                                            'bg-blue-50 border-blue-100 text-blue-700'}`, children: [item.type === 'ig' && _jsx(Instagram, { size: 10 }), item.type === 'tk' && _jsx(Music2, { size: 10 }), item.type === 'fb' && _jsx(Facebook, { size: 10 }), _jsx("span", { className: "truncate font-medium", children: item.title })] }, idx))) }), _jsx("button", { className: "absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600", children: _jsx(Plus, { size: 14 }) })] }, i));
                                }) })] })] })] }));
};
export default Calendar;
//# sourceMappingURL=Calendar.js.map