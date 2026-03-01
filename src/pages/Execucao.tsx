"use client";

import React from 'react';
import Layout from '../components/Layout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { 
  PlayCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  RotateCw, 
  Terminal, 
  ShieldAlert, 
  X,
  Loader2,
  Clock,
  History
} from 'lucide-react';
import { 
  fetchAcoesPendentes, 
  executarAcao, 
  ignorarAcao, 
  fetchAuditLog 
} from '../services/api.service';
import { toast } from 'sonner';
import { useClient } from '../context/ClientContext';

const Execucao = () => {
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [acoes, setAcoes] = React.useState<any[]>([]);
  const [logs, setLogs] = React.useState<any[]>([]);
  const [selectedAcao, setSelectedAcao] = React.useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [executing, setExecuting] = React.useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [acoesData, logsData] = await Promise.all([
        fetchAcoesPendentes(),
        fetchAuditLog()
      ]);
      setAcoes(Array.isArray(acoesData) ? acoesData : []);
      setLogs(Array.isArray(logsData) ? logsData : []);
    } catch (error) {
      toast.error('Erro ao conectar com a central de execução.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [selectedClient.id]);

  const handleIgnorar = async (id: string) => {
    try {
      await ignorarAcao(id);
      setAcoes(prev => prev.filter(a => a.id !== id));
      toast.info('Ação ignorada e removida da lista.');
    } catch (error) {
      toast.error('Erro ao ignorar ação.');
    }
  };

  const handleConfirmarExecucao = async () => {
    if (!selectedAcao) return;
    setExecuting(true);
    try {
      await executarAcao(selectedAcao.id);
      setAcoes(prev => prev.filter(a => a.id !== selectedAcao.id));
      toast.success(`Executado: ${selectedAcao.titulo}`);
      setIsConfirmOpen(false);
      loadData(); // Recarrega para atualizar o audit log
    } catch (error) {
      toast.error('Erro na execução do comando via API.');
    } finally {
      setExecuting(false);
      setSelectedAcao(null);
    }
  };

  const getUrgencyBadge = (urgencia: string) => {
    switch (urgencia) {
      case 'alta':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Urgente</Badge>;
      case 'media':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">Atenção</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">Otimização</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center">
            <PlayCircle className="mr-3 text-blue-600" size={28} /> Central de Execução
          </h2>
          <p className="text-slate-500">
            {loading ? 'Sincronizando...' : `${acoes.length} ações pendentes de aprovação`}
          </p>
        </div>
        <Button variant="outline" onClick={loadData} disabled={loading} className="bg-white">
          <RotateCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna Esquerda: Ações Pendentes */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Ações Pendentes</h3>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map(i => (
                <Card key={i} className="animate-pulse bg-white border-slate-200 h-64" />
              ))}
            </div>
          ) : acoes.length > 0 ? (
            <div className="space-y-4">
              {acoes.map((acao) => (
                <Card key={acao.id} className="bg-white border-slate-200 shadow-sm overflow-hidden hover:border-blue-200 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900">{acao.titulo}</CardTitle>
                        <p className="text-xs text-slate-500 font-medium">{acao.conta_nome}</p>
                      </div>
                      {getUrgencyBadge(acao.urgencia)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center">
                        <Zap size={12} className="mr-1 text-blue-600" /> Racional da IA
                      </p>
                      <p className="text-sm text-slate-700 italic leading-relaxed">"{acao.racional}"</p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg flex items-center space-x-3 group">
                      <Terminal size={14} className="text-slate-500" />
                      <code className="text-xs text-blue-400 font-mono truncate">{acao.comando_api}</code>
                    </div>

                    <div className="flex items-center text-green-600 font-bold text-sm">
                      <CheckCircle2 size={16} className="mr-2" /> 
                      Economia estimada: {acao.economia_estimada}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex justify-end space-x-3">
                    <Button 
                      variant="ghost" 
                      className="text-slate-500 hover:text-red-600"
                      onClick={() => handleIgnorar(acao.id)}
                    >
                      <X size={16} className="mr-2" /> Ignorar
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 shadow-sm"
                      onClick={() => {
                        setSelectedAcao(acao);
                        setIsConfirmOpen(true);
                      }}
                    >
                      Aprovar e Executar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Nenhuma ação pendente no momento ✓</h4>
              <p className="text-slate-500 mt-2">Sua operação está rodando com performance máxima.</p>
            </div>
          )}
        </div>

        {/* Coluna Direita: Audit Log */}
        <div className="lg:col-span-5">
          <Card className="bg-white border-slate-200 shadow-sm sticky top-24">
            <CardHeader className="border-b border-slate-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center">
                  <History size={16} className="mr-2" /> Histórico de Hoje
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-bold">AUDIT LOG</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="divide-y divide-slate-50">
                  {logs.length > 0 ? logs.map((log) => (
                    <div key={log.id} className="p-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {log.hora}
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">{log.executado_por}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {log.mensagem} <span className="font-bold">{log.alvo}</span>
                      </p>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      Nenhum registro de atividade hoje.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de Confirmação */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="bg-white sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Confirmar Execução</DialogTitle>
            <DialogDescription>
              Você está prestes a autorizar uma alteração direta na API da plataforma de anúncios.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAcao && (
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Ação</p>
                <p className="text-sm font-bold text-slate-900">{selectedAcao.titulo}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Comando Técnico</p>
                <div className="bg-slate-900 p-2 rounded font-mono text-xs text-blue-400">
                  {selectedAcao.comando_api}
                </div>
              </div>

              <div className="flex items-center text-green-600 font-bold text-xs">
                <CheckCircle2 size={14} className="mr-2" />
                Economia estimada: {selectedAcao.economia_estimada}
              </div>

              <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-start space-x-3 text-orange-700">
                <ShieldAlert size={18} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">
                  Aviso: Esta ação pode ser desfeita através do log de atividades em até 2 horas após a execução.
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={executing}>
              Cancelar
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleConfirmarExecucao}
              disabled={executing}
            >
              {executing ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Confirmar e Executar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Execucao;