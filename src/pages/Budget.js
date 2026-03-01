"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { DollarSign, TrendingUp, AlertCircle, Zap, ArrowUpRight, PieChart as PieChartIcon, Calendar, Save, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'sonner';
import { fetchDadosBudget } from '../services/api.service';
import { useClient } from '../context/ClientContext';
const Budget = () => {
    const { selectedClient } = useClient();
    const [loading, setLoading] = React.useState(true);
    const [budgetData, setBudgetData] = React.useState([]);
    const loadBudget = async () => {
        setLoading(true);
        try {
            const data = await fetchDadosBudget(selectedClient.id);
            setBudgetData(Array.isArray(data) ? data : []);
        }
        catch (error) {
            console.error("Erro ao carregar orçamento", error);
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        loadBudget();
    }, [selectedClient.id]);
    const totalPlanned = budgetData.reduce((acc, item) => acc + item.planned, 0);
    const totalActual = budgetData.reduce((acc, item) => acc + item.actual, 0);
    const percentageUsed = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;
    const handleOptimize = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'IA analisando ROAS por plataforma...',
            success: 'Otimização sugerida: Mover R$ 800 do Google Ads para Meta Ads.',
            error: 'Erro ao processar otimização.',
        });
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "h-[60vh] flex items-center justify-center", children: _jsx(Loader2, { className: "animate-spin text-blue-600", size: 32 }) }) }));
    }
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Planejamento de Or\u00E7amento" }), _jsxs("p", { className: "text-slate-500", children: ["Gest\u00E3o financeira de ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { variant: "outline", className: "bg-white", children: [_jsx(Calendar, { className: "mr-2 h-4 w-4" }), " Junho 2024"] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100", children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), " Salvar Plano"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(Card, { className: "bg-white border-slate-200 shadow-sm border-b-4 border-b-blue-500", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Or\u00E7amento Total" }), _jsx(DollarSign, { className: "text-blue-600", size: 20 })] }), _jsxs("p", { className: "text-2xl font-black text-slate-900", children: ["R$ ", totalPlanned.toLocaleString()] })] }) }), _jsx(Card, { className: "bg-white border-slate-200 shadow-sm border-b-4 border-b-green-500", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Gasto Atual" }), _jsx(TrendingUp, { className: "text-green-600", size: 20 })] }), _jsxs("p", { className: "text-2xl font-black text-slate-900", children: ["R$ ", totalActual.toLocaleString()] }), _jsx(Progress, { value: percentageUsed, className: "h-1.5 mt-4" })] }) }), _jsx(Card, { className: "bg-white border-slate-200 shadow-sm border-b-4 border-b-orange-500", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: "Saldo Dispon\u00EDvel" }), _jsx(AlertCircle, { className: "text-orange-600", size: 20 })] }), _jsxs("p", { className: "text-2xl font-black text-slate-900", children: ["R$ ", (totalPlanned - totalActual).toLocaleString()] })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(Card, { className: "lg:col-span-2 bg-white border-slate-200 shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between border-b border-slate-50 mb-6", children: [_jsx(CardTitle, { className: "text-lg font-bold", children: "Investimento por Plataforma" }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-blue-600 font-bold", onClick: handleOptimize, children: [_jsx(Zap, { size: 14, className: "mr-2" }), " Otimizar com IA"] })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[350px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: budgetData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }), _jsx(XAxis, { dataKey: "platform", axisLine: false, tickLine: false, tick: { fontSize: 10, fill: '#94a3b8' } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 10, fill: '#94a3b8' } }), _jsx(Tooltip, { cursor: { fill: '#f8fafc' }, contentStyle: { borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' } }), _jsx(Bar, { dataKey: "planned", name: "Planejado", fill: "#e2e8f0", radius: [4, 4, 0, 0] }), _jsx(Bar, { dataKey: "actual", name: "Realizado", radius: [4, 4, 0, 0], children: budgetData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) })] }) }) }) })] }), _jsxs(Card, { className: "bg-slate-900 text-white border-none shadow-xl overflow-hidden", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-bold flex items-center", children: [_jsx(Zap, { className: "mr-2 text-yellow-400", size: 20 }), " Insights de IA"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-white/10 rounded-xl border border-white/5", children: [_jsx("p", { className: "text-[10px] font-bold text-yellow-400 uppercase mb-1", children: "Alerta de Gasto" }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Google Ads est\u00E1 15% acima do planejado para este per\u00EDodo. Considere reduzir lances em keywords caras." })] }), _jsxs("div", { className: "p-4 bg-white/10 rounded-xl border border-white/5", children: [_jsx("p", { className: "text-[10px] font-bold text-green-400 uppercase mb-1", children: "Oportunidade" }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Meta Ads apresenta o melhor ROAS (6.2x). Aumentar o budget em R$ 500 pode gerar +15 vendas." })] }), _jsx(Button, { className: "w-full bg-blue-600 hover:bg-blue-700 border-none font-bold py-6", onClick: handleOptimize, children: "Aplicar Otimiza\u00E7\u00F5es" })] })] })] })] }));
};
export default Budget;
//# sourceMappingURL=Budget.js.map