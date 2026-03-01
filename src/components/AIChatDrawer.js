"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Brain, Loader2, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { enviarMensagemChat } from '../services/api.service';
const AIChatDrawer = ({ isOpen, onClose }) => {
    const [messages, setMessages] = React.useState([
        { role: 'assistant', content: 'Olá! Sou seu assistente de IA. Posso analisar suas campanhas, sugerir mudanças de orçamento ou responder dúvidas sobre seus leads. Como posso ajudar hoje?' }
    ]);
    const [input, setInput] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const scrollRef = React.useRef(null);
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);
    const handleSend = async () => {
        if (!input.trim() || loading)
            return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);
        try {
            const response = await enviarMensagemChat(userMsg);
            setMessages(prev => [...prev, { role: 'assistant', content: response.analise }]);
        }
        catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, tive um problema ao processar sua pergunta. Verifique sua conexão com o n8n.' }]);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]", onClick: onClose }), _jsxs(motion.div, { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, transition: { type: 'spring', damping: 25, stiffness: 200 }, className: "fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col", children: [_jsxs("div", { className: "p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-blue-600 rounded-lg", children: _jsx(Brain, { size: 20 }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold", children: "IA MidiaOS" }), _jsx("p", { className: "text-[10px] text-blue-300 uppercase tracking-widest font-bold", children: "Assistente Conectado" })] })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-white/10 rounded-full transition-colors", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50", children: [messages.map((msg, idx) => (_jsx("div", { className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`, children: msg.role === 'user' ? _jsx(User, { size: 16 }) : _jsx(Brain, { size: 16 }) }), _jsx("div", { className: `p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                                    : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none'}`, children: msg.content })] }) }, idx))), loading && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "flex space-x-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center", children: _jsx(Loader2, { className: "animate-spin text-slate-400", size: 16 }) }), _jsx("div", { className: "p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-sm", children: _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" }), _jsx("div", { className: "w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" }), _jsx("div", { className: "w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" })] }) })] }) }))] }), _jsxs("div", { className: "p-6 border-t border-slate-100 bg-white", children: [_jsxs("form", { onSubmit: (e) => { e.preventDefault(); handleSend(); }, className: "relative", children: [_jsx(Input, { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Pergunte sobre sua performance...", className: "pr-12 h-12 bg-slate-50 border-slate-200 focus:ring-blue-500" }), _jsx("button", { type: "submit", disabled: !input.trim() || loading, className: "absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent", children: _jsx(Send, { size: 20 }) })] }), _jsx("p", { className: "text-[10px] text-center text-slate-400 mt-3 uppercase font-bold tracking-tighter", children: "A IA pode cometer erros. Revise a\u00E7\u00F5es cr\u00EDticas." })] })] })] })) }));
};
export default AIChatDrawer;
//# sourceMappingURL=AIChatDrawer.js.map