"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Play, 
  MoreVertical, 
  Eye, 
  ThumbsUp, 
  Filter,
  Search
} from 'lucide-react';
import UploadContentModal from '../components/UploadContentModal';
import { Input } from '../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';

const contentItems = [
  { id: 1, title: 'Teaser Coleção Verão', type: 'Vídeo', status: 'Publicado', views: '12.4k', likes: '850', thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=225&fit=crop' },
  { id: 2, title: 'Tutorial de Uso App', type: 'Vídeo', status: 'Rascunho', views: '0', likes: '0', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop' },
  { id: 3, title: 'Depoimento Cliente X', type: 'Reels', status: 'Publicado', views: '45.2k', likes: '3.2k', thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop' },
  { id: 4, title: 'Promoção Relâmpago', type: 'Story', status: 'Expirado', views: '8.1k', likes: '120', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop' },
  { id: 5, title: 'Banner Site Principal', type: 'Imagem', status: 'Publicado', views: '2.1k', likes: '45', thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=225&fit=crop' },
  { id: 6, title: 'Anúncio Facebook Q2', type: 'Imagem', status: 'Pausado', views: '5.4k', likes: '210', thumbnail: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=225&fit=crop' },
];

const Content = () => {
  const [filterType, setFilterType] = React.useState('all');

  const filteredItems = filterType === 'all' 
    ? contentItems 
    : contentItems.filter(item => item.type.toLowerCase() === filterType.toLowerCase());

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Conteúdo</h2>
          <p className="text-slate-500">Gerencie seus criativos e mídias sociais.</p>
        </div>
        <UploadContentModal />
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input placeholder="Buscar criativos..." className="pl-9" />
        </div>
        
        <div className="w-48">
          <Select onValueChange={setFilterType} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Tipo de Mídia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="vídeo">Vídeos</SelectItem>
              <SelectItem value="imagem">Imagens</SelectItem>
              <SelectItem value="reels">Reels</SelectItem>
              <SelectItem value="story">Stories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="expirado">Expirado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon">
          <Filter size={18} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative aspect-video">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Play size={20} />
                </Button>
              </div>
              <Badge className="absolute top-2 right-2" variant={item.status === 'Publicado' ? 'default' : 'secondary'}>
                {item.status}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={18} />
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-4">{item.type}</p>
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye size={14} />
                    <span className="text-xs font-medium">{item.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp size={14} />
                    <span className="text-xs font-medium">{item.likes}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] uppercase font-bold text-blue-600">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Content;