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
  LayoutGrid
} from 'lucide-react';
import CreateLeadModal from '../components/CreateLeadModal';
import LeadKanbanBoard from '../components/LeadKanbanBoard';
import { toast } from 'sonner';

const initialLeads = [
  { id: 1, name: 'João Silva', email: 'joao@exemplo.com', phone: '(11) 99999-9999', source: 'Instagram', status: 'Novo', date: '2024-05-20' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(21) 98888-8888', source: 'Google Ads', status: 'Em Contato', date: '2024-05-19' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@exemplo.com', phone: '(31) 97777-7777', source: 'TikTok', status: 'Qualificado', date: '2024-05-18' },
  { id: 4, name: 'Ana Costa', email: 'ana@exemplo.com', phone: '(41) 96666-6666', source: 'Facebook', status: 'Convertido', date: '2024-05-17' },
  { id: 5, name: 'Lucas Souza', email: 'lucas@exemplo.com', phone: '(51) 95555-5555', source: 'Instagram', status: 'Novo', date: '2024-05-16' },
];

const Leads = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'list' | 'board'>('list');
  
  const filteredLeads = initialLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: 'Preparando exportação...',
      success: 'Leads exportados com sucesso (CSV)!',
      error: 'Erro ao exportar leads.',
    });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestão de Leads</h2>
          <p className="text-slate-500">Acompanhe e gerencie os contatos gerados pelas suas campanhas.</p>
        </div>
        <div className="flex space-x-3">
          <div className="bg-slate-100 p-1 rounded-lg flex mr-2">
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
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <CreateLeadModal />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Novos', value: '85', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Em Contato', value: '312', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Convertidos', value: '142', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Filtrar por nome, e-mail ou origem..." 
                className="pl-9 bg-white" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm" className="text-slate-600">
              <Filter className="mr-2 h-4 w-4" /> Filtros Avançados
            </Button>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Origem</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{lead.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-xs text-slate-500">
                          <Mail size={12} className="mr-1" /> {lead.email}
                        </div>
                        <div className="flex items-center text-xs text-slate-500">
                          <Phone size={12} className="mr-1" /> {lead.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{lead.source}</td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={
                          lead.status === 'Novo' ? 'default' : 
                          lead.status === 'Convertido' ? 'success' : 
                          'secondary'
                        }
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{lead.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => navigate(`/leads/${lead.id}`)}
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
                    Nenhum lead encontrado para "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <LeadKanbanBoard />
      )}
    </Layout>
  );
};

export default Leads;