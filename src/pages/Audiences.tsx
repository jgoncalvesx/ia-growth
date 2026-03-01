"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from 'recharts';
import { Users, Target, MapPin, Smartphone, Brain, Sparkles, Plus } from 'lucide-react';
import { toast } from 'sonner';

const genderData = [
  { name: 'Feminino', value: 65, color: '#ec4899' },
  { name: 'Masculino', value: 30, color: '#3b82f6' },
  { name: 'Outros', value: 5, color: '#94a3b8' },
];

const ageData = [
  { range: '18-24', value: 15 },
  { range: '25-34', value: 45 },
  { range: '35-44', value: 25 },
  { range: '45-54', value: 10 },
  { range: '55+', value: 5 },
];

const deviceData = [
  { name: 'Mobile', value: 82, color: '#8b5cf6' },
  { name: 'Desktop', value: 15, color: '#64748b' },
  { name: 'Tablet', value: 3, color: '#cbd5e1' },
];

const personas = [
  {
    name: 'Mariana, 28',
    role: 'Empreendedora Digital',
    bio: 'Busca ferramentas para escalar seu e-commerce de moda. Valoriza agilidade e design.',
    interests: ['Marketing Digital', 'Moda Sustentável', 'SaaS'],
    painPoints: 'Falta de tempo para criar criativos e gerenciar anúncios manualmente.',
  },
  {
    name: 'Ricardo, 42',
    role: 'Gerente de Marketing',
    bio: 'Focado em ROI e relatórios precisos para diretoria. Prefere dados técnicos.',
    interests: ['Analytics', 'Gestão de Equipes', 'Estratégia'],
    painPoints: 'Dificuldade em consolidar dados de múltiplas plataformas.',
  }
];

const Audiences = () => {
  const handleGeneratePersona = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'IA analisando dados de conversão...',
      success: 'Nova Persona "Ana, 35 - Consultora de Vendas" gerada com sucesso!',
      error: 'Erro ao gerar persona.',
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Público e Personas</h2>
          <p className="text-slate-500">Entenda quem interage com sua marca e como converter melhor.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleGeneratePersona}>
          <Sparkles className="mr-2 h-4 w-4" /> Gerar Persona com IA
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Demographics */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Users className="mr-2 text-blue-600" size={20} /> Gênero
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-2">
              {genderData.map((item) => (
                <div key={item.name} className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Target className="mr-2 text-orange-500" size={20} /> Faixa Etária
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Smartphone className="mr-2 text-purple-600" size={20} /> Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-2">
              {deviceData.map((item) => (
                <div key={item.name} className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Personas Section */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Brain className="mr-2 text-purple-600" size={24} /> Personas Geradas por IA
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona, i) => (
              <Card key={i} className="bg-white border-slate-200 shadow-sm hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{persona.name}</h4>
                      <p className="text-xs text-slate-500">{persona.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {persona.bio}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Interesses</p>
                      <div className="flex flex-wrap gap-2">
                        {persona.interests.map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-600 border-none">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dores (Pain Points)</p>
                      <p className="text-xs text-slate-500 italic">"{persona.painPoints}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button 
              className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-slate-50 hover:border-purple-300 hover:text-purple-500 transition-all group"
              onClick={handleGeneratePersona}
            >
              <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Nova Persona com IA</span>
            </button>
          </div>
        </div>

        {/* Location & Interests */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <MapPin className="mr-2 text-red-500" size={20} /> Principais Cidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { city: 'São Paulo', percentage: 42 },
                { city: 'Rio de Janeiro', percentage: 18 },
                { city: 'Belo Horizonte', percentage: 12 },
                { city: 'Curitiba', percentage: 8 },
                { city: 'Porto Alegre', percentage: 5 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{item.city}</span>
                    <span className="text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Interesses em Alta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Tecnologia', 'E-commerce', 'Moda', 'Viagens', 'Gastronomia', 'Fitness', 'Investimentos', 'Sustentabilidade', 'Design'].map((tag, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className={`cursor-default ${i < 3 ? 'border-purple-200 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-500'}`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Audiences;