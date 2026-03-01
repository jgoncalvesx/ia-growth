"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from './ui/dialog';
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
    } else {
      setOpen(false);
      localStorage.setItem('midiaos_onboarding', 'true');
    }
  };

  const step = steps[currentStep];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-none shadow-2xl">
        <div className={`h-2 bg-slate-100 w-full`}>
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="p-8">
          <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 mx-auto`}>
            <step.icon size={32} />
          </div>
          
          <div className="text-center space-y-3">
            <DialogTitle className="text-2xl font-bold text-slate-900">{step.title}</DialogTitle>
            <p className="text-slate-500 leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="flex justify-center space-x-2 mt-8">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
              ></div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 flex sm:justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            Pular guia
          </Button>
          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                <ChevronLeft size={18} className="mr-1" /> Voltar
              </Button>
            )}
            <Button className="bg-blue-600 hover:bg-blue-700 min-w-[120px]" onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Começar Agora" : "Próximo"} 
              {currentStep !== steps.length - 1 && <ChevronRight size={18} className="ml-1" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;