"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

const Settings = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Configurações</h2>
        <p className="text-slate-500">Gerencie sua conta e preferências do sistema.</p>
      </div>

      <div className="max-w-2xl space-y-8">
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
            <Button className="bg-blue-600 hover:bg-blue-700">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Notificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Alertas de Campanha</p>
                <p className="text-xs text-slate-500">Receba avisos quando uma campanha atingir o limite de orçamento.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Relatórios Semanais</p>
                <p className="text-xs text-slate-500">Receba um resumo de performance toda segunda-feira.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Novos Leads</p>
                <p className="text-xs text-slate-500">Notificações em tempo real para cada novo lead gerado.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;