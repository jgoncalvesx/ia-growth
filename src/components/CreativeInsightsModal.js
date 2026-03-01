"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from './ui/dialog';
import { Badge } from './ui/badge';
import { Brain, Target, Zap, MessageSquare, TrendingUp } from 'lucide-react';
const CreativeInsightsModal = ({ open, onOpenChange, item }) => {
    if (!item)
        return null;
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[600px] bg-white", children: [_jsx(DialogHeader, { children: _jsxs(DialogTitle, { className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "text-purple-600", size: 24 }), _jsxs("span", { children: ["Insights de IA: ", item.title] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 py-4", children: [_jsx("div", { className: "aspect-video rounded-lg overflow-hidden border border-slate-200", children: _jsx("img", { src: item.thumbnail, alt: item.title, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-3 bg-purple-50 rounded-lg border border-purple-100", children: [_jsx("p", { className: "text-xs font-bold text-purple-700 uppercase mb-1", children: "Score de Performance" }), _jsxs("div", { className: "flex items-end space-x-2", children: [_jsx("span", { className: "text-3xl font-bold text-purple-900", children: "8.5" }), _jsx("span", { className: "text-sm text-purple-600 mb-1", children: "/ 10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xs font-bold text-slate-500 uppercase", children: "P\u00FAblico-Alvo Sugerido" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { variant: "secondary", children: "Jovens 18-24" }), _jsx(Badge, { variant: "secondary", children: "Interesse em Moda" }), _jsx(Badge, { variant: "secondary", children: "Mobile Users" })] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h4", { className: "font-semibold text-slate-900 flex items-center", children: [_jsx(Zap, { className: "mr-2 text-orange-500", size: 18 }), " Sugest\u00F5es de Otimiza\u00E7\u00E3o"] }), _jsx("div", { className: "grid grid-cols-1 gap-3", children: [
                                { icon: MessageSquare, text: "Adicione uma CTA mais clara nos primeiros 3 segundos.", color: "text-blue-600" },
                                { icon: Target, text: "O contraste das cores está baixo para visualização em ambientes externos.", color: "text-red-600" },
                                { icon: TrendingUp, text: "Este formato performa 25% melhor em horários noturnos.", color: "text-green-600" },
                            ].map((tip, i) => (_jsxs("div", { className: "flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-100", children: [_jsx(tip.icon, { className: `${tip.color} mt-0.5`, size: 16 }), _jsx("p", { className: "text-sm text-slate-700", children: tip.text })] }, i))) })] })] }) }));
};
export default CreativeInsightsModal;
//# sourceMappingURL=CreativeInsightsModal.js.map