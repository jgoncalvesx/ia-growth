"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Grid, 
  MessageSquare, 
  Mail, 
  Zap, 
  Database, 
  Share2, 
  CheckCircle2,
  ExternalLink,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

const integrationApps = [
  { id: 1, name: 'Slack', category: 'Comunicação', description: 'Receba alertas de leads e performance direto nos canais.', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50', connected: true },
  { id: 2, name: 'Zapier', category: 'Automação', description: 'Conecte o MidiaOS a mais de 5.000 aplicativos.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50', connected: false },
  { id: 3, name: 'Mailchimp', category: 'E-mail Marketing', description: 'Sincronize seus leads automaticamente com suas listas.', icon: Mail, color: 'text-yellow-600', bg: 'bg-yellow-50', connected: true },
  { id: 4, name: 'HubSpot', category: 'CRM', description: 'Mantenha seu funil de vendas sempre atualizado.', icon: Database, color: 'text-orange-600', bg: 'bg-orange-50', connected: false },
  { id: 5, name: 'WhatsApp', category: 'Comunicação', description: 'Envie mensagens automáticas para novos leads.', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', connected: false },
  { id: 6, name: 'Google Sheets', category: 'Dados', description: 'Exporte dados de performance em tempo real.', icon: Grid, color: 'text-green-700', bg: 'bg-green-50', connected: false },
];

const Integrations = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleToggleConnect = (name: string, isConnected: boolean) => {
    if (isConnected) {
      toast.info(`${name} desconectado com sucesso.`);
    } else {
      toast.success(`Conectando ao ${name}... Redirecionando para autorização.`);
    }
  };

  const filteredApps = integrationApps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Marketplace de Integrações</h2>
          <p className="text-slate-500">Conecte suas ferramentas favoritas para potencializar seus resultados.</p>
        </div>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Sugerir App
        </Button>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Buscar integrações por nome ou categoria..." 
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          {['Todos', 'Comunicação', 'Automação', 'CRM', 'Dados'].map((cat) => (
            <Button key={cat} variant="ghost" size="sm" className="text-xs font-medium text-slate-600 hover:bg-slate-100">
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <Card key={app.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${app.bg} ${app.color}`}>
                  <app.icon size={24} />
                </div>
                {app.connected && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                    <CheckCircle2 size={12} className="mr-1" /> Conectado
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-4">{app.name}</CardTitle>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{app.category}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-slate-600 leading-relaxed min-h-[40px]">
                {app.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <Button variant="ghost" size="sm" className="text-xs text-slate-500 p-0 h-auto hover:bg-transparent hover:text-slate-900">
                  <ExternalLink size={14} className="mr-1" /> Documentação
                </Button>
                <Button 
                  variant={app.connected ? "outline" : "default"} 
                  size="sm"
                  className={!app.connected ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => handleToggleConnect(app.name, app.connected)}
                >
                  {app.connected ? 'Desconectar' : 'Conectar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Webhook Section */}
      <Card className="mt-12 bg-slate-900 text-white border-none shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Share2 size={120} />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold mb-2">Precisa de algo personalizado?</h3>
            <p className="text-slate-400 mb-6">
              Use nossos Webhooks e API para conectar qualquer sistema proprietário ao MidiaOS. 
              Automatize fluxos de dados complexos com total liberdade.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 border-none">
                Configurar Webhook
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                Ver Documentação API
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Integrations;