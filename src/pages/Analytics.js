"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, TrendingDown, Zap, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchMetricasAnalytics } from '../services/api.service';
import { useClient } from '../context/ClientContext';
const Analytics = () => {
    const { selectedClient } = useClient();
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState(null);
    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const result = await fetchMetricasAnalytics(selectedClient.id);
            setData(result);
        }
        catch (error) {
            console.error("Erro ao carregar analytics", error);
        }
        finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        loadAnalytics();
    }, [selectedClient.id]);
    const handleGenerateReport = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'Analisando dados e gerando relatório...',
            success: 'Relatório de performance gerado com sucesso!',
            error: 'Erro ao gerar relatório.',
        });
    };
    if (loading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "h-[60vh] flex items-center justify-center", children: _jsx(Loader2, { className: "animate-spin text-blue-600", size: 32 }) }) }));
    }
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Analytics" }), _jsxs("p", { className: "text-slate-500", children: ["Performance detalhada de ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { variant: "outline", onClick: () => toast.info('IA analisando oportunidades de ROI...'), children: [_jsx(Zap, { className: "mr-2 h-4 w-4 text-orange-500" }), " Otimizar com IA"] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", onClick: handleGenerateReport, children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), " Gerar Relat\u00F3rio"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Distribui\u00E7\u00E3o por Plataforma" }) }), _jsxs(CardContent, { className: "h-[300px]", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data?.plataformas, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: data?.plataformas?.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "flex justify-center flex-wrap gap-4 mt-4", children: data?.plataformas?.map((item) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase", children: item.name })] }, item.name))) })] })] }), _jsxs(Card, { className: "lg:col-span-2 bg-white border-slate-200 shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg font-semibold", children: "Tend\u00EAncia de CPA (R$)" }), _jsxs(Badge, { className: "bg-green-100 text-green-700 border-none font-bold", children: [_jsx(TrendingDown, { size: 12, className: "mr-1" }), " -15% este m\u00EAs"] })] }), _jsx(CardContent, { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: data?.cpaTrend, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }), _jsx(XAxis, { dataKey: "month", axisLine: false, tickLine: false, tick: { fontSize: 12, fill: '#94a3b8' } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fontSize: 12, fill: '#94a3b8' } }), _jsx(Tooltip, { contentStyle: { borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' } }), _jsx(Line, { type: "monotone", dataKey: "cpa", stroke: "#3b82f6", strokeWidth: 3, dot: { r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }, activeDot: { r: 6, strokeWidth: 0 } })] }) }) })] })] }), _jsxs("div", { className: "bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-blue-100", children: [_jsxs("div", { className: "mb-6 md:mb-0 text-center md:text-left", children: [_jsxs("h3", { className: "text-xl font-black mb-2 flex items-center justify-center md:justify-start", children: [_jsx(Zap, { size: 24, className: "mr-2 text-yellow-400" }), " Insight da IA para ", selectedClient.name] }), _jsx("p", { className: "text-blue-100 max-w-2xl", children: "Sua taxa de convers\u00E3o no TikTok Ads subiu 22% esta semana. Recomendamos migrar 10% do or\u00E7amento de Google Search para escalar este canal." })] }), _jsx(Button, { className: "bg-white text-blue-600 hover:bg-blue-50 font-bold px-8", children: "Aplicar agora" })] })] }));
};
export default Analytics;
//# sourceMappingURL=Analytics.js.map