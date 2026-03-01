"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
const ChangeLeadStatusModal = ({ currentStatus }) => {
    const [open, setOpen] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Status do lead atualizado com sucesso!');
        setOpen(false);
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "Mudar Status" }) }), _jsxs(DialogContent, { className: "sm:max-w-[400px] bg-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Alterar Status do Lead" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Novo Status" }), _jsxs(Select, { defaultValue: currentStatus.toLowerCase().replace(' ', '-'), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione o status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "novo", children: "Novo" }), _jsx(SelectItem, { value: "em-contato", children: "Em Contato" }), _jsx(SelectItem, { value: "qualificado", children: "Qualificado" }), _jsx(SelectItem, { value: "convertido", children: "Convertido" }), _jsx(SelectItem, { value: "desqualificado", children: "Desqualificado" })] })] })] }), _jsxs(DialogFooter, { className: "pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }), _jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", children: "Atualizar Status" })] })] })] })] }));
};
export default ChangeLeadStatusModal;
//# sourceMappingURL=ChangeLeadStatusModal.js.map