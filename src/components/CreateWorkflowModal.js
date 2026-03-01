"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Zap, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
const CreateWorkflowModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Automação ativada com sucesso!');
        setOpen(false);
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", children: [_jsx(Zap, { className: "mr-2 h-4 w-4" }), " Nova Automa\u00E7\u00E3o"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Configurar Fluxo de Automa\u00E7\u00E3o" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nome da Automa\u00E7\u00E3o" }), _jsx(Input, { id: "name", placeholder: "Ex: Boas-vindas Instagram", required: true })] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-bold uppercase text-slate-500", children: "Gatilho (Trigger)" }), _jsxs(Select, { required: true, children: [_jsx(SelectTrigger, { className: "bg-white", children: _jsx(SelectValue, { placeholder: "Quando acontecer..." }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "new-lead", children: "Novo Lead Cadastrado" }), _jsx(SelectItem, { value: "campaign-start", children: "Campanha Iniciada" }), _jsx(SelectItem, { value: "budget-alert", children: "Alerta de Or\u00E7amento" })] })] })] }), _jsx("div", { className: "flex justify-center", children: _jsx(ArrowRight, { className: "text-slate-300" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs font-bold uppercase text-slate-500", children: "A\u00E7\u00E3o (Action)" }), _jsxs(Select, { required: true, children: [_jsx(SelectTrigger, { className: "bg-white", children: _jsx(SelectValue, { placeholder: "Ent\u00E3o fa\u00E7a isso..." }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "send-email", children: "Enviar E-mail" }), _jsx(SelectItem, { value: "notify-slack", children: "Notificar no Slack" }), _jsx(SelectItem, { value: "change-status", children: "Mudar Status do Lead" }), _jsx(SelectItem, { value: "add-tag", children: "Adicionar Tag" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }), _jsx(Button, { type: "submit", className: "bg-purple-600 hover:bg-purple-700", children: "Salvar e Ativar" })] })] })] })] }));
};
export default CreateWorkflowModal;
//# sourceMappingURL=CreateWorkflowModal.js.map