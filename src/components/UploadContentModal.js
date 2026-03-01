"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { toast } from 'sonner';
const UploadContentModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Mídia enviada com sucesso! Processando otimização...');
        setOpen(false);
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Upload, { className: "mr-2 h-4 w-4" }), " Upload de M\u00EDdia"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Upload de Novo Conte\u00FAdo" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6 py-4", children: [_jsxs("div", { className: "border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4", children: _jsx(Upload, { size: 24 }) }), _jsx("p", { className: "text-sm font-medium text-slate-900", children: "Arraste arquivos ou clique para buscar" }), _jsx("p", { className: "text-xs text-slate-500 mt-1", children: "MP4, MOV, JPG ou PNG (M\u00E1x. 500MB)" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", children: "T\u00EDtulo do Criativo" }), _jsx(Input, { id: "title", placeholder: "Ex: V\u00EDdeo Promocional Ver\u00E3o", required: true })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "type", children: "Tipo" }), _jsxs(Select, { required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Selecione" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "video", children: "V\u00EDdeo" }), _jsx(SelectItem, { value: "image", children: "Imagem" }), _jsx(SelectItem, { value: "reels", children: "Reels / TikTok" }), _jsx(SelectItem, { value: "story", children: "Story" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "campaign", children: "Campanha Relacionada" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Opcional" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "v24", children: "Ver\u00E3o 2024" }), _jsx(SelectItem, { value: "bf", children: "Black Friday" })] })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancelar" }), _jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", children: "Iniciar Upload" })] })] })] })] }));
};
export default UploadContentModal;
//# sourceMappingURL=UploadContentModal.js.map