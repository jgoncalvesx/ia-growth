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
  Eye
} from 'lucide-react';

const leads = [
  { id: 1, name: 'João Silva', email: 'joao@exemplo.com', phone: '(11) 99999-9999', source: 'Instagram', status: 'Novo', date: '2024-05-20' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@exemplo.com', phone: '(21) 98888-8888', source: 'Google Ads', status: 'Em Contato', date: '2024-05-19' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@exemplo.com', phone: '(31) 97777-7777', source: 'TikTok', status: 'Qualificado', date: '2024-05-18' },
  { id: 4, name: 'Ana Costa', email: 'ana@exemplo.com', phone: '(41) 96666-6666', source: 'Facebook', status: 'Convertido', date: '2024-05-17' },
  { id: 5, name: 'Lucas Souza', email: 'lucas@exemplo.com', phone: '(51) 95555-5555', source: 'Instagram', status: 'Novo', date: '2024-05-16' },
];

const Leads = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gestão de Leads</h2>
          <p className="text-slate-500">Acompanhe e gerencie os contatos gerados pelas suas campanhas.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Novo Lead
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input placeholder="Filtrar leads..." className="pl-9 bg-white" />
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
            {leads.map((lead) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Leads;