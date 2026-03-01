"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { UserPlus, Mail, Shield, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const teamMembers = [
  { id: 1, name: 'Admin User', email: 'admin@midiaos.com', role: 'Proprietário', status: 'Ativo', avatar: 'https://github.com/shadcn.png' },
  { id: 2, name: 'Beatriz Silva', email: 'beatriz@midiaos.com', role: 'Editor', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=beatriz' },
  { id: 3, name: 'Carlos Mendes', email: 'carlos@midiaos.com', role: 'Analista', status: 'Pendente', avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 4, name: 'Daniela Costa', email: 'daniela@midiaos.com', role: 'Visualizador', status: 'Ativo', avatar: 'https://i.pravatar.cc/150?u=daniela' },
];

const Team = () => {
  const handleInvite = () => {
    toast.success('Convite enviado para o e-mail informado!');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Equipe</h2>
          <p className="text-slate-500">Gerencie os membros da sua equipe e suas permissões.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleInvite}>
          <UserPlus className="mr-2 h-4 w-4" /> Convidar Membro
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs text-slate-500 flex items-center">
                  <Mail size={12} className="mr-1" /> {member.email}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center space-x-2">
                  <Shield size={14} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{member.role}</span>
                </div>
                <Badge variant={member.status === 'Ativo' ? 'default' : 'secondary'}>
                  {member.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Team;