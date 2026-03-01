"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const Strategy = () => {
  const [generating, setGenerating] = React.useState(false);

  const handleGenerateStrategy = () => {
    setGenerating(true);
    toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
      loading: 'IA analisando Brand Kit e tendências de mercado...',
      success: 'Estratégia trimestral gerada com sucesso!',
      error: 'Erro ao gerar estratégia.',
    });
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Estratégia de Marketing</h2>
          <p className="text-slate-500">Seu roadmap de crescimento personalizado pela nossa IA.</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700" 
          onClick={handleGenerateStrategy}
          disabled={generating}
        >
          <Sparkles className="mr-2 h-4 w-4" /> {generating ? 'Gerando...' : 'Atualizar Estratégia'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Strategy Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">Plano de Ação: Q3 2024</CardTitle>
                <Badge className="bg-green-100 text-green-700 border-none">Foco: Conversão</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                  <Target className="mr-2 text-blue-600" size={18} /> Objetivo Principal
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Aumentar a taxa de conversão em 25% através de campanhas de retargeting dinâmico e otimização de landing pages para o público "Mariana, 28".
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Marcos Estratégicos</h4>
                {[
                  { month: 'Julho', task: 'Lançamento da Coleção Inverno com foco em Influenciadores de Moda.', status: 'Em Andamento' },
                  { month: 'Agosto', task: 'Implementação de automação de carrinho abandonado via WhatsApp.', status: 'Pendente' },
                  { month: 'Setembro', task: 'Campanha de antecipação Black Friday com lista VIP de leads.', status: 'Pendente' },
                ].map((milestone, i) => (
                  <div key={i} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-20 flex-shrink-0">
                      <span className="text-xs font-bold text-slate-400 uppercase">{milestone.month}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{milestone.task}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{milestone.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center">
                  <Zap className="mr-2 text-orange-500" size={20} /> Canais Recomendados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { channel: 'Instagram Reels', weight: 45, reason: 'Alto engajamento do público jovem.' },
                  { channel: 'Google Search', weight: 30, reason: 'Captura de demanda direta por produtos.' },
                  { channel: 'TikTok Ads', weight: 25, reason: 'Escalabilidade e baixo custo por mil (CPM).' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{item.channel}</span>
                      <span className="text-blue-600">{item.weight}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${item.weight}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400">{item.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center">
                  <TrendingUp className="mr-2 text-green-600" size={20} /> Metas Estimadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Novos Leads', value: '+2.400', trend: 'up' },
                  { label: 'Custo por Lead', value: 'R$ 6,50', trend: 'down' },
                  { label: 'ROI Projetado', value: '5.5x', trend: 'up' },
                ].map((meta, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-xs font-medium text-slate-600">{meta.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">{meta.value}</span>
                      <div className={`w-2 h-2 rounded-full ${meta.trend === 'up' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center">
                <Brain className="mr-2 text-purple-400" size={20} /> Insights da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-purple-400 uppercase mb-1">Oportunidade de Conteúdo</p>
                <p className="text-sm text-slate-300">
                  Vídeos de "Bastidores" estão performando 3x melhor que fotos estáticas para sua marca. Foque em Stories autênticos.
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-orange-400 uppercase mb-1">Alerta de Audiência</p>
                <p className="text-sm text-slate-300">
                  Houve um aumento de 15% no interesse por "Moda Sustentável" entre seus seguidores. Considere adaptar sua copy.
                </p>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none">
                Aplicar Recomendações
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Checklist de Sucesso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Configurar Pixel de Conversão',
                'Validar Brand Kit com a Equipe',
                'Conectar Google Ads',
                'Subir Criativos de Inverno',
                'Definir Orçamento Diário'
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${i < 2 ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200'}`}>
                    {i < 2 && <CheckCircle2 size={12} />}
                  </div>
                  <span className={`text-xs ${i < 2 ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Strategy;