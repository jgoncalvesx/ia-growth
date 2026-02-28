"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Facebook, Chrome, Music2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const handleConnect = (platform: string) => {
    toast.success(`Conectando ao ${platform}... Redirecionando para autenticação.`);
  };

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Configurações</h2>
        <p className="text-slate-500">Gerencie sua conta e conexões de plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" defaultValue="admin@midiaos.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Cargo</Label>
                <Input id="role" defaultValue="Marketing Manager" />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveProfile}>Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Integrações de Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Meta Ads', icon: Facebook, color: 'text-blue-600', status: 'Conectado' },
                { name: 'Google Ads', icon: Chrome, color: 'text-red-500', status: 'Desconectado' },
                { name: 'TikTok Ads', icon: Music2, color: 'text-black', status: 'Desconectado' },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-slate-100 ${platform.color}`}>
                      <platform.icon size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{platform.name}</p>
                      <p className="text-xs text-slate-500">Sincronização de campanhas e leads.</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {platform.status === 'Conectado' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                        <CheckCircle2 size={12} className="mr-1" /> Ativo
                      </Badge>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleConnect(platform.name)}>
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Alertas de Campanha</p>
                  <p className="text-xs text-slate-500">Avisos de orçamento.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Relatórios Semanais</p>
                  <p className="text-xs text-slate-500">Resumo toda segunda.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Novos Leads</p>
                  <p className="text-xs text-slate-500">Tempo real.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;