"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  MoreVertical,
  Layers,
  MessageSquare,
  Paperclip,
  Play
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { toast } from 'sonner';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const tasks = [
    { id: 1, title: 'Definição de Identidade Visual', status: 'Concluído', priority: 'Alta', assignee: 'Beatriz S.' },
    { id: 2, title: 'Aprovação de Orçamento Meta Ads', status: 'Em Andamento', priority: 'Média', assignee: 'Admin' },
    { id: 3, title: 'Criação de Copies para Reels', status: 'Pendente', priority: 'Alta', assignee: 'Carlos M.' },
    { id: 4, title: 'Configuração de Pixel de Rastreio', status: 'Pendente', priority: 'Baixa', assignee: 'Daniela C.' },
  ];

  const handleAddTask = () => {
    toast.success('Nova tarefa adicionada ao projeto!');
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="mb-4 -ml-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Projetos
        </Button>

        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <Layers size={28} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-3xl font-bold text-slate-900">Lançamento Coleção Inverno</h2>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Em Andamento</Badge>
              </div>
              <p className="text-slate-500 flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" /> Prazo Final: 15 de Junho, 2024 • Criado por Admin
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Arquivar</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Editar Projeto</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tasks & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Tarefas do Projeto</CardTitle>
              <Button size="sm" variant="outline" onClick={handleAddTask}>
                <Plus size={14} className="mr-1" /> Adicionar Tarefa
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${task.status === 'Concluído' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${task.status === 'Concluído' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{task.assignee}</span>
                          <span className="text-[10px] text-slate-300">•</span>
                          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${task.priority === 'Alta' ? 'text-red-600 border-red-100 bg-red-50' :
                              task.priority === 'Média' ? 'text-orange-600 border-orange-100 bg-orange-50' :
                                'text-blue-600 border-blue-100 bg-blue-50'
                            }`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <MessageSquare className="mr-2 text-blue-600" size={20} /> Discussão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?u=beatriz" />
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-50 p-3 rounded-lg flex-1">
                      <p className="text-xs font-bold text-slate-900 mb-1">Beatriz Silva</p>
                      <p className="text-xs text-slate-600">Os novos banners já estão na pasta de ativos. Podem revisar?</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="bg-blue-50 p-3 rounded-lg flex-1">
                      <p className="text-xs font-bold text-blue-900 mb-1">Você</p>
                      <p className="text-xs text-blue-700">Vou olhar agora mesmo, Beatriz!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Input placeholder="Escreva um comentário..." className="text-xs" />
                  <Button size="sm" className="bg-blue-600">Enviar</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Paperclip className="mr-2 text-slate-400" size={20} /> Arquivos e Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Guia_Estilo_Inverno.pdf', size: '2.4 MB', type: 'PDF' },
                  { name: 'Banner_Principal_V1.png', size: '5.1 MB', type: 'IMG' },
                  { name: 'Cronograma_Midia.xlsx', size: '1.2 MB', type: 'XLS' },
                ].map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded border border-slate-50 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {file.type}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-900">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{file.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-blue-600 mt-2">Ver todos os arquivos</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Stats & Team */}
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Resumo do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Progresso Geral</span>
                  <span className="text-slate-900">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tarefas</p>
                  <p className="text-xl font-bold text-slate-900">8/12</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dias Restantes</p>
                  <p className="text-xl font-bold text-orange-600">24</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50">
                <p className="text-xs font-bold text-slate-400 uppercase mb-3">Equipe Alocada</p>
                <div className="flex -space-x-2 overflow-hidden mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white text-[10px] font-bold text-slate-500">
                    +2
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs">Gerenciar Equipe</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Play className="mr-2 text-green-600" size={20} /> Campanhas Vinculadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Meta Ads - Inverno V1', status: 'Ativa' },
                { name: 'Google Search - Coleção', status: 'Pausada' },
              ].map((camp, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-900">{camp.name}</span>
                  <Badge variant={camp.status === 'Ativa' ? 'default' : 'secondary'} className="text-[9px]">
                    {camp.status}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-blue-600" onClick={() => navigate('/campaigns')}>
                Vincular Nova Campanha
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;