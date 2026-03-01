"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    { name: 'Seg', reach: 4000, engagement: 2400 },
    { name: 'Ter', reach: 3000, engagement: 1398 },
    { name: 'Qua', reach: 2000, engagement: 9800 },
    { name: 'Qui', reach: 2780, engagement: 3908 },
    { name: 'Sex', reach: 1890, engagement: 4800 },
    { name: 'Sáb', reach: 2390, engagement: 3800 },
    { name: 'Dom', reach: 3490, engagement: 4300 },
];
const PerformanceChart = () => {
    return (_jsxs(Card, { className: "col-span-2 bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold text-slate-900", children: "Vis\u00E3o Geral de Performance" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-[300px] w-full", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "colorReach", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "#3b82f6", stopOpacity: 0.1 }), _jsx("stop", { offset: "95%", stopColor: "#3b82f6", stopOpacity: 0 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#e2e8f0" }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tick: { fill: '#64748b' } }), _jsx(YAxis, { axisLine: false, tickLine: false, tick: { fill: '#64748b' } }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' } }), _jsx(Area, { type: "monotone", dataKey: "reach", stroke: "#3b82f6", fillOpacity: 1, fill: "url(#colorReach)", strokeWidth: 2 })] }) }) }) })] }));
};
export default PerformanceChart;
//# sourceMappingURL=PerformanceChart.js.map