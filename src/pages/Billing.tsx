"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check, CreditCard, Receipt, Zap, ShieldCheck, Globe } from 'lucide-react';
import { toast } from 'sonner';

const Billing = () => {
  const handleUpgrade = () => {
    toast.success('Redirecionando para o checkout seguro...');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Faturamento e Assinatura</h2>
        <p className="text-slate-500">Gerencie seu plano, métodos de pagamento e histórico de faturas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Current Plan */}
        <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Plano Atual: Business Pro</CardTitle>
              <CardDescription>Sua próxima renovação é em 15 de Junho, 2024.</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-700 border-none px-3 py-1">Ativo</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">O que está incluído:</p>
                {[
                  'Campanhas Ilimitadas',
                  'Até 10 membros na equipe',
                  'IA Generativa Avançada',
                  'Suporte Prioritário 24/7',
                  'Integrações Customizadas'
                ].map((feature) => (
                  <div key={feature} className="flex items-center text-sm text-slate-600">
                    <Check size={16} className="text-green-500 mr-2" /> {feature}
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
                <p className="text-sm text-slate-500 mb-1">Valor Mensal</p>
                <p className="text-4xl font-black text-slate-900">R$ 299</p>
                <p className="text-xs text-slate-400 mt-1">cobrado mensalmente</p>
                <Button variant="outline" className="mt-6 w-full" onClick={handleUpgrade}>Alterar Plano</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center">
              <CreditCard className="mr-2 text-slate-400" size={20} /> Método de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">•••• 4242</p>
                  <p className="text-[10px] text-slate-500 uppercase">Expira em 12/26</p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] border-blue-200 text-blue-600">Principal</Badge>
            </div>
            <Button variant="ghost" className="w-full text-xs text-blue-600 hover:bg-blue-50">
              + Adicionar novo cartão
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center">
            <Receipt className="mr-2 text-slate-400" size={20} /> Histórico de Faturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Data</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">ID da Fatura</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Valor</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="pb-4 text-xs font-semibold text-slate-500 uppercase text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { date: '15 Mai, 2024', id: 'INV-2024-005', amount: 'R$ 299,00', status: 'Pago' },
                  { date: '15 Abr, 2024', id: 'INV-2024-004', amount: 'R$ 299,00', status: 'Pago' },
                  { date: '15 Mar, 2024', id: 'INV-2024-003', amount: 'R$ 299,00', status: 'Pago' },
                ].map((invoice, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-sm text-slate-600">{invoice.date}</td>
                    <td className="py-4 text-sm font-mono text-slate-500">{invoice.id}</td>
                    <td className="py-4 text-sm font-bold text-slate-900">{invoice.amount}</td>
                    <td className="py-4">
                      <Badge className="bg-green-100 text-green-700 border-none text-[10px]">{invoice.status}</Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600 h-8">Download PDF</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Billing;