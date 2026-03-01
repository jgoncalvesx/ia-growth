"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrendingUp, TrendingDown, Zap, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchMetricasAnalytics } from '../services/api.service';
import { useClient } from '../context/ClientContext';

const Analytics = () => {
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any>(null);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const result = await fetchMetricasAnalytics(selectedClient.id);
      setData(result);
    } catch (error) {
      console.error("Erro ao carregar analytics", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadAnalytics();
  }, [selectedClient.id]);

  const handleGenerateReport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Analisando dados e gerando relatório...',
      success: 'Relatório de performance gerado com sucesso!',
      error: 'Erro ao gerar relatório.',
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
          <h2 className="text-2xl font-black text-slate-900">Analytics</h2>
          <p className="text-slate-500">Performance detalhada de <span className="font-bold text-blue-600">{selectedClient.name}</span>.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => toast.info('IA analisando oportunidades de ROI...')}>
            <Zap className="mr-2 h-4 w-4 text-orange-500" /> Otimizar com IA
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Platform Distribution */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribuição por Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.plataformas}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data?.plataformas?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              {data?.plataformas?.map((item: any) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CPA Trend */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Tendência de CPA (R$)</CardTitle>
            <Badge className="bg-green-100 text-green-700 border-none font-bold">
              <TrendingDown size={12} className="mr-1" /> -15% este mês
            </Badge>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data?.cpaTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="cpa" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-blue-100">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-black mb-2 flex items-center justify-center md:justify-start">
            <Zap size={24} className="mr-2 text-yellow-400" /> Insight da IA para {selectedClient.name}
          </h3>
          <p className="text-blue-100 max-w-2xl">
            Sua taxa de conversão no TikTok Ads subiu 22% esta semana. Recomendamos migrar 10% do orçamento de Google Search para escalar este canal.
          </p>
        </div>
        <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8">
          Aplicar agora
        </Button>
      </div>
    </Layout>
  );
};

export default Analytics;