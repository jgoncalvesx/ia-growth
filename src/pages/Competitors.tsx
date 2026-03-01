"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Users, TrendingUp, Target, Globe, Plus, Brain, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { toast } from 'sonner';

const shareOfVoiceData = [
  { name: 'Sua Marca', value: 35, color: '#3b82f6' },
  { name: 'Concorrente A', value: 28, color: '#94a3b8' },
  { name: 'Concorrente B', value: 22, color: '#cbd5e1' },
  { name: 'Concorrente C', value: 15, color: '#e2e8f0' },
];

const engagementComparison = [
  { month: 'Jan', voce: 4.2, mercado: 3.8 },
  { month: 'Fev', voce: 4.5, mercado: 3.9 },
  { month: 'Mar', voce: 3.8, mercado: 4.1 },
  { month: 'Abr', voce: 5.1, mercado: 4.0 },
  { month: 'Mai', voce: 5.4, mercado: 4.2 },
];

const Competitors = () => {
  const handleAddCompetitor = () => {
    toast.info('Funcionalidade de monitoramento de nova URL em processamento...');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inteligência Competitiva</h2>
          <p className="text-slate-500">Monitore seus concorrentes e descubra novas oportunidades de mercado.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddCompetitor}>
          <Plus className="mr-2 h-4 w-4" /> Monitorar Concorrente
        </Button>
      </div>

      {/* AI Market Insights */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-700 border-none shadow-lg mb-8 text-white">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Brain size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Insight da IA: Tendência de Mercado</h3>
              <p className="text-blue-100 text-sm max-w-2xl">
                O "Concorrente A" aumentou o investimento em anúncios de vídeo curto (Reels/TikTok) em 40% na última semana. 
                Seu engajamento médio subiu 12%. Recomendamos testar criativos similares para manter o Share of Voice.
              </p>
            </div>
          </div>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
            Ver Estratégia
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Share of Voice */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Share of Voice (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shareOfVoiceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {shareOfVoiceData.map((entry, index) => (
                    <rect key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Comparison */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Taxa de Engajamento vs. Mercado</CardTitle>
            <Badge className="bg-green-100 text-green-700 border-none">+1.2% acima da média</Badge>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementComparison}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="voce" name="Sua Marca" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="mercado" name="Média Mercado" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Competitor List */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ranking de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Marca</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Seguidores Totais</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Crescimento (30d)</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Anúncios Ativos</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Sua Marca', followers: '125k', growth: '+5.2%', ads: 12, status: 'Líder', color: 'text-blue-600' },
                  { name: 'Concorrente A', followers: '98k', growth: '+8.1%', ads: 24, status: 'Agressivo', color: 'text-orange-600' },
                  { name: 'Concorrente B', followers: '210k', growth: '+1.2%', ads: 8, status: 'Estável', color: 'text-slate-600' },
                  { name: 'Concorrente C', followers: '45k', growth: '+12.5%', ads: 5, status: 'Emergente', color: 'text-green-600' },
                ].map((brand, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Globe size={16} />
                        </div>
                        <span className="font-bold text-slate-900">{brand.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 text-sm">{brand.followers}</td>
                    <td className="py-4">
                      <div className={`flex items-center text-sm font-bold ${brand.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {brand.growth.startsWith('+') ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {brand.growth}
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 text-sm font-medium">{brand.ads} criativos</td>
                    <td className="py-4">
                      <Badge variant="outline" className={`${brand.color} border-current bg-transparent`}>
                        {brand.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Competitors;