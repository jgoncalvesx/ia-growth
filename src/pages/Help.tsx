"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Video, 
  FileText, 
  ExternalLink,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const Help = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Como podemos ajudar?</h2>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <Input 
              placeholder="Busque por tutoriais, artigos ou dúvidas..." 
              className="pl-12 h-14 text-lg shadow-sm border-slate-200 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Book, title: 'Documentação', desc: 'Guias detalhados de todas as ferramentas.', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: Video, title: 'Tutoriais em Vídeo', desc: 'Aprenda visualmente como configurar o MidiaOS.', color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: MessageCircle, title: 'Suporte ao Vivo', desc: 'Fale com nosso time de especialistas agora.', color: 'text-green-600', bg: 'bg-green-50' },
          ].map((item, i) => (
            <Card key={i} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-slate-900">Dúvidas Frequentes</h3>
          <div className="space-y-3">
            {[
              'Como conectar minha conta do Meta Ads?',
              'Como funciona o gerador de copies com IA?',
              'Posso exportar meus leads para um CRM externo?',
              'Como configurar alertas de orçamento crítico?',
              'Como convidar novos membros para minha equipe?'
            ].map((q, i) => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-blue-200 cursor-pointer transition-colors group">
                <div className="flex items-center space-x-3">
                  <HelpCircle size={18} className="text-slate-400 group-hover:text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">{q}</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-12 bg-slate-900 text-white border-none shadow-xl overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Ainda precisa de ajuda?</h3>
              <p className="text-slate-400 text-sm">Nosso time de suporte está disponível 24/7 para você.</p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 border-none">
                Abrir Ticket
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Ver Status do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;