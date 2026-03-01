"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  UserPlus, 
  Instagram, 
  Youtube, 
  Twitter, 
  Star, 
  TrendingUp, 
  DollarSign,
  MessageCircle,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const influencers = [
  { 
    id: 1, 
    name: 'Julia Mendes', 
    handle: '@juliam_lifestyle', 
    platform: 'Instagram', 
    followers: '450k', 
    engagement: '4.8%', 
    niche: 'Moda & Beleza',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=julia'
  },
  { 
    id: 2, 
    name: 'Tech Reviewer', 
    handle: 'tech_unboxing', 
    platform: 'YouTube', 
    followers: '1.2M', 
    engagement: '12.5%', 
    niche: 'Tecnologia',
    status: 'Negociação',
    avatar: 'https://i.pravatar.cc/150?u=tech'
  },
  { 
    id: 3, 
    name: 'Marcos Silva', 
    handle: '@marcos_fit', 
    platform: 'Instagram', 
    followers: '85k', 
    engagement: '6.2%', 
    niche: 'Fitness',
    status: 'Pausado',
    avatar: 'https://i.pravatar.cc/150?u=marcos'
  },
  { 
    id: 4, 
    name: 'Ana Clara', 
    handle: '@anac_viagens', 
    platform: 'TikTok', 
    followers: '2.5M', 
    engagement: '15.1%', 
    niche: 'Viagens',
    status: 'Ativo',
    avatar: 'https://i.pravatar.cc/150?u=ana'
  }
];

const Influencers = () => {
  const handleAddInfluencer = () => {
    toast.success('Abrindo formulário de prospecção...');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Influenciadores & Parceiros</h2>
          <p className="text-slate-500">Gerencie colaborações e acompanhe o ROI de influenciadores.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddInfluencer}>
          <UserPlus className="mr-2 h-4 w-4" /> Novo Parceiro
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder="Buscar por nome, nicho ou plataforma..." className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {influencers.map((inf) => (
          <Card key={inf.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                    <AvatarImage src={inf.avatar} />
                    <AvatarFallback>{inf.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    {inf.platform === 'Instagram' && <Instagram size={14} className="text-pink-600" />}
                    {inf.platform === 'YouTube' && <Youtube size={14} className="text-red-600" />}
                    {inf.platform === 'TikTok' && <TrendingUp size={14} className="text-black" />}
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-slate-900">{inf.name}</h3>
                <p className="text-xs text-slate-500">{inf.handle}</p>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none text-[10px]">
                  {inf.niche}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Seguidores</p>
                  <p className="text-sm font-bold text-slate-900">{inf.followers}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Engajamento</p>
                  <p className="text-sm font-bold text-green-600">{inf.engagement}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge 
                  variant={inf.status === 'Ativo' ? 'default' : 'secondary'}
                  className={inf.status === 'Ativo' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}
                >
                  {inf.status}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 px-2">
                  Ver Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Performance Summary */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <Star className="mr-2 text-yellow-500" size={20} /> Performance de Campanhas com Influenciadores
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'ROI Médio', value: '3.8x', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Custo por Clique (CPC)', value: 'R$ 0,45', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Conversões Totais', value: '1,420', icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((stat, i) => (
            <Card key={i} className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-6 flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Influencers;