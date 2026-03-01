"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Grid, MessageSquare, Mail, Zap, Database, Share2, CheckCircle2, ExternalLink, Plus } from 'lucide-react';
import { toast } from 'sonner';
const integrationApps = [
    { id: 1, name: 'Slack', category: 'Comunicação', description: 'Receba alertas de leads e performance direto nos canais.', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50', connected: true },
    { id: 2, name: 'Zapier', category: 'Automação', description: 'Conecte o MidiaOS a mais de 5.000 aplicativos.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', connected: false },
    { id: 3, name: 'Mailchimp', category: 'E-mail Marketing', description: 'Sincronize seus leads automaticamente com suas listas.', icon: Mail, color: 'text-yellow-600', bg: 'bg-yellow-50', connected: true },
    { id: 4, name: 'HubSpot', category: 'CRM', description: 'Mantenha seu funil de vendas sempre atualizado.', icon: Database, color: 'text-orange-600', bg: 'bg-orange-50', connected: false },
    { id: 5, name: 'WhatsApp', category: 'Comunicação', description: 'Envie mensagens automáticas para novos leads.', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', connected: false },
    { id: 6, name: 'Google Sheets', category: 'Dados', description: 'Exporte dados de performance em tempo real.', icon: Grid, color: 'text-green-700', bg: 'bg-green-50', connected: false },
];
const Integrations = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const handleToggleConnect = (name, isConnected) => {
        if (isConnected) {
            toast.info(`${name} desconectado com sucesso.`);
        }
        else {
            toast.success(`Conectando ao ${name}... Redirecionando para autorização.`);
        }
    };
    const filteredApps = integrationApps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.category.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Marketplace de Integra\u00E7\u00F5es" }), _jsx("p", { className: "text-slate-500", children: "Conecte suas ferramentas favoritas para potencializar seus resultados." })] }), _jsxs(Button, { variant: "outline", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Sugerir App"] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-4 mb-8", children: [_jsxs("div", { className: "relative flex-1 min-w-[300px]", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }), _jsx(Input, { placeholder: "Buscar integra\u00E7\u00F5es por nome ou categoria...", className: "pl-10 bg-white", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsx("div", { className: "flex space-x-2", children: ['Todos', 'Comunicação', 'Automação', 'CRM', 'Dados'].map((cat) => (_jsx(Button, { variant: "ghost", size: "sm", className: "text-xs font-medium text-slate-600 hover:bg-slate-100", children: cat }, cat))) })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredApps.map((app) => (_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm hover:shadow-md transition-all group", children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("div", { className: `p-3 rounded-xl ${app.bg} ${app.color}`, children: _jsx(app.icon, { size: 24 }) }), app.connected && (_jsxs(Badge, { className: "bg-green-100 text-green-700 hover:bg-green-100 border-none", children: [_jsx(CheckCircle2, { size: 12, className: "mr-1" }), " Conectado"] }))] }), _jsx(CardTitle, { className: "text-lg font-bold text-slate-900 mt-4", children: app.name }), _jsx("p", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider", children: app.category })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("p", { className: "text-sm text-slate-600 leading-relaxed min-h-[40px]", children: app.description }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-slate-50", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-xs text-slate-500 p-0 h-auto hover:bg-transparent hover:text-slate-900", children: [_jsx(ExternalLink, { size: 14, className: "mr-1" }), " Documenta\u00E7\u00E3o"] }), _jsx(Button, { variant: app.connected ? "outline" : "default", size: "sm", className: !app.connected ? "bg-blue-600 hover:bg-blue-700" : "", onClick: () => handleToggleConnect(app.name, app.connected), children: app.connected ? 'Desconectar' : 'Conectar' })] })] })] }, app.id))) }), _jsxs(Card, { className: "mt-12 bg-slate-900 text-white border-none shadow-lg overflow-hidden relative", children: [_jsx("div", { className: "absolute top-0 right-0 p-8 opacity-10", children: _jsx(Share2, { size: 120 }) }), _jsx(CardContent, { className: "p-8 relative z-10", children: _jsxs("div", { className: "max-w-2xl", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "Precisa de algo personalizado?" }), _jsx("p", { className: "text-slate-400 mb-6", children: "Use nossos Webhooks e API para conectar qualquer sistema propriet\u00E1rio ao MidiaOS. Automatize fluxos de dados complexos com total liberdade." }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 border-none", children: "Configurar Webhook" }), _jsx(Button, { variant: "outline", className: "border-slate-700 text-white hover:bg-slate-800", children: "Ver Documenta\u00E7\u00E3o API" })] })] }) })] })] }));
};
export default Integrations;
//# sourceMappingURL=Integrations.js.map