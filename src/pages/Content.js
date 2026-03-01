"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, Video, Image as ImageIcon, MoreVertical, Brain, Play, Download } from 'lucide-react';
import UploadContentModal from '../components/UploadContentModal';
import CreativeInsightsModal from '../components/CreativeInsightsModal';
import { useClient } from '../context/ClientContext';
const initialContent = [
    { id: 1, title: 'Vídeo Campanha Inverno', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', platform: 'Instagram' },
    { id: 2, title: 'Banner Coleção New Era', type: 'image', status: 'Aguardando IA', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', platform: 'Facebook' },
    { id: 3, title: 'Reels Lifestyle', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', platform: 'TikTok' },
    { id: 4, title: 'Story Promo Relâmpago', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&q=80', platform: 'Instagram' },
];
const Content = () => {
    const { selectedClient } = useClient();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [isInsightsOpen, setIsInsightsOpen] = React.useState(false);
    const filteredContent = initialContent.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleOpenInsights = (item) => {
        setSelectedItem(item);
        setIsInsightsOpen(true);
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Biblioteca de Conte\u00FAdo" }), _jsxs("p", { className: "text-slate-500", children: ["Ativos criativos de ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsx(UploadContentModal, {})] }), _jsxs("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex items-center space-x-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }), _jsx(Input, { placeholder: "Buscar por t\u00EDtulo ou tag...", className: "pl-10 bg-slate-50 border-none", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-slate-600", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), " Filtros"] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: filteredContent.map((item) => (_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm overflow-hidden group", children: [_jsxs("div", { className: "aspect-video relative overflow-hidden bg-slate-100", children: [_jsx("img", { src: item.thumbnail, alt: item.title, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }), _jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2", children: [item.type === 'video' ? (_jsx(Button, { size: "icon", variant: "secondary", className: "rounded-full", children: _jsx(Play, { size: 16, fill: "currentColor" }) })) : (_jsx(Button, { size: "icon", variant: "secondary", className: "rounded-full", children: _jsx(ImageIcon, { size: 16 }) })), _jsx(Button, { size: "icon", variant: "secondary", className: "rounded-full", children: _jsx(Download, { size: 16 }) })] }), _jsx(Badge, { className: "absolute top-2 left-2 bg-white/90 text-slate-900 border-none text-[9px] font-bold uppercase", children: item.platform })] }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "text-sm font-bold text-slate-900 truncate flex-1 pr-2", children: item.title }), _jsx("button", { className: "text-slate-400", children: _jsx(MoreVertical, { size: 16 }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { variant: "outline", className: `text-[9px] font-bold ${item.status === 'Otimizado' ? 'text-green-600 border-green-100 bg-green-50' : 'text-orange-600 border-orange-100 bg-orange-50'}`, children: item.status.toUpperCase() }), _jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 text-[10px] font-bold text-purple-600 hover:bg-purple-50", onClick: () => handleOpenInsights(item), children: [_jsx(Brain, { size: 12, className: "mr-1" }), " Insights IA"] })] })] })] }, item.id))) }), _jsx(CreativeInsightsModal, { open: isInsightsOpen, onOpenChange: setIsInsightsOpen, item: selectedItem })] }));
};
export default Content;
//# sourceMappingURL=Content.js.map