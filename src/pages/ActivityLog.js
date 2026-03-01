"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Filter, User, Megaphone, FileVideo, Settings, Zap, Clock, Download, Loader2 } from 'lucide-react';
import { fetchAuditLog } from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { toast } from 'sonner';
const ActivityLog = () => {
    const { selectedClient } = useClient();
    const [loading, setLoading] = React.useState(true);
    const [activities, setActivities] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const loadActivities = async () => {
        setLoading(true);
        try {
            const data = await fetchAuditLog();
            setActivities(Array.isArray(data) ? data : []);
        }
        catch (error) {
            console.error("Erro ao carregar log de atividades", error);
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        loadActivities();
    }, [selectedClient.id]);
    const filteredActivities = activities.filter(act => act.executado_por.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.mensagem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.alvo.toLowerCase().includes(searchTerm.toLowerCase()));
    const getIcon = (tipo) => {
        switch (tipo) {
            case 'automation': return Zap;
            case 'campaign': return Megaphone;
            case 'content': return FileVideo;
            case 'system': return Settings;
            default: return User;
        }
    };
    const getColor = (tipo) => {
        switch (tipo) {
            case 'automation': return 'text-orange-600 bg-orange-50';
            case 'campaign': return 'text-blue-600 bg-blue-50';
            case 'content': return 'text-purple-600 bg-purple-50';
            default: return 'text-slate-600 bg-slate-50';
        }
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Log de Atividades" }), _jsxs("p", { className: "text-slate-500", children: ["Hist\u00F3rico completo para ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsxs(Button, { variant: "outline", onClick: () => toast.success('Log exportado com sucesso!'), children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " Exportar Log"] })] }), _jsxs("div", { className: "bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex items-center space-x-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 18 }), _jsx(Input, { placeholder: "Filtrar por usu\u00E1rio, a\u00E7\u00E3o ou alvo...", className: "pl-10 bg-slate-50 border-none", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-slate-600", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), " Filtros"] })] }), loading ? (_jsx("div", { className: "h-[40vh] flex items-center justify-center", children: _jsx(Loader2, { className: "animate-spin text-blue-600", size: 32 }) })) : (_jsx(Card, { className: "bg-white border-slate-200 shadow-sm overflow-hidden", children: _jsx(CardContent, { className: "p-0", children: _jsx("div", { className: "divide-y divide-slate-100", children: filteredActivities.length > 0 ? filteredActivities.map((activity) => {
                            const Icon = getIcon(activity.tipo);
                            const colorClass = getColor(activity.tipo);
                            return (_jsxs("div", { className: "p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl ${colorClass}`, children: _jsx(Icon, { size: 20 }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-sm", children: [_jsx("span", { className: "font-bold text-slate-900", children: activity.executado_por }), _jsx("span", { className: "text-slate-500 mx-1", children: activity.mensagem }), _jsx("span", { className: "font-bold text-blue-600", children: activity.alvo })] }), _jsxs("div", { className: "flex items-center mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider", children: [_jsx(Clock, { size: 10, className: "mr-1" }), " ", activity.hora] })] })] }), _jsx(Button, { variant: "ghost", size: "sm", className: "opacity-0 group-hover:opacity-100 transition-opacity text-xs", children: "Ver Detalhes" })] }, activity.id));
                        }) : (_jsx("div", { className: "p-12 text-center text-slate-400", children: "Nenhuma atividade encontrada para o filtro selecionado." })) }) }) }))] }));
};
export default ActivityLog;
//# sourceMappingURL=ActivityLog.js.map