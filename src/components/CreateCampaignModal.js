"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { dbService } from '../services/api.service';
const CreateCampaignModal = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            platform: formData.get('platform'),
            budget: formData.get('budget'),
            status: 'Ativa'
        };
        try {
            await dbService.createCampaign(data);
            toast.success('Campanha enviada para processamento!');
            setOpen(false);
        }
        catch (error) {
            toast.error('Erro ao criar campanha. Verifique o n8n.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Nova Campanha"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[425px] bg-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Criar Nova Campanha" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Nome da Campanha" }), _jsx(Input, { id: "name", name: "name", placeholder: "Ex: Promo\u00E7\u00E3o de Inverno", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "platform", children: "Plataforma" }), _jsxs(Select, { name: "platform", required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione a plataforma" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "meta", children: "Meta (FB/IG)" }), _jsx(SelectItem, { value: "google", children: "Google Ads" }), _jsx(SelectItem, { value: "tiktok", children: "TikTok Ads" }), _jsx(SelectItem, { value: "linkedin", children: "LinkedIn Ads" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "budget", children: "Or\u00E7amento Total (R$)" }), _jsx(Input, { id: "budget", name: "budget", type: "number", placeholder: "0.00", required: true })] }), _jsxs(DialogFooter, { className: "pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), disabled: loading, children: "Cancelar" }), _jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", disabled: loading, children: loading ? _jsx(Loader2, { className: "animate-spin", size: 18 }) : 'Criar Campanha' })] })] })] })] }));
};
export default CreateCampaignModal;
//# sourceMappingURL=CreateCampaignModal.js.map