"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Book, MessageCircle, Video, FileText, ExternalLink, HelpCircle, ChevronRight } from 'lucide-react';
const Help = () => {
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900 mb-4", children: "Como podemos ajudar?" }), _jsxs("div", { className: "relative max-w-xl mx-auto", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400", size: 20 }), _jsx(Input, { placeholder: "Busque por tutoriais, artigos ou d\u00FAvidas...", className: "pl-12 h-14 text-lg shadow-sm border-slate-200 focus:ring-blue-500" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12", children: [
                        { icon: Book, title: 'Documentação', desc: 'Guias detalhados de todas as ferramentas.', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { icon: Video, title: 'Tutoriais em Vídeo', desc: 'Aprenda visualmente como configurar o MidiaOS.', color: 'text-purple-600', bg: 'bg-purple-50' },
                        { icon: MessageCircle, title: 'Suporte ao Vivo', desc: 'Fale com nosso time de especialistas agora.', color: 'text-green-600', bg: 'bg-green-50' },
                    ].map((item, i) => (_jsx(Card, { className: "bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: `w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`, children: _jsx(item.icon, { size: 24 }) }), _jsx("h3", { className: "font-bold text-slate-900 mb-2", children: item.title }), _jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: item.desc })] }) }, i))) }), _jsxs("div", { className: "space-y-8", children: [_jsx("h3", { className: "text-xl font-bold text-slate-900", children: "D\u00FAvidas Frequentes" }), _jsx("div", { className: "space-y-3", children: [
                                'Como conectar minha conta do Meta Ads?',
                                'Como funciona o gerador de copies com IA?',
                                'Posso exportar meus leads para um CRM externo?',
                                'Como configurar alertas de orçamento crítico?',
                                'Como convidar novos membros para minha equipe?'
                            ].map((q, i) => (_jsxs("div", { className: "p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-200 cursor-pointer transition-colors group", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(HelpCircle, { size: 18, className: "text-slate-400 group-hover:text-blue-500" }), _jsx("span", { className: "text-sm font-medium text-slate-700", children: q })] }), _jsx(ChevronRight, { size: 16, className: "text-slate-300" })] }, i))) })] }), _jsx(Card, { className: "mt-12 bg-slate-900 text-white border-none shadow-xl overflow-hidden", children: _jsxs(CardContent, { className: "p-8 flex flex-col md:flex-row items-center justify-between", children: [_jsxs("div", { className: "mb-6 md:mb-0 text-center md:text-left", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: "Ainda precisa de ajuda?" }), _jsx("p", { className: "text-slate-400 text-sm", children: "Nosso time de suporte est\u00E1 dispon\u00EDvel 24/7 para voc\u00EA." })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { className: "bg-blue-600 hover:bg-blue-700 border-none", children: "Abrir Ticket" }), _jsx(Button, { variant: "outline", className: "border-slate-700 text-white hover:bg-slate-800", children: "Ver Status do Sistema" })] })] }) })] }) }));
};
export default Help;
//# sourceMappingURL=Help.js.map