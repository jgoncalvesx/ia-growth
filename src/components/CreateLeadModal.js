"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { dbService } from '../services/api.service';
const CreateLeadModal = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            source: formData.get('source'),
            status: 'Novo'
        };
        try {
            await dbService.createLead(data);
            toast.success('Lead adicionado com sucesso!');
            setOpen(false);
        }
        catch (error) {
            toast.error('Erro ao salvar lead.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), " Novo Lead"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px] bg-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Adicionar Novo Lead" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nome Completo" }), _jsx(Input, { id: "name", name: "name", placeholder: "Ex: Jo\u00E3o Silva", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "E-mail" }), _jsx(Input, { id: "email", name: "email", type: "email", placeholder: "joao@exemplo.com", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Telefone" }), _jsx(Input, { id: "phone", name: "phone", placeholder: "(11) 99999-9999", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "source", children: "Origem" }), _jsxs(Select, { name: "source", required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione a origem" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "manual", children: "Inser\u00E7\u00E3o Manual" }), _jsx(SelectItem, { value: "instagram", children: "Instagram" }), _jsx(SelectItem, { value: "facebook", children: "Facebook" }), _jsx(SelectItem, { value: "google", children: "Google Ads" }), _jsx(SelectItem, { value: "tiktok", children: "TikTok" })] })] })] }), _jsxs(DialogFooter, { className: "pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), disabled: loading, children: "Cancelar" }), _jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", disabled: loading, children: loading ? _jsx(Loader2, { className: "animate-spin", size: 18 }) : 'Salvar Lead' })] })] })] })] }));
};
export default CreateLeadModal;
//# sourceMappingURL=CreateLeadModal.js.map