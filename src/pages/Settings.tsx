"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Facebook, Chrome, Music2, CheckCircle2, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleConnect = (platform: string) => {
    toast.success(`Conectando ao ${platform}... Redirecionando para autenticação.`);
  };

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Configurações</h2>
        <p className="text-muted-foreground">Gerencie sua conta e conexões de plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
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
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveProfile}>Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Integrações de Plataforma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Meta Ads', icon: Facebook, color: 'text-blue-600', status: 'Conectado' },
                { name: 'Google Ads', icon: Chrome, color: 'text-red-500', status: 'Desconectado' },
                { name: 'TikTok Ads', icon: Music2, color: 'text-foreground', status: 'Desconectado' },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-muted ${platform.color}`}>
                      <platform.icon size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{platform.name}</p>
                      <p className="text-xs text-muted-foreground">Sincronização de campanhas e leads.</p>
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
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Aparência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground mb-4">Escolha o tema da interface.</p>
              <button
                onClick={() => setTheme('dark')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted text-foreground'
                }`}
              >
                <Moon size={18} />
                <div className="text-left">
                  <p className="text-sm font-medium">Escuro</p>
                  <p className="text-xs text-muted-foreground">Tema dark (padrão)</p>
                </div>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border transition-all ${
                  theme === 'light'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-muted text-foreground'
                }`}
              >
                <Sun size={18} />
                <div className="text-left">
                  <p className="text-sm font-medium">Claro</p>
                  <p className="text-xs text-muted-foreground">Tema básico branco</p>
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Alertas de Campanha</p>
                  <p className="text-xs text-muted-foreground">Avisos de orçamento.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Relatórios Semanais</p>
                  <p className="text-xs text-muted-foreground">Resumo toda segunda.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Novos Leads</p>
                  <p className="text-xs text-muted-foreground">Tempo real.</p>
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