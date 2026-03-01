"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Filter, 
  ArrowDown, 
  Users, 
  MousePointer2, 
  ShoppingBag, 
  Heart,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const funnelStages = [
  { 
    id: 'awareness', 
    name: 'Conscientização', 
    value: '1.2M', 
    subtext: 'Impressões / Alcance', 
    color: 'bg-blue-500', 
    conversion: '4.2%',
    icon: Users 
  },
  { 
    id: 'consideration', 
    name: 'Consideração', 
    value: '50.4k', 
    subtext: 'Cliques / Visitas', 
    color: 'bg-purple-500', 
    conversion: '12.5%',
    icon: MousePointer2 
  },
  { 
    id: 'conversion', 
    name: 'Conversão', 
    value: '6.3k', 
    subtext: 'Vendas / Leads Qualificados', 
    color: 'bg-green-500', 
    conversion: '25.0%',
    icon: ShoppingBag 
  },
  { 
    id: 'loyalty', 
    name: 'Fidelização', 
    value: '1.5k', 
    subtext: 'Recompra / Indicações', 
    color: 'bg-pink-500', 
    conversion: null,
    icon: Heart 
  },
];

const Funnel = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Funil de Marketing</h2>
        <p className="text-slate-500">Visualize a eficiência da sua jornada de conversão de ponta a ponta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Funnel Visualization */}
        <div className="lg:col-span-7 space-y-4">
          {funnelStages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div className="relative group">
                <Card className={`border-none shadow-md overflow-hidden transition-all hover:scale-[1.01]`}>
                  <div className="flex h-24">
                    <div className={`w-2 ${stage.color}`}></div>
                    <div className="flex-1 p-6 flex items-center justify-between bg-white">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${stage.color} bg-opacity-10 ${stage.color.replace('bg-', 'text-')}`}>
                          <stage.icon size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{stage.name}</h3>
                          <p className="text-xs text-slate-500">{stage.subtext}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">{stage.value}</p>
                        {index === 0 && <Badge variant="outline" className="text-[10px]">Topo do Funil</Badge>}
                      </div>
                    </div>
                  </div>
                </Card>
                
                {stage.conversion && (
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center shadow-lg">
                      <ArrowDown size={12} className="mr-1 text-blue-400" />
                      Taxa de Conversão: {stage.conversion}
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Insights & Metrics */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <TrendingUp className="mr-2 text-green-600" size={20} /> Performance do Funil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">Custo por Aquisição (CAC)</p>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-slate-900">R$ 42,50</span>
                  <span className="text-xs text-green-600 font-bold mb-1">-12% vs mês ant.</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">LTV (Lifetime Value)</p>
                <div className="flex items-end space-x-2">
                  <span className="text-3xl font-bold text-slate-900">R$ 850,00</span>
                  <span className="text-xs text-blue-600 font-bold mb-1">ROI: 20x</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
                  <AlertCircle className="mr-2 text-orange-500" size={16} /> Gargalos Identificados
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                    <p className="text-xs text-slate-600">Queda de 15% na transição de <strong>Consideração</strong> para <strong>Conversão</strong> no mobile.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                    <p className="text-xs text-slate-600">O tempo médio no estágio de <strong>Conscientização</strong> aumentou para 4 dias.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white border-none shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-bold mb-2">Otimização Sugerida</h3>
              <p className="text-sm text-blue-100 mb-4">
                Sua taxa de fidelização está acima da média do mercado. Que tal criar um programa de indicação para reduzir o CAC do topo do funil?
              </p>
              <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                Criar Campanha de Indicação
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Funnel;