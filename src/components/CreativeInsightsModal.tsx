"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Brain, Target, Zap, MessageSquare, TrendingUp } from 'lucide-react';

interface CreativeInsightsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
}

const CreativeInsightsModal = ({ open, onOpenChange, item }: CreativeInsightsModalProps) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Brain className="text-purple-600" size={24} />
            <span>Insights de IA: {item.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="aspect-video rounded-lg overflow-hidden border border-slate-200">
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-xs font-bold text-purple-700 uppercase mb-1">Score de Performance</p>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-purple-900">8.5</span>
                <span className="text-sm text-purple-600 mb-1">/ 10</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase">Público-Alvo Sugerido</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Jovens 18-24</Badge>
                <Badge variant="secondary">Interesse em Moda</Badge>
                <Badge variant="secondary">Mobile Users</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900 flex items-center">
            <Zap className="mr-2 text-orange-500" size={18} /> Sugestões de Otimização
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {[
              { icon: MessageSquare, text: "Adicione uma CTA mais clara nos primeiros 3 segundos.", color: "text-blue-600" },
              { icon: Target, text: "O contraste das cores está baixo para visualização em ambientes externos.", color: "text-red-600" },
              { icon: TrendingUp, text: "Este formato performa 25% melhor em horários noturnos.", color: "text-green-600" },
            ].map((tip, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <tip.icon className={`${tip.color} mt-0.5`} size={16} />
                <p className="text-sm text-slate-700">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreativeInsightsModal;