"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  FolderPlus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const projects = [
  { 
    id: 1, 
    name: 'Lançamento Coleção Inverno', 
    status: 'Em Andamento', 
    progress: 65, 
    deadline: '15 Jun, 2024',
    team: 4,
    tasks: { total: 12, completed: 8 },
    color: 'bg-blue-600'
  },
  { 
    id: 2, 
    name: 'Rebranding Institucional', 
    status: 'Planejamento', 
    progress: 15, 
    deadline: '30 Jul, 2024',
    team: 6,
    tasks: { total: 24, completed: 3 },
    color: 'bg-purple-600'
  },
  { 
    id: 3, 
    name: 'Expansão Mercado Latam', 
    status: 'Em Andamento', 
    progress: 40, 
    deadline: '10 Ago, 2024',
    team: 3,
    tasks: { total: 18, completed: 7 },
    color: 'bg-orange-600'
  },
  { 
    id: 4, 
    name: 'Campanha Black Friday 2024', 
    status: 'Aguardando', 
    progress: 0, 
    deadline: '20 Nov, 2024',
    team: 8,
    tasks: { total: 45, completed: 0 },
    color: 'bg-slate-600'
  }
];

const Projects = () => {
  const navigate = useNavigate();
  const handleCreateProject = () => {
    toast.success('Iniciando assistente de criação de projeto...');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Projetos de Marketing</h2>
          <p className="text-slate-500">Gerencie grandes iniciativas e coordene sua equipe.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateProject}>
          <FolderPlus className="mr-2 h-4 w-4" /> Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className={`w-10 h-10 rounded-lg ${project.color} flex items-center justify-center text-white`}>
                  <Layers size={20} />
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <CardTitle 
                className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {project.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={project.status === 'Em Andamento' ? 'default' : 'secondary'} className="text-[10px] uppercase">
                  {project.status}
                </Badge>
                <span className="text-xs text-slate-400 flex items-center">
                  <Calendar size={12} className="mr-1" /> {project.deadline}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Progresso Geral</span>
                  <span className="text-slate-900">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-slate-50 rounded-md text-slate-400">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Tarefas</p>
                    <p className="text-xs font-bold text-slate-700">{project.tasks.completed}/{project.tasks.total}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-slate-50 rounded-md text-slate-400">
                    <Users size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Equipe</p>
                    <p className="text-xs font-bold text-slate-700">{project.team} membros</p>
                  </div>
                </div>
              </div>

              <Button 
                variant="ghost" 
                className="w-full text-xs text-blue-600 hover:bg-blue-50 group/btn"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                Ver Detalhes do Projeto <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <button 
          className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-500 transition-all group"
          onClick={handleCreateProject}
        >
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FolderPlus size={24} />
          </div>
          <span className="text-sm font-bold">Criar Novo Projeto</span>
          <p className="text-xs text-slate-400 mt-1">Agrupe campanhas e tarefas</p>
        </button>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <Clock className="mr-2 text-blue-600" size={20} /> Atividade Recente nos Projetos
        </h3>
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { user: 'Beatriz Silva', action: 'completou a tarefa', target: 'Design do Banner Principal', project: 'Lançamento Inverno', time: 'Há 10 min' },
                { user: 'Carlos Mendes', action: 'adicionou um comentário em', target: 'Estratégia de Canais', project: 'Expansão Latam', time: 'Há 45 min' },
                { user: 'Admin User', action: 'criou o projeto', target: 'Campanha Black Friday 2024', project: 'Black Friday', time: 'Há 2 horas' },
                { user: 'Daniela Costa', action: 'alterou o prazo de', target: 'Aprovação de Orçamento', project: 'Rebranding', time: 'Há 5 horas' },
              ].map((activity, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <span className="font-bold text-slate-900">{activity.user}</span>
                      <span className="text-slate-500 mx-1">{activity.action}</span>
                      <span className="font-medium text-blue-600">{activity.target}</span>
                      <span className="text-slate-400 text-xs ml-2">em {activity.project}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Projects;