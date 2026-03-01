"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  MoreHorizontal,
  Eye,
  Users,
  UserCheck,
  Clock,
  LayoutList,
  LayoutGrid,
  Loader2
} from 'lucide-react';
import CreateLeadModal from '../components/CreateLeadModal';
import LeadKanbanBoard from '../components/LeadKanbanBoard';
import { toast } from 'sonner';
import { dbService } from '../services/api.service';
import { useClient } from '../context/ClientContext';

const Leads = () => {
  const navigate = useNavigate();
  const { selectedClient } = useClient();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'board'>('list');
  const [leads, setLeads] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await dbService.getLeads();
      // Simulando filtro por cliente
      setLeads(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedClient.id]);

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: `Preparando exportação de ${selectedClient.name}...`,
      success: 'Leads exportados com sucesso!',
      error: 'Erro ao exportar leads.',
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Gestão de Leads</h2>
          <p className="text-slate-500">Contatos gerados para <span className="font-bold text-blue-600">{selectedClient.name}</span>.</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-slate-100 p-1 rounded-lg flex">
            <Button 
              variant={viewMode === 'list' ? 'white' : 'ghost'} 
              size="sm" 
              className={`h-8 px-3 ${viewMode === 'list' ? 'shadow-sm bg-white' : 'text-slate-500'}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList size={16} className="mr-2" /> Lista
            </Button>
            <Button 
              variant={viewMode === 'board' ? 'white' : 'ghost'} 
              size="sm" 
              className={`h-8 px-3 ${viewMode === 'board' ? 'shadow-sm bg-white' : 'text-slate-500'}`}
              onClick={() => setViewMode('board')}
            >
              <LayoutGrid size={16} className="mr-2" /> Quadro
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <CreateLeadModal />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: leads.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Novos hoje', value: '12', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Aguardando', value: '45', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Convertidos', value: '8', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="p-20 flex flex-col justify-center items-center bg-white rounded-2xl border border-slate-200">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
          <span className="text-slate-500 font-medium">Buscando leads de {selectedClient.name}...</span>
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Pesquisar contatos..." 
                className="pl-9 bg-white border-slate-200 focus:ring-blue-500" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 ml-4">
              <Filter className="mr-2 h-4 w-4" /> Filtros
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nome</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contato</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Origem</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{lead.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">{lead.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-0.5">
                        <div className="flex items-center text-xs text-slate-600">
                          <Mail size={12} className="mr-1.5 text-slate-400" /> {lead.email}
                        </div>
                        <div className="flex items-center text-xs text-slate-600">
                          <Phone size={12} className="mr-1.5 text-slate-400" /> {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-medium text-[10px]">
                        {lead.source}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        className={`font-bold text-[9px] px-2 py-0.5 ${
                          lead.status === 'Novo' ? 'bg-blue-100 text-blue-700' : 
                          lead.status === 'Convertido' ? 'bg-green-100 text-green-700' : 
                          'bg-slate-100 text-slate-600'
                        } border-none`}
                      >
                        {lead.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                          onClick={() => navigate(`/leads/${lead.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-400">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <LeadKanbanBoard />
      )}
    </Layout>
  );
};

export default Leads;