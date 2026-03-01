"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, User, Tag, Send } from 'lucide-react';
import ChangeLeadStatusModal from '../components/ChangeLeadStatusModal';
import { toast } from 'sonner';
const LeadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = React.useState('');
    const [notes, setNotes] = React.useState([
        { id: 1, text: 'Cliente interessado no pacote premium.', date: '20/05/2024 14:30', author: 'Admin' },
        { id: 2, text: 'Solicitou orçamento detalhado por e-mail.', date: '20/05/2024 15:45', author: 'Admin' }
    ]);
    const handleSaveNote = () => {
        if (!note.trim())
            return;
        const newNote = {
            id: Date.now(),
            text: note,
            date: new Date().toLocaleString('pt-BR'),
            author: 'Admin'
        };
        setNotes([newNote, ...notes]);
        setNote('');
        toast.success('Nota salva com sucesso!');
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "mb-6", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate('/leads'), className: "mb-4 -ml-2 text-slate-500 hover:text-slate-900", children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Voltar para Leads"] }), _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600", children: _jsx(User, { size: 32 }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-1", children: [_jsx("h2", { className: "text-3xl font-bold text-slate-900", children: "Jo\u00E3o Silva" }), _jsx(Badge, { className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none", children: "Novo" })] }), _jsxs("p", { className: "text-slate-500 flex items-center text-sm", children: [_jsx(Tag, { className: "mr-2 h-4 w-4" }), " Origem: Instagram Ads \u2022 Campanha: Ver\u00E3o 2024"] })] })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { variant: "outline", children: "Desqualificar" }), _jsx(ChangeLeadStatusModal, { currentStatus: "Novo" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Informa\u00E7\u00F5es de Contato" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3 text-slate-600", children: [_jsx(Mail, { size: 18, className: "text-slate-400" }), _jsx("span", { className: "text-sm", children: "joao@exemplo.com" })] }), _jsxs("div", { className: "flex items-center space-x-3 text-slate-600", children: [_jsx(Phone, { size: 18, className: "text-slate-400" }), _jsx("span", { className: "text-sm", children: "(11) 99999-9999" })] }), _jsxs("div", { className: "flex items-center space-x-3 text-slate-600", children: [_jsx(Calendar, { size: 18, className: "text-slate-400" }), _jsx("span", { className: "text-sm", children: "Registrado em 20/05/2024" })] })] })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Adicionar Nota" }) }), _jsxs(CardContent, { children: [_jsx("textarea", { value: note, onChange: (e) => setNote(e.target.value), className: "w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-3", placeholder: "Digite algo importante sobre este lead..." }), _jsxs(Button, { className: "w-full", onClick: handleSaveNote, disabled: !note.trim(), children: [_jsx(Send, { className: "mr-2 h-4 w-4" }), " Salvar Nota"] })] })] })] }), _jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Notas e Coment\u00E1rios" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: notes.map((n) => (_jsxs("div", { className: "p-4 rounded-lg bg-slate-50 border border-slate-100", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-xs font-bold text-blue-600 uppercase", children: n.author }), _jsx("span", { className: "text-[10px] text-slate-400", children: n.date })] }), _jsx("p", { className: "text-sm text-slate-700", children: n.text })] }, n.id))) }) })] }), _jsxs(Card, { className: "bg-white border-slate-200 shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-semibold", children: "Hist\u00F3rico de Atividades" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100", children: [
                                                { title: 'Lead Criado', desc: 'O lead entrou via formulário do Instagram.', time: 'Há 2 horas', icon: User, color: 'bg-blue-500' },
                                                { title: 'E-mail de Boas-vindas', desc: 'E-mail automático enviado com sucesso.', time: 'Há 1 hora', icon: Mail, color: 'bg-purple-500' },
                                                { title: 'Tentativa de Contato', desc: 'Ligação não atendida. Deixado recado.', time: 'Há 30 minutos', icon: Phone, color: 'bg-orange-500' },
                                            ].map((item, i) => (_jsxs("div", { className: "relative flex items-start space-x-4", children: [_jsx("div", { className: `flex-shrink-0 w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white z-10`, children: _jsx(item.icon, { size: 18 }) }), _jsxs("div", { className: "flex-1 pt-1", children: [_jsxs("div", { className: "flex justify-between items-center mb-1", children: [_jsx("h4", { className: "text-sm font-bold text-slate-900", children: item.title }), _jsx("span", { className: "text-[10px] text-slate-400 uppercase font-semibold", children: item.time })] }), _jsx("p", { className: "text-sm text-slate-500", children: item.desc })] })] }, i))) }) })] })] })] })] }));
};
export default LeadDetail;
//# sourceMappingURL=LeadDetail.js.map