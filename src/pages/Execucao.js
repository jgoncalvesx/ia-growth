"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { PlayCircle, CheckCircle2, AlertTriangle, Zap, RotateCw, Terminal, ShieldAlert, X, Loader2, Clock, History } from 'lucide-react';
import { fetchAcoesPendentes, executarAcao, ignorarAcao, fetchAuditLog } from '../services/api.service';
import { toast } from 'sonner';
import { useClient } from '../context/ClientContext';
const Execucao = () => {
    const { selectedClient } = useClient();
    const [loading, setLoading] = React.useState(true);
    const [acoes, setAcoes] = React.useState([]);
    const [logs, setLogs] = React.useState([]);
    const [selectedAcao, setSelectedAcao] = React.useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [executing, setExecuting] = React.useState(false);
    const loadData = async () => {
        setLoading(true);
        try {
            const [acoesData, logsData] = await Promise.all([
                fetchAcoesPendentes(),
                fetchAuditLog()
            ]);
            setAcoes(Array.isArray(acoesData) ? acoesData : []);
            setLogs(Array.isArray(logsData) ? logsData : []);
        }
        catch (error) {
            toast.error('Erro ao conectar com a central de execução.');
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        loadData();
    }, [selectedClient.id]);
    const handleIgnorar = async (id) => {
        try {
            await ignorarAcao(id);
            setAcoes(prev => prev.filter(a => a.id !== id));
            toast.info('Ação ignorada e removida da lista.');
        }
        catch (error) {
            toast.error('Erro ao ignorar ação.');
        }
    };
    const handleConfirmarExecucao = async () => {
        if (!selectedAcao)
            return;
        setExecuting(true);
        try {
            await executarAcao(selectedAcao.id);
            setAcoes(prev => prev.filter(a => a.id !== selectedAcao.id));
            toast.success(`Executado: ${selectedAcao.titulo}`);
            setIsConfirmOpen(false);
            loadData(); // Recarrega para atualizar o audit log
        }
        catch (error) {
            toast.error('Erro na execução do comando via API.');
        }
        finally {
            setExecuting(false);
            setSelectedAcao(null);
        }
    };
    const getUrgencyBadge = (urgencia) => {
        switch (urgencia) {
            case 'alta':
                return _jsx(Badge, { className: "bg-red-100 text-red-700 hover:bg-red-100 border-none", children: "Urgente" });
            case 'media':
                return _jsx(Badge, { className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none", children: "Aten\u00E7\u00E3o" });
            default:
                return _jsx(Badge, { className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none", children: "Otimiza\u00E7\u00E3o" });
        }
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-black text-slate-900 flex items-center", children: [_jsx(PlayCircle, { className: "mr-3 text-blue-600", size: 28 }), " Central de Execu\u00E7\u00E3o"] }), _jsx("p", { className: "text-slate-500", children: loading ? 'Sincronizando...' : `${acoes.length} ações pendentes de aprovação` })] }), _jsxs(Button, { variant: "outline", onClick: loadData, disabled: loading, className: "bg-white", children: [_jsx(RotateCw, { className: `mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}` }), " Atualizar"] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsxs("div", { className: "lg:col-span-7 space-y-6", children: [_jsx("h3", { className: "text-sm font-bold text-slate-400 uppercase tracking-widest px-1", children: "A\u00E7\u00F5es Pendentes" }), loading ? (_jsx("div", { className: "space-y-4", children: [1, 2].map(i => (_jsx(Card, { className: "animate-pulse bg-white border-slate-200 h-64" }, i))) })) : acoes.length > 0 ? (_jsx("div", { className: "space-y-4", children: acoes.map((acao) => (_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm overflow-hidden hover:border-blue-200 transition-colors", children: [_jsx(CardHeader, { className: "pb-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg font-bold text-slate-900", children: acao.titulo }), _jsx("p", { className: "text-xs text-slate-500 font-medium", children: acao.conta_nome })] }), getUrgencyBadge(acao.urgencia)] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-slate-50 p-4 rounded-lg border border-slate-100", children: [_jsxs("p", { className: "text-xs font-bold text-slate-400 uppercase mb-2 flex items-center", children: [_jsx(Zap, { size: 12, className: "mr-1 text-blue-600" }), " Racional da IA"] }), _jsxs("p", { className: "text-sm text-slate-700 italic leading-relaxed", children: ["\"", acao.racional, "\""] })] }), _jsxs("div", { className: "bg-slate-900 p-3 rounded-lg flex items-center space-x-3 group", children: [_jsx(Terminal, { size: 14, className: "text-slate-500" }), _jsx("code", { className: "text-xs text-blue-400 font-mono truncate", children: acao.comando_api })] }), _jsxs("div", { className: "flex items-center text-green-600 font-bold text-sm", children: [_jsx(CheckCircle2, { size: 16, className: "mr-2" }), "Economia estimada: ", acao.economia_estimada] })] }), _jsxs(CardFooter, { className: "bg-slate-50/50 p-4 border-t border-slate-100 flex justify-end space-x-3", children: [_jsxs(Button, { variant: "ghost", className: "text-slate-500 hover:text-red-600", onClick: () => handleIgnorar(acao.id), children: [_jsx(X, { size: 16, className: "mr-2" }), " Ignorar"] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 shadow-sm", onClick: () => {
                                                        setSelectedAcao(acao);
                                                        setIsConfirmOpen(true);
                                                    }, children: "Aprovar e Executar" })] })] }, acao.id))) })) : (_jsxs("div", { className: "bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4", children: _jsx(CheckCircle2, { size: 32 }) }), _jsx("h4", { className: "text-lg font-bold text-slate-900", children: "Nenhuma a\u00E7\u00E3o pendente no momento \u2713" }), _jsx("p", { className: "text-slate-500 mt-2", children: "Sua opera\u00E7\u00E3o est\u00E1 rodando com performance m\u00E1xima." })] }))] }), _jsx("div", { className: "lg:col-span-5", children: _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm sticky top-24", children: [_jsx(CardHeader, { className: "border-b border-slate-50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center", children: [_jsx(History, { size: 16, className: "mr-2" }), " Hist\u00F3rico de Hoje"] }), _jsx(Badge, { variant: "outline", className: "text-[10px] font-bold", children: "AUDIT LOG" })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx(ScrollArea, { className: "h-[600px]", children: _jsx("div", { className: "divide-y divide-slate-50", children: logs.length > 0 ? logs.map((log) => (_jsxs("div", { className: "p-4 hover:bg-slate-50/50 transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-1", children: [_jsx("span", { className: "text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded", children: log.hora }), _jsx("span", { className: "text-[10px] font-bold text-blue-600 uppercase", children: log.executado_por })] }), _jsxs("p", { className: "text-xs text-slate-700 leading-relaxed", children: [log.mensagem, " ", _jsx("span", { className: "font-bold", children: log.alvo })] })] }, log.id))) : (_jsx("div", { className: "p-8 text-center text-slate-400 text-xs", children: "Nenhum registro de atividade hoje." })) }) }) })] }) })] }), _jsx(Dialog, { open: isConfirmOpen, onOpenChange: setIsConfirmOpen, children: _jsxs(DialogContent, { className: "bg-white sm:max-w-[450px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Confirmar Execu\u00E7\u00E3o" }), _jsx(DialogDescription, { children: "Voc\u00EA est\u00E1 prestes a autorizar uma altera\u00E7\u00E3o direta na API da plataforma de an\u00FAncios." })] }), selectedAcao && (_jsxs("div", { className: "py-4 space-y-4", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "A\u00E7\u00E3o" }), _jsx("p", { className: "text-sm font-bold text-slate-900", children: selectedAcao.titulo })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "Comando T\u00E9cnico" }), _jsx("div", { className: "bg-slate-900 p-2 rounded font-mono text-xs text-blue-400", children: selectedAcao.comando_api })] }), _jsxs("div", { className: "flex items-center text-green-600 font-bold text-xs", children: [_jsx(CheckCircle2, { size: 14, className: "mr-2" }), "Economia estimada: ", selectedAcao.economia_estimada] }), _jsxs("div", { className: "bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-start space-x-3 text-orange-700", children: [_jsx(ShieldAlert, { size: 18, className: "flex-shrink-0 mt-0.5" }), _jsx("p", { className: "text-xs leading-relaxed font-medium", children: "Aviso: Esta a\u00E7\u00E3o pode ser desfeita atrav\u00E9s do log de atividades em at\u00E9 2 horas ap\u00F3s a execu\u00E7\u00E3o." })] })] })), _jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [_jsx(Button, { variant: "outline", onClick: () => setIsConfirmOpen(false), disabled: executing, children: "Cancelar" }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", onClick: handleConfirmarExecucao, disabled: executing, children: [executing ? _jsx(Loader2, { className: "animate-spin mr-2", size: 16 }) : null, "Confirmar e Executar"] })] })] }) })] }));
};
export default Execucao;
//# sourceMappingURL=Execucao.js.map