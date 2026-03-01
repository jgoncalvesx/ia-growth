"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Filter, ArrowDown, Users, MousePointer2, ShoppingBag, Heart, TrendingUp, AlertCircle } from 'lucide-react';
const funnelStages = [
    {
        id: 'awareness',
        name: 'Conscientização',
        value: '1.2M',
        subtext: 'Impressões / Alcance',
        color: 'bg-blue-500',
        conversion: '4.2%',
        icon: Users
    },
    {
        id: 'consideration',
        name: 'Consideração',
        value: '50.4k',
        subtext: 'Cliques / Visitas',
        color: 'bg-purple-500',
        conversion: '12.5%',
        icon: MousePointer2
    },
    {
        id: 'conversion',
        name: 'Conversão',
        value: '6.3k',
        subtext: 'Vendas / Leads Qualificados',
        color: 'bg-green-500',
        conversion: '25.0%',
        icon: ShoppingBag
    },
    {
        id: 'loyalty',
        name: 'Fidelização',
        value: '1.5k',
        subtext: 'Recompra / Indicações',
        color: 'bg-pink-500',
        conversion: null,
        icon: Heart
    },
];
const Funnel = () => {
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "Funil de Marketing" }), _jsx("p", { className: "text-slate-500", children: "Visualize a efici\u00EAncia da sua jornada de convers\u00E3o de ponta a ponta." })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("div", { className: "lg:col-span-7 space-y-4", children: funnelStages.map((stage, index) => (_jsx(React.Fragment, { children: _jsxs("div", { className: "relative group", children: [_jsx(Card, { className: `border-none shadow-md overflow-hidden transition-all hover:scale-[1.01]`, children: _jsxs("div", { className: "flex h-24", children: [_jsx("div", { className: `w-2 ${stage.color}` }), _jsxs("div", { className: "flex-1 p-6 flex items-center justify-between bg-white", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `p-3 rounded-xl ${stage.color} bg-opacity-10 ${stage.color.replace('bg-', 'text-')}`, children: _jsx(stage.icon, { size: 24 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-slate-900", children: stage.name }), _jsx("p", { className: "text-xs text-slate-500", children: stage.subtext })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-2xl font-black text-slate-900", children: stage.value }), index === 0 && _jsx(Badge, { variant: "outline", className: "text-[10px]", children: "Topo do Funil" })] })] })] }) }), stage.conversion && (_jsx("div", { className: "flex justify-center -my-2 relative z-10", children: _jsxs("div", { className: "bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center shadow-lg", children: [_jsx(ArrowDown, { size: 12, className: "mr-1 text-blue-400" }), "Taxa de Convers\u00E3o: ", stage.conversion] }) }))] }) }, stage.id))) }), _jsxs("div", { className: "lg:col-span-5 space-y-6", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(TrendingUp, { className: "mr-2 text-green-600", size: 20 }), " Performance do Funil"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-slate-50 rounded-xl border border-slate-100", children: [_jsx("p", { className: "text-xs font-bold text-slate-400 uppercase mb-2", children: "Custo por Aquisi\u00E7\u00E3o (CAC)" }), _jsxs("div", { className: "flex items-end space-x-2", children: [_jsx("span", { className: "text-3xl font-bold text-slate-900", children: "R$ 42,50" }), _jsx("span", { className: "text-xs text-green-600 font-bold mb-1", children: "-12% vs m\u00EAs ant." })] })] }), _jsxs("div", { className: "p-4 bg-slate-50 rounded-xl border border-slate-100", children: [_jsx("p", { className: "text-xs font-bold text-slate-400 uppercase mb-2", children: "LTV (Lifetime Value)" }), _jsxs("div", { className: "flex items-end space-x-2", children: [_jsx("span", { className: "text-3xl font-bold text-slate-900", children: "R$ 850,00" }), _jsx("span", { className: "text-xs text-blue-600 font-bold mb-1", children: "ROI: 20x" })] })] }), _jsxs("div", { className: "pt-4 border-t border-slate-100", children: [_jsxs("h4", { className: "text-sm font-bold text-slate-900 mb-3 flex items-center", children: [_jsx(AlertCircle, { className: "mr-2 text-orange-500", size: 16 }), " Gargalos Identificados"] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5" }), _jsxs("p", { className: "text-xs text-slate-600", children: ["Queda de 15% na transi\u00E7\u00E3o de ", _jsx("strong", { children: "Considera\u00E7\u00E3o" }), " para ", _jsx("strong", { children: "Convers\u00E3o" }), " no mobile."] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" }), _jsxs("p", { className: "text-xs text-slate-600", children: ["O tempo m\u00E9dio no est\u00E1gio de ", _jsx("strong", { children: "Conscientiza\u00E7\u00E3o" }), " aumentou para 4 dias."] })] })] })] })] })] }), _jsx(Card, { className: "bg-blue-600 text-white border-none shadow-lg", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "font-bold mb-2", children: "Otimiza\u00E7\u00E3o Sugerida" }), _jsx("p", { className: "text-sm text-blue-100 mb-4", children: "Sua taxa de fideliza\u00E7\u00E3o est\u00E1 acima da m\u00E9dia do mercado. Que tal criar um programa de indica\u00E7\u00E3o para reduzir o CAC do topo do funil?" }), _jsx("button", { className: "w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors", children: "Criar Campanha de Indica\u00E7\u00E3o" })] }) })] })] })] }));
};
export default Funnel;
//# sourceMappingURL=Funnel.js.map