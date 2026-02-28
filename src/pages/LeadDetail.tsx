"use client";

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  User,
  Tag,
  Send
} from 'lucide-react';
import ChangeLeadStatusModal from '../components/ChangeLeadStatusModal';
import { toast } from 'sonner';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState('');
  const [notes, setNotes] = React.useState([
    { id: 1, text: 'Cliente interessado no pacote premium.', date: '20/05/2024 14:30', author: 'Admin' },
    { id: 2, text: 'Solicitou orçamento detalhado por e-mail.', date: '20/05/2024 15:45', author: 'Admin' }
  ]);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    
    const newNote = {
      id: Date.now(),
      text: note,
      date: new Date().toLocaleString('pt-BR'),
      author: 'Admin'
    };
    
    setNotes([newNote, ...notes]);
    setNote('');
    toast.success('Nota salva com sucesso!');
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/leads')}
          className="mb-4 -ml-2 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Leads
        </Button>
        
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={32} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-3xl font-bold text-slate-900">João Silva</h2>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Novo</Badge>
              </div>
              <p className="text-slate-500 flex items-center text-sm">
                <Tag className="mr-2 h-4 w-4" /> Origem: Instagram Ads • Campanha: Verão 2024
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">Desqualificar</Button>
            <ChangeLeadStatusModal currentStatus="Novo" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-600">
                <Mail size={18} className="text-slate-400" />
                <span className="text-sm">joao@exemplo.com</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Phone size={18} className="text-slate-400" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Calendar size={18} className="text-slate-400" />
                <span className="text-sm">Registrado em 20/05/2024</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Adicionar Nota</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-32 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-3"
                placeholder="Digite algo importante sobre este lead..."
              ></textarea>
              <Button className="w-full" onClick={handleSaveNote} disabled={!note.trim()}>
                <Send className="mr-2 h-4 w-4" /> Salvar Nota
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Notas e Comentários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notes.map((n) => (
                  <div key={n.id} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase">{n.author}</span>
                      <span className="text-[10px] text-slate-400">{n.date}</span>
                    </div>
                    <p className="text-sm text-slate-700">{n.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Histórico de Atividades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                {[
                  { title: 'Lead Criado', desc: 'O lead entrou via formulário do Instagram.', time: 'Há 2 horas', icon: User, color: 'bg-blue-500' },
                  { title: 'E-mail de Boas-vindas', desc: 'E-mail automático enviado com sucesso.', time: 'Há 1 hora', icon: Mail, color: 'bg-purple-500' },
                  { title: 'Tentativa de Contato', desc: 'Ligação não atendida. Deixado recado.', time: 'Há 30 minutos', icon: Phone, color: 'bg-orange-500' },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white z-10`}>
                      <item.icon size={18} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">{item.time}</span>
                      </div>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetail;