"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Megaphone, Users, FileVideo, Zap, Settings, X, ArrowRight } from 'lucide-react';
const CommandPalette = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');
    const actions = [
        { icon: Megaphone, label: 'Ver Campanhas', path: '/campaigns', category: 'Navegação' },
        { icon: Users, label: 'Gerenciar Leads', path: '/leads', category: 'Navegação' },
        { icon: FileVideo, label: 'Biblioteca de Conteúdo', path: '/content', category: 'Navegação' },
        { icon: Zap, label: 'Criar Automação', path: '/workflows', category: 'Ações' },
        { icon: Settings, label: 'Configurações da Conta', path: '/settings', category: 'Sistema' },
    ];
    const filteredActions = actions.filter(action => action.label.toLowerCase().includes(query.toLowerCase()));
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsxs("div", { className: "fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm", onClick: onClose }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, className: "w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-slate-200", children: [_jsxs("div", { className: "p-4 border-b border-slate-100 flex items-center space-x-3", children: [_jsx(Search, { className: "text-slate-400", size: 20 }), _jsx("input", { autoFocus: true, placeholder: "O que voc\u00EA est\u00E1 procurando? (Ex: Campanhas, Leads...)", className: "flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 text-lg", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx("button", { onClick: onClose, className: "p-1 hover:bg-slate-100 rounded-md text-slate-400", children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: "max-h-[400px] overflow-y-auto p-2", children: filteredActions.length > 0 ? (_jsx("div", { className: "space-y-4 p-2", children: ['Navegação', 'Ações', 'Sistema'].map(category => {
                                    const categoryActions = filteredActions.filter(a => a.category === category);
                                    if (categoryActions.length === 0)
                                        return null;
                                    return (_jsxs("div", { children: [_jsx("h3", { className: "px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest", children: category }), _jsx("div", { className: "space-y-1", children: categoryActions.map((action) => (_jsxs("button", { className: "w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-blue-50 group transition-colors text-left", onClick: () => {
                                                        navigate(action.path);
                                                        onClose();
                                                    }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-slate-50 group-hover:bg-white text-slate-500 group-hover:text-blue-600 transition-colors", children: _jsx(action.icon, { size: 18 }) }), _jsx("span", { className: "font-medium text-slate-700 group-hover:text-slate-900", children: action.label })] }), _jsx(ArrowRight, { size: 16, className: "text-slate-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" })] }, action.label))) })] }, category));
                                }) })) : (_jsx("div", { className: "p-12 text-center", children: _jsxs("p", { className: "text-slate-500", children: ["Nenhum resultado encontrado para \"", query, "\""] }) })) }), _jsxs("div", { className: "p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-medium", children: [_jsxs("div", { className: "flex space-x-4", children: [_jsxs("span", { children: [_jsx("kbd", { className: "bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm mr-1", children: "\u21B5" }), " para selecionar"] }), _jsxs("span", { children: [_jsx("kbd", { className: "bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm mr-1", children: "\u2191\u2193" }), " para navegar"] })] }), _jsxs("span", { children: [_jsx("kbd", { className: "bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm mr-1", children: "ESC" }), " para fechar"] })] })] })] }) }));
};
export default CommandPalette;
//# sourceMappingURL=CommandPalette.js.map