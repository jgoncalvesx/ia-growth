"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Filter, 
  Video, 
  Image as ImageIcon, 
  MoreVertical, 
  Brain,
  Play,
  Download
} from 'lucide-react';
import UploadContentModal from '../components/UploadContentModal';
import CreativeInsightsModal from '../components/CreativeInsightsModal';
import { useClient } from '../context/ClientContext';

const initialContent = [
  { id: 1, title: 'Vídeo Campanha Inverno', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', platform: 'Instagram' },
  { id: 2, title: 'Banner Coleção New Era', type: 'image', status: 'Aguardando IA', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', platform: 'Facebook' },
  { id: 3, title: 'Reels Lifestyle', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', platform: 'TikTok' },
  { id: 4, title: 'Story Promo Relâmpago', type: 'video', status: 'Otimizado', thumbnail: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=400&q=80', platform: 'Instagram' },
];

const Content = () => {
  const { selectedClient } = useClient();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [isInsightsOpen, setIsInsightsOpen] = React.useState(false);

  const filteredContent = initialContent.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenInsights = (item: any) => {
    setSelectedItem(item);
    setIsInsightsOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Biblioteca de Conteúdo</h2>
          <p className="text-slate-500">Ativos criativos de <span className="font-bold text-blue-600">{selectedClient.name}</span>.</p>
        </div>
        <UploadContentModal />
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Buscar por título ou tag..." 
            className="pl-10 bg-slate-50 border-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm" className="text-slate-600">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className="bg-white border-slate-200 shadow-sm overflow-hidden group">
            <div className="aspect-video relative overflow-hidden bg-slate-100">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                {item.type === 'video' ? (
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Play size={16} fill="currentColor" />
                  </Button>
                ) : (
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <ImageIcon size={16} />
                  </Button>
                )}
                <Button size="icon" variant="secondary" className="rounded-full">
                  <Download size={16} />
                </Button>
              </div>
              <Badge className="absolute top-2 left-2 bg-white/90 text-slate-900 border-none text-[9px] font-bold uppercase">
                {item.platform}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-slate-900 truncate flex-1 pr-2">{item.title}</h3>
                <button className="text-slate-400">
                  <MoreVertical size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`text-[9px] font-bold ${
                  item.status === 'Otimizado' ? 'text-green-600 border-green-100 bg-green-50' : 'text-orange-600 border-orange-100 bg-orange-50'
                }`}>
                  {item.status.toUpperCase()}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-[10px] font-bold text-purple-600 hover:bg-purple-50"
                  onClick={() => handleOpenInsights(item)}
                >
                  <Brain size={12} className="mr-1" /> Insights IA
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreativeInsightsModal 
        open={isInsightsOpen} 
        onOpenChange={setIsInsightsOpen} 
        item={selectedItem} 
      />
    </Layout>
  );
};

export default Content;