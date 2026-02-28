"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';

const campaigns = [
  { id: 1, name: 'Verão 2024', status: 'Ativa', budget: 'R$ 5.000', spent: 'R$ 1.200', platform: 'Meta' },
  { id: 2, name: 'Black Friday', status: 'Pausada', budget: 'R$ 15.000', spent: 'R$ 14.800', platform: 'Google' },
  { id: 3, name: 'Lançamento App', status: 'Ativa', budget: 'R$ 2.500', spent: 'R$ 450', platform: 'TikTok' },
  { id: 4, name: 'Retargeting Q1', status: 'Concluída', budget: 'R$ 3.000', spent: 'R$ 3.000', platform: 'Meta' },
];

const Campaigns = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campanhas</h2>
          <p className="text-slate-500">Gerencie e monitore suas campanhas publicitárias.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Nova Campanha
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
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
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Campaigns;