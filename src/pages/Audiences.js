"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Target, MapPin, Smartphone, Brain, Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';
const genderData = [
    { name: 'Feminino', value: 65, color: '#ec4899' },
    { name: 'Masculino', value: 30, color: '#3b82f6' },
    { name: 'Outros', value: 5, color: '#94a3b8' },
];
const ageData = [
    { range: '18-24', value: 15 },
    { range: '25-34', value: 45 },
    { range: '35-44', value: 25 },
    { range: '45-54', value: 10 },
    { range: '55+', value: 5 },
];
const deviceData = [
    { name: 'Mobile', value: 82, color: '#8b5cf6' },
    { name: 'Desktop', value: 15, color: '#64748b' },
    { name: 'Tablet', value: 3, color: '#cbd5e1' },
];
const personas = [
    {
        name: 'Mariana, 28',
        role: 'Empreendedora Digital',
        bio: 'Busca ferramentas para escalar seu e-commerce de moda. Valoriza agilidade e design.',
        interests: ['Marketing Digital', 'Moda Sustentável', 'SaaS'],
        painPoints: 'Falta de tempo para criar criativos e gerenciar anúncios manualmente.',
    },
    {
        name: 'Ricardo, 42',
        role: 'Gerente de Marketing',
        bio: 'Focado em ROI e relatórios precisos para diretoria. Prefere dados técnicos.',
        interests: ['Analytics', 'Gestão de Equipes', 'Estratégia'],
        painPoints: 'Dificuldade em consolidar dados de múltiplas plataformas.',
    }
];
const Audiences = () => {
    const handleGeneratePersona = () => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: 'IA analisando dados de conversão...',
            success: 'Nova Persona "Ana, 35 - Consultora de Vendas" gerada com sucesso!',
            error: 'Erro ao gerar persona.',
        });
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900", children: "P\u00FAblico e Personas" }), _jsx("p", { className: "text-slate-500", children: "Entenda quem interage com sua marca e como converter melhor." })] }), _jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", onClick: handleGeneratePersona, children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), " Gerar Persona com IA"] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(Users, { className: "mr-2 text-blue-600", size: 20 }), " G\u00EAnero"] }) }), _jsxs(CardContent, { className: "h-[250px]", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: genderData, innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: genderData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "flex justify-center space-x-4 mt-2", children: genderData.map((item) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-[10px] text-slate-500", children: item.name })] }, item.name))) })] })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(Target, { className: "mr-2 text-orange-500", size: 20 }), " Faixa Et\u00E1ria"] }) }), _jsx(CardContent, { className: "h-[250px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: ageData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }), _jsx(XAxis, { dataKey: "range", axisLine: false, tickLine: false, tick: { fontSize: 12 } }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, { cursor: { fill: '#f8fafc' } }), _jsx(Bar, { dataKey: "value", fill: "#3b82f6", radius: [4, 4, 0, 0] })] }) }) })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(Smartphone, { className: "mr-2 text-purple-600", size: 20 }), " Dispositivos"] }) }), _jsxs(CardContent, { className: "h-[250px]", children: [_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: deviceData, innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: deviceData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }), _jsx("div", { className: "flex justify-center space-x-4 mt-2", children: deviceData.map((item) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "w-2 h-2 rounded-full", style: { backgroundColor: item.color } }), _jsx("span", { className: "text-[10px] text-slate-500", children: item.name })] }, item.name))) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsxs("div", { className: "lg:col-span-8 space-y-6", children: [_jsxs("h3", { className: "text-xl font-bold text-slate-900 flex items-center", children: [_jsx(Brain, { className: "mr-2 text-purple-600", size: 24 }), " Personas Geradas por IA"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [personas.map((persona, i) => (_jsx(Card, { className: "bg-white border-slate-200 shadow-sm hover:border-purple-200 transition-colors", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold", children: persona.name.charAt(0) }), _jsxs("div", { children: [_jsx("h4", { className: "font-bold text-slate-900", children: persona.name }), _jsx("p", { className: "text-xs text-slate-500", children: persona.role })] })] }), _jsx("p", { className: "text-sm text-slate-600 mb-4 leading-relaxed", children: persona.bio }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase mb-1", children: "Interesses" }), _jsx("div", { className: "flex flex-wrap gap-2", children: persona.interests.map((interest, idx) => (_jsx(Badge, { variant: "secondary", className: "bg-slate-100 text-slate-600 border-none", children: interest }, idx))) })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase mb-1", children: "Dores (Pain Points)" }), _jsxs("p", { className: "text-xs text-slate-500 italic", children: ["\"", persona.painPoints, "\""] })] })] })] }) }, i))), _jsxs("button", { className: "border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-slate-50 hover:border-purple-300 hover:text-purple-500 transition-all group", onClick: handleGeneratePersona, children: [_jsx(Plus, { size: 32, className: "mb-2 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "text-sm font-medium", children: "Nova Persona com IA" })] })] })] }), _jsxs("div", { className: "lg:col-span-4 space-y-8", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg font-semibold flex items-center", children: [_jsx(MapPin, { className: "mr-2 text-red-500", size: 20 }), " Principais Cidades"] }) }), _jsx(CardContent, { className: "space-y-4", children: [
                                            { city: 'São Paulo', percentage: 42 },
                                            { city: 'Rio de Janeiro', percentage: 18 },
                                            { city: 'Belo Horizonte', percentage: 12 },
                                            { city: 'Curitiba', percentage: 8 },
                                            { city: 'Porto Alegre', percentage: 5 },
                                        ].map((item, i) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "font-medium text-slate-700", children: item.city }), _jsxs("span", { className: "text-slate-400", children: [item.percentage, "%"] })] }), _jsx("div", { className: "w-full bg-slate-100 h-1.5 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-blue-500 h-full", style: { width: `${item.percentage}%` } }) })] }, i))) })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Interesses em Alta" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-wrap gap-2", children: ['Tecnologia', 'E-commerce', 'Moda', 'Viagens', 'Gastronomia', 'Fitness', 'Investimentos', 'Sustentabilidade', 'Design'].map((tag, i) => (_jsx(Badge, { variant: "outline", className: `cursor-default ${i < 3 ? 'border-purple-200 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-500'}`, children: tag }, i))) }) })] })] })] })] }));
};
export default Audiences;
//# sourceMappingURL=Audiences.js.map