"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Zap, 
  ArrowUpRight, 
  PieChart as PieChartIcon,
  Calendar,
  Save,
  Loader2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { toast } from 'sonner';
import { fetchDadosBudget } from '../services/api.service';
import { useClient } from '../context/ClientContext';

const Budget = () => {
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [budgetData, setBudgetData] = React.useState<any[]>([]);

  const loadBudget = async () => {
    setLoading(true);
    try {
      const data = await fetchDadosBudget(selectedClient.id);
      setBudgetData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar orçamento", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadBudget();
  }, [selectedClient.id]);

  const totalPlanned = budgetData.reduce((acc, item) => acc + item.planned, 0);
  const totalActual = budgetData.reduce((acc, item) => acc + item.actual, 0);
  const percentageUsed = totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

  const handleOptimize = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'IA analisando ROAS por plataforma...',
      success: 'Otimização sugerida: Mover R$ 800 do Google Ads para Meta Ads.',
      error: 'Erro ao processar otimização.',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Planejamento de Orçamento</h2>
          <p className="text-slate-500">Gestão financeira de <span className="font-bold text-blue-600">{selectedClient.name}</span>.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-white">
            <Calendar className="mr-2 h-4 w-4" /> Junho 2024
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">
            <Save className="mr-2 h-4 w-4" /> Salvar Plano
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-slate-200 shadow-sm border-b-4 border-b-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Orçamento Total</p>
              <DollarSign className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-black text-slate-900">R$ {totalPlanned.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm border-b-4 border-b-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gasto Atual</p>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-black text-slate-900">R$ {totalActual.toLocaleString()}</p>
            <Progress value={percentageUsed} className="h-1.5 mt-4" />
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm border-b-4 border-b-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Disponível</p>
              <AlertCircle className="text-orange-600" size={20} />
            </div>
            <p className="text-2xl font-black text-slate-900">R$ {(totalPlanned - totalActual).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 mb-6">
            <CardTitle className="text-lg font-bold">Investimento por Plataforma</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 font-bold" onClick={handleOptimize}>
              <Zap size={14} className="mr-2" /> Otimizar com IA
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="planned" name="Planejado" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Realizado" radius={[4, 4, 0, 0]}>
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center">
              <Zap className="mr-2 text-yellow-400" size={20} /> Insights de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-white/10 rounded-xl border border-white/5">
              <p className="text-[10px] font-bold text-yellow-400 uppercase mb-1">Alerta de Gasto</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Google Ads está 15% acima do planejado para este período. Considere reduzir lances em keywords caras.
              </p>
            </div>
            <div className="p-4 bg-white/10 rounded-xl border border-white/5">
              <p className="text-[10px] font-bold text-green-400 uppercase mb-1">Oportunidade</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Meta Ads apresenta o melhor ROAS (6.2x). Aumentar o budget em R$ 500 pode gerar +15 vendas.
              </p>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 border-none font-bold py-6" onClick={handleOptimize}>
              Aplicar Otimizações
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Budget;