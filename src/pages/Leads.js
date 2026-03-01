"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Filter, Download, Mail, Phone, MoreHorizontal, Eye, Users, UserCheck, Clock, LayoutList, LayoutGrid, Loader2 } from 'lucide-react';
import CreateLeadModal from '../components/CreateLeadModal';
import LeadKanbanBoard from '../components/LeadKanbanBoard';
import { toast } from 'sonner';
import { dbService } from '../services/api.service';
import { useClient } from '../context/ClientContext';
const Leads = () => {
    const navigate = useNavigate();
    const { selectedClient } = useClient();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [viewMode, setViewMode] = React.useState('list');
    const [leads, setLeads] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await dbService.getLeads();
            // Simulando filtro por cliente
            setLeads(data);
            setLoading(false);
        };
        fetchData();
    }, [selectedClient.id]);
    const filteredLeads = leads.filter(lead => lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.source.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleExport = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: `Preparando exportação de ${selectedClient.name}...`,
            success: 'Leads exportados com sucesso!',
            error: 'Erro ao exportar leads.',
        });
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Gest\u00E3o de Leads" }), _jsxs("p", { className: "text-slate-500", children: ["Contatos gerados para ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsxs("div", { className: "flex items-center space-x-3 w-full md:w-auto", children: [_jsxs("div", { className: "bg-slate-100 p-1 rounded-lg flex", children: [_jsxs(Button, { variant: viewMode === 'list' ? 'white' : 'ghost', size: "sm", className: `h-8 px-3 ${viewMode === 'list' ? 'shadow-sm bg-white' : 'text-slate-500'}`, onClick: () => setViewMode('list'), children: [_jsx(LayoutList, { size: 16, className: "mr-2" }), " Lista"] }), _jsxs(Button, { variant: viewMode === 'board' ? 'white' : 'ghost', size: "sm", className: `h-8 px-3 ${viewMode === 'board' ? 'shadow-sm bg-white' : 'text-slate-500'}`, onClick: () => setViewMode('board'), children: [_jsx(LayoutGrid, { size: 16, className: "mr-2" }), " Quadro"] })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleExport, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " Exportar"] }), _jsx(CreateLeadModal, {})] })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [
                    { label: 'Total Leads', value: leads.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Novos hoje', value: '12', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Aguardando', value: '45', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Convertidos', value: '8', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (_jsxs("div", { className: "bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl ${stat.bg} ${stat.color}`, children: _jsx(stat.icon, { size: 20 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: stat.label }), _jsx("p", { className: "text-xl font-black text-slate-900", children: stat.value })] })] }, i))) }), loading ? (_jsxs("div", { className: "p-20 flex flex-col justify-center items-center bg-white rounded-2xl border border-slate-200", children: [_jsx(Loader2, { className: "animate-spin text-blue-600 mb-4", size: 40 }), _jsxs("span", { className: "text-slate-500 font-medium", children: ["Buscando leads de ", selectedClient.name, "..."] })] })) : viewMode === 'list' ? (_jsxs("div", { className: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", children: [_jsxs("div", { className: "p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30", children: [_jsxs("div", { className: "relative w-full max-w-sm", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400", size: 16 }), _jsx(Input, { placeholder: "Pesquisar contatos...", className: "pl-9 bg-white border-slate-200 focus:ring-blue-500", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-slate-500 hover:text-slate-900 ml-4", children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), " Filtros"] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left", children: [_jsx("thead", { className: "bg-slate-50/50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Nome" }), _jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Contato" }), _jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Origem" }), _jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Status" }), _jsx("th", { className: "px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right", children: "A\u00E7\u00F5es" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100", children: filteredLeads.map((lead) => (_jsxs("tr", { className: "hover:bg-slate-50/50 transition-colors group", children: [_jsxs("td", { className: "px-6 py-4", children: [_jsx("p", { className: "font-bold text-slate-900", children: lead.name }), _jsx("p", { className: "text-[10px] text-slate-400 uppercase font-medium", children: lead.date })] }), _jsx("td", { className: "px-6 py-4", children: _jsxs("div", { className: "flex flex-col space-y-0.5", children: [_jsxs("div", { className: "flex items-center text-xs text-slate-600", children: [_jsx(Mail, { size: 12, className: "mr-1.5 text-slate-400" }), " ", lead.email] }), _jsxs("div", { className: "flex items-center text-xs text-slate-600", children: [_jsx(Phone, { size: 12, className: "mr-1.5 text-slate-400" }), " ", lead.phone] })] }) }), _jsx("td", { className: "px-6 py-4", children: _jsx(Badge, { variant: "outline", className: "bg-slate-50 text-slate-600 border-slate-200 font-medium text-[10px]", children: lead.source }) }), _jsx("td", { className: "px-6 py-4", children: _jsx(Badge, { className: `font-bold text-[9px] px-2 py-0.5 ${lead.status === 'Novo' ? 'bg-blue-100 text-blue-700' :
                                                        lead.status === 'Convertido' ? 'bg-green-100 text-green-700' :
                                                            'bg-slate-100 text-slate-600'} border-none`, children: lead.status.toUpperCase() }) }), _jsx("td", { className: "px-6 py-4 text-right", children: _jsxs("div", { className: "flex items-center justify-end space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50", onClick: () => navigate(`/leads/${lead.id}`), children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-slate-400", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) })] }) })] }, lead.id))) })] }) })] })) : (_jsx(LeadKanbanBoard, {}))] }));
};
export default Leads;
//# sourceMappingURL=Leads.js.map