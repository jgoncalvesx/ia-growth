"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MousePointer2, 
  DollarSign,
  Calendar,
  Play,
  MoreVertical,
  AlertCircle,
  Layers
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from 'sonner';

const performanceData = [
  { date: '2024-05-01', spend: 120, clicks: 450, conversions: 12 },
  { date: '2024-05-02', spend: 150, clicks: 520, conversions: 15 },
  { date: '2024-05-03', spend: 180, clicks: 610, conversions: 18 },
  { date: '2024-05-04', spend: 140, clicks: 480, conversions: 14 },
  { date: '2024-05-05', spend: 200, clicks: 700, conversions: 22 },
  { date: '2024-05-06', spend: 250, clicks: 850, conversions: 28 },
  { date: '2024-05-07', spend: 220, clicks: 780, conversions: 25 },
];

const adSets = [
  { id: 1, name: 'Público Frio - Interesse Moda', status: 'Ativo', spend: 'R$ 450', roas: '4.2x', conversions: 45 },
  { id: 2, name: 'Lookalike 1% Clientes', status: 'Ativo', spend: 'R$ 620', roas: '5.8x', conversions: 82 },
  { id: 3, name: 'Retargeting Visitantes 30d', status: 'Pausado', spend: 'R$ 190', roas: '3.1x', conversions: 27 },
];

const topCreatives = [
  { id: 1, title: 'Vídeo Lifestyle Verão', ctr: '3.2%', conversions: 45, thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150&h=150&fit=crop' },
  { id: 2, title: 'Carrossel Produtos', ctr: '2.8%', conversions: 32, thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop' },
  { id: 3, title: 'Depoimento Influencer', ctr: '4.1%', conversions: 58, thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop' },
];

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePause = () => {
    toast.info('Campanha pausada com sucesso.');
  };

  const budgetSpent = 1260;
  const totalBudget = 5000;
  const budgetPercentage = (budgetSpent / totalBudget) * 100;

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/campaigns')}
          className="mb-4 -ml-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Campanhas
        </Button>
        
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-3xl font-bold text-slate-900">Campanha Verão 2024</h2>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Ativa</Badge>
            </div>
            <p className="text-slate-500 flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Criada em 15 de Maio, 2024 • Plataforma: Meta Ads
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handlePause}>Pausar Campanha</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Editar Configurações</Button>
          </div>
        </div>
      </div>

      {/* Budget Progress Card */}
      <Card className="bg-white border-slate-200 shadow-sm mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="text-slate-400" size={20} />
              <h3 className="font-semibold text-slate-900">Consumo do Orçamento</h3>
            </div>
            <span className="text-sm font-medium text-slate-500">
              R$ {budgetSpent.toLocaleString()} de R$ {totalBudget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-500" 
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-400">{budgetPercentage.toFixed(1)}% utilizado</span>
            <div className="flex items-center text-xs text-orange-600 font-medium">
              <AlertCircle size={12} className="mr-1" /> Restam R$ {(totalBudget - budgetSpent).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Gasto Total', value: 'R$ 1.260,00', icon: DollarSign, color: 'text-blue-600' },
          { label: 'Cliques', value: '4.390', icon: MousePointer2, color: 'text-purple-600' },
          { label: 'Conversões', value: '154', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Custo por Lead', value: 'R$ 8,18', icon: Users, color: 'text-orange-600' },
        ].map((stat, i) => (
          <Card key={i} className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <stat.icon className={stat.color} size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Diária</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#3b82f6' }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spend" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Melhores Criativos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCreatives.map((creative) => (
              <div key={creative.id} className="flex items-center space-x-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <img src={creative.thumbnail} alt={creative.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play size={12} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{creative.title}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">CTR: {creative.ctr}</span>
                    <span className="text-[10px] font-semibold text-blue-600 uppercase">{creative.conversions} Conv.</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-blue-600">Ver todos os criativos</Button>
          </CardContent>
        </Card>
      </div>

      {/* Ad Sets Section */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Layers className="mr-2 text-slate-400" size={20} /> Conjuntos de Anúncios
          </CardTitle>
          <Button variant="outline" size="sm">Ver Todos</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Nome do Conjunto</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Gasto</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">ROAS</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Conversões</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {adSets.map((adSet) => (
                  <tr key={adSet.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-medium text-slate-900">{adSet.name}</td>
                    <td className="py-4">
                      <Badge variant={adSet.status === 'Ativo' ? 'default' : 'secondary'}>
                        {adSet.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-slate-600 text-sm">{adSet.spend}</td>
                    <td className="py-4 font-bold text-slate-900">{adSet.roas}</td>
                    <td className="py-4 text-slate-600 text-sm">{adSet.conversions}</td>
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

export default CampaignDetail;