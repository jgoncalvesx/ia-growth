"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Search, 
  Filter, 
  User, 
  Megaphone, 
  FileVideo, 
  Settings, 
  Zap,
  Clock,
  Download,
  Loader2
} from 'lucide-react';
import { fetchAuditLog } from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { toast } from 'sonner';

const ActivityLog = () => {
  const { selectedClient } = useClient();
  const [loading, setLoading] = React.useState(true);
  const [activities, setActivities] = React.useState<any[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await fetchAuditLog();
      setActivities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar log de atividades", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadActivities();
  }, [selectedClient.id]);

  const filteredActivities = activities.filter(act => 
    act.executado_por.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.mensagem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.alvo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'automation': return Zap;
      case 'campaign': return Megaphone;
      case 'content': return FileVideo;
      case 'system': return Settings;
      default: return User;
    }
  };

  const getColor = (tipo: string) => {
    switch (tipo) {
      case 'automation': return 'text-orange-600 bg-orange-50';
      case 'campaign': return 'text-blue-600 bg-blue-50';
      case 'content': return 'text-purple-600 bg-purple-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Log de Atividades</h2>
          <p className="text-slate-500">Histórico completo para <span className="font-bold text-blue-600">{selectedClient.name}</span>.</p>
        </div>
        <Button variant="outline" onClick={() => toast.success('Log exportado com sucesso!')}>
          <Download className="mr-2 h-4 w-4" /> Exportar Log
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Filtrar por usuário, ação ou alvo..." 
            className="pl-10 bg-slate-50 border-none" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="sm" className="text-slate-600">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={32} />
        </div>
      ) : (
        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {filteredActivities.length > 0 ? filteredActivities.map((activity) => {
                const Icon = getIcon(activity.tipo);
                const colorClass = getColor(activity.tipo);
                return (
                  <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-bold text-slate-900">{activity.executado_por}</span>
                          <span className="text-slate-500 mx-1">{activity.mensagem}</span>
                          <span className="font-bold text-blue-600">{activity.alvo}</span>
                        </p>
                        <div className="flex items-center mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <Clock size={10} className="mr-1" /> {activity.hora}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                      Ver Detalhes
                    </Button>
                  </div>
                );
              }) : (
                <div className="p-12 text-center text-slate-400">
                  Nenhuma atividade encontrada para o filtro selecionado.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default ActivityLog;