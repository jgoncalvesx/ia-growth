"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Brain, Send, MessageSquare, Loader2, User, AlertCircle, TrendingUp } from 'lucide-react';
import { enviarMensagemChat } from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { cn } from '../lib/utils';
const Chat = () => {
    const { selectedClient } = useClient();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `Olá! Tenho acesso ao contexto completo das contas de ${selectedClient.name}. O que você quer analisar hoje?`
        }
    ]);
    const scrollRef = useRef(null);
    const n8nConnected = !!import.meta.env.VITE_N8N_URL;
    const suggestions = [
        "Quais anúncios tiveram CPL acima da meta nos últimos 7 dias?",
        "Compare qualidade de leads entre Google e Meta este mês",
        "Quais criativos estão com frequência acima de 4?",
        "Resumo de performance desta semana"
    ];
    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, loading]);
    const handleSend = async (text = input) => {
        if (!text.trim() || loading)
            return;
        const userMessage = text.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);
        try {
            const response = await enviarMensagemChat(userMessage, selectedClient.id);
            setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.analise,
                    confidence: response.confianca ? response.confianca * 100 : undefined
                }]);
        }
        catch (error) {
            setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "Desculpe, tive um problema ao processar sua análise. Verifique a conexão com o servidor n8n.",
                    error: true
                }]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "h-[calc(100vh-120px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-black text-slate-900 flex items-center", children: [_jsx(MessageSquare, { className: "mr-2 text-blue-600", size: 24 }), " Chat de An\u00E1lise"] }), _jsx("p", { className: "text-xs text-slate-500 font-medium", children: "Perguntas em linguagem natural \u00B7 Claude analisa seus dados" })] }), _jsxs(Badge, { className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1", children: [_jsx(TrendingUp, { size: 12, className: "mr-1.5" }), " ", selectedClient.name] })] }), _jsx(ScrollArea, { className: "flex-1 p-6", ref: scrollRef, children: _jsxs("div", { className: "space-y-8 max-w-4xl mx-auto", children: [messages.map((msg, idx) => (_jsxs("div", { className: cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start"), children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1", children: msg.role === 'user' ? "VOCÊ" : "MIDIAOS · ANÁLISE" }), _jsxs("div", { className: cn("p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm", msg.role === 'user'
                                            ? "bg-blue-950 text-white border border-blue-800 rounded-tr-none"
                                            : cn("bg-slate-100 text-slate-700 border border-slate-200 rounded-tl-none", msg.error && "border-red-300 bg-red-50 text-red-900")), children: [msg.content, msg.confidence !== undefined && (_jsxs("div", { className: "mt-4 pt-3 border-t border-slate-200/50", children: [_jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-500", children: "CONFIAN\u00C7A DA AN\u00C1LISE" }), _jsxs("span", { className: "text-[10px] font-black text-blue-600", children: [msg.confidence.toFixed(0), "%"] })] }), _jsx("div", { className: "h-1 w-full bg-slate-200 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-blue-500 transition-all duration-1000", style: { width: `${msg.confidence}%` } }) })] }))] })] }, idx))), loading && (_jsxs("div", { className: "flex flex-col items-start", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1", children: "MIDIAOS \u00B7 AN\u00C1LISE" }), _jsxs("div", { className: "bg-slate-100 border border-slate-200 p-4 rounded-2xl rounded-tl-none flex space-x-1.5", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" }), _jsx("div", { className: "w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" }), _jsx("div", { className: "w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" })] })] }))] }) }), _jsxs("div", { className: "p-6 border-t border-slate-100 bg-slate-50/30", children: [messages.length === 1 && !loading && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 max-w-4xl mx-auto", children: suggestions.map((suggestion, i) => (_jsx(Button, { variant: "outline", className: "justify-start text-left h-auto py-3 px-4 text-xs bg-white hover:bg-blue-50 hover:border-blue-200 text-slate-600 border-slate-200 transition-all", onClick: () => handleSend(suggestion), children: suggestion }, i))) })), _jsxs("div", { className: "max-w-4xl mx-auto space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx("textarea", { value: input, onChange: (e) => setInput(e.target.value), onKeyDown: handleKeyDown, placeholder: "Pergunte sobre performance, criativos, qualidade de lead...", rows: Math.min(input.split('\n').length || 1, 4), className: "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none shadow-sm transition-all" }), _jsx(Button, { onClick: () => handleSend(), disabled: !input.trim() || loading, className: "absolute right-2 bottom-2 bg-blue-600 hover:bg-blue-700 h-9 w-9 p-0 rounded-lg shadow-lg shadow-blue-200", children: loading ? _jsx(Loader2, { className: "animate-spin h-4 w-4" }) : _jsx(Send, { size: 18 }) })] }), _jsxs("div", { className: "flex items-center justify-center space-x-2", children: [_jsx("div", { className: cn("w-1.5 h-1.5 rounded-full", n8nConnected ? "bg-green-500" : "bg-orange-500") }), _jsx("p", { className: "text-[10px] font-mono text-slate-400 uppercase tracking-tighter", children: n8nConnected ? "N8N conectado e pronto" : "⚠ Configure VITE_N8N_URL no .env para ativar" })] })] })] })] }) }));
};
export default Chat;
//# sourceMappingURL=Chat.js.map