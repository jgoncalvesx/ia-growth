"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { FolderPlus, Calendar, CheckCircle2, Clock, MoreVertical, Users, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useClient } from '../context/ClientContext';
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
    }
];
const Projects = () => {
    const navigate = useNavigate();
    const { selectedClient } = useClient();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [selectedClient.id]);
    const handleCreateProject = () => {
        toast.success(`Iniciando novo projeto para ${selectedClient.name}`);
    };
    return (_jsxs(Layout, { children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900", children: "Projetos" }), _jsxs("p", { className: "text-slate-500", children: ["Iniciativas estrat\u00E9gicas para ", _jsx("span", { className: "font-bold text-blue-600", children: selectedClient.name }), "."] })] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200", onClick: handleCreateProject, children: [_jsx(FolderPlus, { className: "mr-2 h-4 w-4" }), " Novo Projeto"] })] }), loading ? (_jsx("div", { className: "h-[40vh] flex items-center justify-center", children: _jsx(Loader2, { className: "animate-spin text-blue-600", size: 32 }) })) : (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [projects.map((project) => (_jsxs(Card, { className: "bg-white border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden border-t-4", style: { borderTopColor: project.color.replace('bg-', '') }, children: [_jsxs(CardHeader, { className: "pb-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("div", { className: `w-10 h-10 rounded-xl ${project.color} flex items-center justify-center text-white shadow-md`, children: _jsx(Layers, { size: 20 }) }), _jsx("button", { className: "text-slate-400 hover:text-slate-600", children: _jsx(MoreVertical, { size: 20 }) })] }), _jsx(CardTitle, { className: "text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer", onClick: () => navigate(`/projects/${project.id}`), children: project.name }), _jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [_jsx(Badge, { variant: "secondary", className: "bg-slate-100 text-slate-600 border-none text-[9px] uppercase font-bold", children: project.status }), _jsxs("span", { className: "text-[10px] font-bold text-slate-400 flex items-center uppercase", children: [_jsx(Calendar, { size: 12, className: "mr-1" }), " ", project.deadline] })] })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-[10px] font-bold uppercase text-slate-400", children: [_jsx("span", { children: "Progresso" }), _jsxs("span", { className: "text-slate-900", children: [project.progress, "%"] })] }), _jsx(Progress, { value: project.progress, className: "h-1.5" })] }), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(CheckCircle2, { size: 14, className: "text-green-500" }), _jsxs("span", { className: "text-xs font-bold text-slate-700", children: [project.tasks.completed, "/", project.tasks.total] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Users, { size: 14, className: "text-slate-400" }), _jsx("span", { className: "text-xs font-bold text-slate-700", children: project.team })] })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-[10px] font-bold uppercase text-blue-600 hover:bg-blue-50 h-8", onClick: () => navigate(`/projects/${project.id}`), children: ["Detalhes ", _jsx(ArrowRight, { size: 14, className: "ml-1" })] })] })] })] }, project.id))), _jsxs("button", { className: "border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-500 transition-all group min-h-[250px]", onClick: handleCreateProject, children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", children: _jsx(FolderPlus, { size: 24 }) }), _jsx("span", { className: "text-sm font-black uppercase tracking-widest", children: "Novo Projeto" }), _jsxs("p", { className: "text-[10px] text-slate-400 mt-2 font-medium", children: ["Agrupe estrat\u00E9gias para ", selectedClient.name] })] })] }))] }));
};
export default Projects;
//# sourceMappingURL=Projects.js.map