"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';
const StatCard = ({ title, value, change, isPositive, icon: Icon, iconColor }) => {
    return (_jsx(Card, { className: "bg-white border-slate-200 shadow-sm", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: `p-2 rounded-lg ${iconColor} bg-opacity-10`, children: _jsx(Icon, { className: iconColor.replace('bg-', 'text-'), size: 24 }) }), _jsx("span", { className: `text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`, children: change })] }), _jsx("h3", { className: "text-slate-500 text-sm font-medium", children: title }), _jsx("p", { className: "text-2xl font-bold text-slate-900 mt-1", children: value })] }) }));
};
export default StatCard;
//# sourceMappingURL=StatCard.js.map