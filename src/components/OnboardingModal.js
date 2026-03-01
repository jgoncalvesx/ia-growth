"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Brain, Target, Zap, BarChart3, ChevronRight, ChevronLeft } from 'lucide-react';
const steps = [
    {
        title: "Bem-vindo ao Growth Midia IA",
        description: "Sua central de comando para marketing de alta performance. Vamos configurar seu ambiente em 30 segundos.",
        icon: Brain,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Defina sua Estratégia",
        description: "Use o Brand Kit e Audiências para ensinar nossa IA sobre sua marca e seu público-alvo ideal.",
        icon: Target,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        title: "Automatize e Escale",
        description: "Crie campanhas, gere copies com IA e configure automações para nunca mais perder um lead.",
        icon: Zap,
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        title: "Analise Resultados",
        description: "Acompanhe seu funil e ROI em tempo real com dashboards integrados de todas as suas redes.",
        icon: BarChart3,
        color: "text-green-600",
        bg: "bg-green-50"
    }
];
const OnboardingModal = () => {
    const [open, setOpen] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(0);
    React.useEffect(() => {
        const hasSeenOnboarding = localStorage.getItem('midiaos_onboarding');
        if (!hasSeenOnboarding) {
            setOpen(true);
        }
    }, []);
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        else {
            setOpen(false);
            localStorage.setItem('midiaos_onboarding', 'true');
        }
    };
    const step = steps[currentStep];
    return (_jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl", children: [_jsx("div", { className: `h-2 bg-slate-100 w-full`, children: _jsx("div", { className: "h-full bg-blue-600 transition-all duration-500", style: { width: `${((currentStep + 1) / steps.length) * 100}%` } }) }), _jsxs("div", { className: "p-8", children: [_jsx("div", { className: `w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 mx-auto`, children: _jsx(step.icon, { size: 32 }) }), _jsxs("div", { className: "text-center space-y-3", children: [_jsx(DialogTitle, { className: "text-2xl font-bold text-slate-900", children: step.title }), _jsx("p", { className: "text-slate-500 leading-relaxed", children: step.description })] }), _jsx("div", { className: "flex justify-center space-x-2 mt-8", children: steps.map((_, i) => (_jsx("div", { className: `h-1.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}` }, i))) })] }), _jsxs(DialogFooter, { className: "p-6 bg-slate-50 border-t border-slate-100 flex sm:justify-between items-center", children: [_jsx(Button, { variant: "ghost", onClick: () => setOpen(false), className: "text-slate-400 hover:text-slate-600", children: "Pular guia" }), _jsxs("div", { className: "flex space-x-2", children: [currentStep > 0 && (_jsxs(Button, { variant: "outline", onClick: () => setCurrentStep(currentStep - 1), children: [_jsx(ChevronLeft, { size: 18, className: "mr-1" }), " Voltar"] })), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 min-w-[120px]", onClick: handleNext, children: [currentStep === steps.length - 1 ? "Começar Agora" : "Próximo", currentStep !== steps.length - 1 && _jsx(ChevronRight, { size: 18, className: "ml-1" })] })] })] })] }) }));
};
export default OnboardingModal;
//# sourceMappingURL=OnboardingModal.js.map