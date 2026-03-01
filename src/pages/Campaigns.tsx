"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { MoreHorizontal, Eye, Search, Filter, Loader2 } from 'lucide-react';
import CreateCampaignModal from '../components/CreateCampaignModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { dbService } from '../services/api.service';

const Campaigns = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [platformFilter, setPlatformFilter] = React.useState('all');
  const [campaigns, setCampaigns] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await dbService.getCampaigns();
      setCampaigns(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || campaign.platform.toLowerCase() === platformFilter.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campanhas</h2>
          <p className="text-slate-500">Gerencie e monitore suas campanhas publicitárias.</p>
        </div>
        <CreateCampaignModal />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4 bg-slate-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Buscar campanha..." 
              className="pl-9 bg-white" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-48">
            <Select onValueChange={setPlatformFilter} defaultValue="all">
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Plataformas</SelectItem>
                <SelectItem value="meta">Meta</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" size="sm" className="text-slate-600 ml-auto">
            <Filter className="mr-2 h-4 w-4" /> Mais Filtros
          </Button>
        </div>

        {loading ? (
          <div className="p-20 flex justify-center items-center">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <span className="ml-3 text-slate-500 font-medium">Carregando campanhas...</span>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plataforma</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Orçamento</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Gasto</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900">{campaign.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant={campaign.status === 'Ativa' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{campaign.platform}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.budget}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.spent}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> Ver Detalhes
                        </Button>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Nenhuma campanha encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default Campaigns;