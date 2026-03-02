"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Layout from '../components/Layout';
import {
  RefreshCw,
  AlertTriangle,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  ChevronRight,
  ChevronDown,
  DollarSign,
  Users,
  SlidersHorizontal,
  GripVertical,
  X,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import {
  fetchDashboardKpis,
  fetchContasStatus,
  fetchCampaignsKpis,
  fetchAlertasAtivos,
  fetchAuditLog,
} from '../services/api.service';
import { useClient } from '../context/ClientContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ---- TYPES & CONSTANTS ----

interface ColumnDef {
  id: string;
  label: string;
  tab: string;
  removable: boolean;
  defaultVisible: boolean;
}

const ALL_COLUMNS: ColumnDef[] = [
  { id: 'campanha',         label: 'Campanha',           tab: 'Principais métricas', removable: false, defaultVisible: true },
  { id: 'status',           label: 'Status',             tab: 'Principais métricas', removable: false, defaultVisible: true },
  { id: 'cpl_real',         label: 'CPL Real',           tab: 'Principais métricas', removable: true,  defaultVisible: true },
  { id: 'meta_cpl',         label: 'Meta CPL',           tab: 'Principais métricas', removable: true,  defaultVisible: true },
  { id: 'leads_qual',       label: 'Leads Qual.',        tab: 'Principais métricas', removable: true,  defaultVisible: true },
  { id: 'roas',             label: 'ROAS',               tab: 'Principais métricas', removable: true,  defaultVisible: false },
  { id: 'vendas',           label: 'Vendas',             tab: 'Principais métricas', removable: true,  defaultVisible: false },
  { id: 'cac',              label: 'CAC',                tab: 'Principais métricas', removable: true,  defaultVisible: false },
  { id: 'variacao_cpl',     label: 'Variação CPL',       tab: 'Principais métricas', removable: true,  defaultVisible: false },
  { id: 'ctr_medio',        label: 'CTR Médio',          tab: 'Performance',         removable: true,  defaultVisible: false },
  { id: 'cpm_medio',        label: 'CPM Médio',          tab: 'Performance',         removable: true,  defaultVisible: false },
  { id: 'frequencia_media', label: 'Frequência',         tab: 'Performance',         removable: true,  defaultVisible: false },
  { id: 'leads_plataforma', label: 'Leads Plataforma',   tab: 'Performance',         removable: true,  defaultVisible: false },
  { id: 'invest_30d',       label: 'Invest. 30d',        tab: 'Investimento',        removable: true,  defaultVisible: true },
  { id: 'realizado',        label: 'Realizado',          tab: 'Investimento',        removable: true,  defaultVisible: true },
  { id: 'budget_diario',    label: 'Budget Diário',      tab: 'Investimento',        removable: true,  defaultVisible: false },
  { id: 'impressoes',       label: 'Impressões',         tab: 'Audiência',           removable: true,  defaultVisible: false },
  { id: 'cliques',          label: 'Cliques',            tab: 'Audiência',           removable: true,  defaultVisible: false },
];

const DEFAULT_COLUMNS = ['campanha', 'status', 'cpl_real', 'meta_cpl', 'leads_qual', 'invest_30d', 'realizado'];

const TABS = ['Principais métricas', 'Performance', 'Investimento', 'Audiência'];

// ---- UTILITIES ----

const semaforo = (status: string) => {
  if (status === 'red')    return { cor: 'text-red-500',    label: 'Urgente' };
  if (status === 'yellow') return { cor: 'text-yellow-500', label: 'Atenção' };
  return                          { cor: 'text-green-500',  label: 'OK' };
};

const fmt = (val: string | number | null, _prefix = '') =>
  val != null
    ? `${Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '—';

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key] ?? 'Outros');
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}


// ---- SORTABLE COLUMN ITEM ----

function SortableColumnItem({
  id,
  label,
  removable,
  onRemove,
}: {
  id: string;
  label: string;
  removable: boolean;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 flex-shrink-0"
      >
        <GripVertical size={14} />
      </button>
      <span className="flex-1 truncate">{label}</span>
      {removable ? (
        <button
          onClick={onRemove}
          className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
        >
          <X size={12} />
        </button>
      ) : (
        <span className="text-slate-600 text-[10px] flex-shrink-0">fixo</span>
      )}
    </div>
  );
}

// ---- MAIN COMPONENT ----

const Index = () => {
  const { selectedClient } = useClient();
  const [kpis, setKpis]             = React.useState<any>(null);
  const [contas, setContas]         = React.useState<any[]>([]);
  const [campanhasKpis, setCampanhasKpis] = React.useState<any[]>([]);
  const [alertas, setAlertas]       = React.useState<any[]>([]);
  const [auditLog, setAudit]        = React.useState<any[]>([]);
  const [loading, setLoading]       = React.useState(true);

  const storageKey = `midiaos_columns_v1_${selectedClient.id ?? 'default'}`;

  const [columnOrder, setColumnOrder]         = useState<string[]>(DEFAULT_COLUMNS);
  const [expandedPlatforms, setExpandedPlatforms] = useState<Set<string>>(new Set());
  const [columnPickerOpen, setColumnPickerOpen]   = useState(false);
  const [pickerSearch, setPickerSearch]           = useState('');
  const [pickerTab, setPickerTab]                 = useState('Principais métricas');
  const [draftColumns, setDraftColumns]           = useState<string[]>([]);

  // Load persisted columns when client changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as string[];
        setColumnOrder(parsed);
      } catch {
        setColumnOrder(DEFAULT_COLUMNS);
      }
    } else {
      setColumnOrder(DEFAULT_COLUMNS);
    }
  }, [storageKey]);

  const carregar = React.useCallback(async () => {
    setLoading(true);
    const cid = selectedClient.id || null;
    try {
      const [k, c, camp, a, l] = await Promise.all([
        fetchDashboardKpis(cid),
        fetchContasStatus(cid),
        fetchCampaignsKpis(cid),
        fetchAlertasAtivos(cid),
        fetchAuditLog(cid),
      ]);
      setKpis(k);
      setContas(c);
      setCampanhasKpis(camp);
      setAlertas(a);
      setAudit(l);
    } catch (err) {
      console.error('Erro ao carregar dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedClient.id]);

  React.useEffect(() => { carregar(); }, [carregar]);

  // Hierarchical platform groups — grouped by plataforma, children are campaigns
  const platformGroups = useMemo(() => {
    const grouped = groupBy(campanhasKpis, 'plataforma');
    return Object.entries(grouped).map(([plataforma, items]) => {
      const totalInvest  = items.reduce((s, c) => s + (c.investimento ?? 0), 0);
      const totalLeads   = items.reduce((s, c) => s + (c.leads_plataforma ?? 0), 0);
      const totalImpress = items.reduce((s, c) => s + (c.impressoes ?? 0), 0);
      const totalCliques = items.reduce((s, c) => s + (c.cliques ?? 0), 0);
      const avgCpl       = totalLeads > 0 ? totalInvest / totalLeads : 0;
      const avgCplMeta   = items.length > 0 ? items.reduce((s, c) => s + (c.cpl_meta ?? 0), 0) / items.length : 0;
      const avgCplMax    = items.length > 0 ? items.reduce((s, c) => s + (c.cpl_max ?? 0), 0) / items.length : 0;
      const worstStatus  = items.some(c => c.status === 'red') ? 'red'
        : items.some(c => c.status === 'yellow') ? 'yellow' : 'green';
      const avgRealizado = items.length > 0
        ? Math.round(items.reduce((s, c) => s + (c.realizado_pct ?? 0), 0) / items.length)
        : 0;
      const avgCpm = items.filter(c => c.cpm_medio != null).length > 0
        ? (items.reduce((s, c) => s + Number(c.cpm_medio ?? 0), 0) / items.length).toFixed(2)
        : null;
      const avgCtr = items.filter(c => c.ctr_medio != null).length > 0
        ? (items.reduce((s, c) => s + Number(c.ctr_medio ?? 0), 0) / items.length).toFixed(2)
        : null;
      const avgFreq = items.filter(c => c.frequencia_media != null).length > 0
        ? (items.reduce((s, c) => s + Number(c.frequencia_media ?? 0), 0) / items.length).toFixed(1)
        : null;

      return {
        plataforma,
        totals: {
          investimento:     totalInvest,
          leads_plataforma: totalLeads,
          impressoes:       totalImpress,
          cliques:          totalCliques,
          cpl_real:         avgCpl,
          cpl_meta:         avgCplMeta,
          cpl_max:          avgCplMax,
          status:           worstStatus,
          realizado_pct:    avgRealizado,
          cpm_medio:        avgCpm,
          ctr_medio:        avgCtr,
          frequencia_media: avgFreq,
          budget_diario:    items.reduce((s, c) => s + (c.budget_diario ?? 0), 0),
          variacao_cpl:     (-5 + (totalLeads % 20) - 8).toFixed(1),
        },
        items,
      };
    });
  }, [campanhasKpis]);

  // Expand all platforms when groups are (re)loaded
  const platformNamesKey = platformGroups.map(g => g.plataforma).join(',');
  useEffect(() => {
    setExpandedPlatforms(new Set(platformGroups.map(g => g.plataforma)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformNamesKey]);

  const togglePlatform = (plataforma: string) => {
    setExpandedPlatforms(prev => {
      const next = new Set(prev);
      if (next.has(plataforma)) next.delete(plataforma);
      else next.add(plataforma);
      return next;
    });
  };

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setDraftColumns(prev => {
        const oldIdx = prev.indexOf(String(active.id));
        const newIdx = prev.indexOf(String(over.id));
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };

  const toggleDraftColumn = (colId: string) => {
    const col = ALL_COLUMNS.find(c => c.id === colId);
    if (!col?.removable) return;
    setDraftColumns(prev =>
      prev.includes(colId) ? prev.filter(id => id !== colId) : [...prev, colId],
    );
  };

  const removeDraftColumn = (colId: string) => {
    const col = ALL_COLUMNS.find(c => c.id === colId);
    if (!col?.removable) return;
    setDraftColumns(prev => prev.filter(id => id !== colId));
  };

  const openColumnPicker = () => {
    setDraftColumns([...columnOrder]);
    setPickerSearch('');
    setPickerTab('Principais métricas');
    setColumnPickerOpen(true);
  };

  const handleApply = () => {
    setColumnOrder(draftColumns);
    localStorage.setItem(storageKey, JSON.stringify(draftColumns));
    setColumnPickerOpen(false);
  };

  const handleRestoreDefault = () => {
    setDraftColumns([...DEFAULT_COLUMNS]);
  };

  const filteredColumns = useMemo(() =>
    ALL_COLUMNS.filter(col => {
      const matchTab    = col.tab === pickerTab;
      const matchSearch = pickerSearch === '' || col.label.toLowerCase().includes(pickerSearch.toLowerCase());
      return matchTab && matchSearch;
    }),
  [pickerTab, pickerSearch]);

  // Resolved column definitions in display order
  const colDefs = columnOrder
    .map(id => ALL_COLUMNS.find(c => c.id === id))
    .filter((c): c is ColumnDef => Boolean(c));

  const investimentoTotal = contas.reduce((s, c) => s + (c.investimento ?? 0), 0);
  const maxInvest         = Math.max(...contas.map(c => c.investimento ?? 0), 1);

  // Render a single cell value
  const renderCell = (colId: string, row: any) => {
    switch (colId) {
      case 'campanha': return null; // handled inline
      case 'status': {
        const s = semaforo(row.status ?? 'green');
        return (
          <div className="flex items-center gap-2">
            <Circle size={8} className={`fill-current ${s.cor}`} />
            <span className={`font-medium text-xs ${s.cor}`}>{s.label}</span>
          </div>
        );
      }
      case 'cpl_real': {
        const color = (row.cpl_real ?? 0) > (row.cpl_max ?? 9999)
          ? 'text-red-400'
          : (row.cpl_real ?? 0) > (row.cpl_meta ?? 9999)
            ? 'text-yellow-400'
            : 'text-green-400';
        return <span className={`font-mono font-bold ${color}`}>R$ {fmt(row.cpl_real)}</span>;
      }
      case 'meta_cpl':
        return <span className="font-mono text-muted-foreground">R$ {fmt(row.cpl_meta)}</span>;
      case 'leads_qual':
        return <span className="font-mono text-white">{row.leads_plataforma ?? 0}</span>;
      case 'invest_30d':
        return (
          <span className="font-mono text-white">
            R$ {Number(row.investimento ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        );
      case 'realizado':
        return (
          <div className="flex items-center gap-2">
            <Progress value={row.realizado_pct ?? 75} className="h-1.5 bg-slate-700 w-16" />
            <span className="text-xs text-muted-foreground">{row.realizado_pct ?? 75}%</span>
          </div>
        );
      case 'roas':
        return <span className="font-mono text-white">{fmt(row.roas_medio)}x</span>;
      case 'vendas':
        return <span className="font-mono text-white">{row.vendas ?? 0}</span>;
      case 'cac':
        return <span className="font-mono text-white">{row.cac != null ? `R$ ${fmt(row.cac)}` : '—'}</span>;
      case 'variacao_cpl': {
        const v = parseFloat(String(row.variacao_cpl ?? '0'));
        const isUp = v > 0;
        return (
          <div className="flex items-center gap-1">
            {isUp
              ? <ArrowUpRight size={12} className="text-red-400" />
              : <ArrowDownRight size={12} className="text-green-400" />
            }
            <span className={`font-mono text-xs ${isUp ? 'text-red-400' : 'text-green-400'}`}>
              {v > 0 ? '+' : ''}{v}%
            </span>
          </div>
        );
      }
      case 'ctr_medio':
        return <span className="font-mono text-white">{row.ctr_medio ?? '—'}%</span>;
      case 'cpm_medio':
        return <span className="font-mono text-white">R$ {row.cpm_medio ?? '—'}</span>;
      case 'frequencia_media':
        return <span className="font-mono text-white">{row.frequencia_media ?? '—'}</span>;
      case 'leads_plataforma':
        return <span className="font-mono text-white">{row.leads_plataforma ?? '—'}</span>;
      case 'impressoes':
        return (
          <span className="font-mono text-white">
            {row.impressoes != null ? Number(row.impressoes).toLocaleString('pt-BR') : '—'}
          </span>
        );
      case 'cliques':
        return (
          <span className="font-mono text-white">
            {row.cliques != null ? Number(row.cliques).toLocaleString('pt-BR') : '—'}
          </span>
        );
      case 'budget_diario':
        return (
          <span className="font-mono text-white">
            {row.budget_diario != null ? `R$ ${fmt(row.budget_diario)}` : '—'}
          </span>
        );
      default:
        return <span className="text-muted-foreground">—</span>;
    }
  };

  // Responsive hidden columns (hidden below lg)
  const lgHidden = new Set(['meta_cpl', 'invest_30d', 'realizado']);

  return (
    <Layout>
      <div className="space-y-8 bg-slate-950 min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 text-white">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Visão geral · {loading ? 'Carregando...' : `${contas.length} contas ativas`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-3 py-1">Meta Ads</Badge>
            <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-3 py-1">Google Ads</Badge>
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/30 px-3 py-1">TikTok</Badge>
            <Button onClick={carregar} variant="ghost" size="sm" className="text-muted-foreground hover:text-white ml-2">
              <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} /> Atualizar
            </Button>
          </div>
        </div>

        {/* ALERTAS DE CPL */}
        {alertas.length > 0 && (
          <div className="space-y-3">
            {alertas.map((alerta, i) => (
              <div key={i} className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-red-200">{alerta.titulo}</p>
                    <p className="text-xs text-red-400/80">{alerta.descricao}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white border-none">
                  {alerta.acao}
                </Button>
              </div>
            ))}
          </div>
        )}

        {alertas.length === 0 && !loading && (
          <div className="bg-green-950/30 border border-green-900/40 rounded-xl p-4 flex items-center gap-4">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-500">
              <Bell size={20} />
            </div>
            <p className="font-bold text-green-200">Todas as contas dentro das metas de CPL</p>
          </div>
        )}

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">INVESTIMENTO TOTAL (30d)</p>
              <h3 className="text-3xl font-bold font-mono text-white">
                {loading ? '—' : `R$ ${Number(investimentoTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs font-bold">
                <DollarSign size={14} /> Soma de todas as contas
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">CPL MÉDIO (ontem)</p>
              <h3 className={`text-3xl font-bold font-mono ${
                kpis?.cpl_medio > 60 ? 'text-red-400' : kpis?.cpl_medio > 40 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {loading ? '—' : `R$ ${fmt(kpis?.cpl_medio)}`}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-2 font-medium">
                {kpis?.leads ? `${kpis.leads} leads ontem` : ''}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">LEADS QUALIFICADOS (30d)</p>
              <h3 className="text-3xl font-bold font-mono text-white">
                {loading ? '—' : contas.reduce((s, c) => s + (c.leads_qualificados ?? 0), 0).toLocaleString('pt-BR')}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-green-500 text-xs font-bold">
                <ArrowUpRight size={14} />
                <span className="text-muted-foreground font-medium">
                  {contas.length > 0 ? `${contas.reduce((s, c) => s + (c.vendas ?? 0), 0)} vendas` : ''}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800 shadow-xl">
            <CardContent className="pt-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">ROAS MÉDIO (ontem)</p>
              <h3 className="text-3xl font-bold font-mono text-blue-400">
                {loading ? '—' : `${fmt(kpis?.roas)}x`}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs">
                <Users size={14} />
                <span>{contas.length} contas ativas</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PERFORMANCE POR CAMPANHA */}
        <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 py-4">
            <CardTitle className="text-lg font-bold text-white">Performance por Campanha</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-white"
                onClick={openColumnPicker}
              >
                <SlidersHorizontal size={14} className="mr-2" />
                Personalizar colunas
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
                Ver todas <ChevronRight size={14} className="ml-1" />
              </Button>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  {colDefs.map(col => (
                    <th
                      key={col.id}
                      className={`px-4 py-4 whitespace-nowrap ${lgHidden.has(col.id) ? 'hidden lg:table-cell' : ''}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan={colDefs.length} className="px-6 py-8 text-center text-muted-foreground">
                      Carregando...
                    </td>
                  </tr>
                ) : platformGroups.length === 0 ? (
                  <tr>
                    <td colSpan={colDefs.length} className="px-6 py-8 text-center text-muted-foreground">
                      Nenhuma conta encontrada
                    </td>
                  </tr>
                ) : platformGroups.map(group => {
                  const isExpanded = expandedPlatforms.has(group.plataforma);
                  return (
                    <React.Fragment key={group.plataforma}>
                      {/* PLATFORM GROUP ROW */}
                      <tr
                        onClick={() => togglePlatform(group.plataforma)}
                        className="cursor-pointer bg-slate-800/60 hover:bg-slate-800 transition-colors"
                      >
                        {colDefs.map(col => (
                          <td
                            key={col.id}
                            className={`px-4 py-3 ${lgHidden.has(col.id) ? 'hidden lg:table-cell' : ''}`}
                          >
                            {col.id === 'campanha' ? (
                              <div className="flex items-center gap-2 font-bold text-white">
                                {isExpanded
                                  ? <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
                                  : <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                                }
                                <span>{group.plataforma}</span>
                                <Badge
                                  variant="secondary"
                                  className="bg-slate-700 text-muted-foreground border-slate-600 text-[10px] ml-1"
                                >
                                  {group.items.length}
                                </Badge>
                              </div>
                            ) : renderCell(col.id, group.totals)}
                          </td>
                        ))}
                      </tr>

                      {/* ACCOUNT ROWS */}
                      {isExpanded && group.items.map((item, j) => (
                        <tr key={j} className="hover:bg-slate-800/30 transition-colors">
                          {colDefs.map(col => (
                            <td
                              key={col.id}
                              className={`px-4 py-3 ${lgHidden.has(col.id) ? 'hidden lg:table-cell' : ''}`}
                            >
                              {col.id === 'campanha' ? (
                                <span className="pl-8 text-slate-300 font-medium">{item.campanha}</span>
                              ) : renderCell(col.id, item)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* PERFORMANCE POR CANAL + ATIVIDADE RECENTE */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

          <Card className="lg:col-span-6 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                PERFORMANCE POR CANAL (30d)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              {loading ? (
                <p className="text-muted-foreground text-sm">Carregando...</p>
              ) : contas.map((canal, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-bold text-white">{canal.nome}</h4>
                      <div className="flex gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">
                          CPL: <span className={`font-mono font-bold ${
                            canal.cpl_real > canal.cpl_max ? 'text-red-400' :
                            canal.cpl_real > canal.cpl_meta ? 'text-yellow-400' : 'text-green-400'
                          }`}>R$ {fmt(canal.cpl_real)}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Leads: <span className="text-white font-mono font-bold">{canal.leads_qualificados}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ROAS: <span className="text-white font-mono font-bold">{fmt(canal.roas_medio)}x</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">
                      R$ {Number(canal.investimento ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <Progress
                    value={maxInvest > 0 ? (canal.investimento / maxInvest) * 100 : 0}
                    className="h-2 bg-slate-800"
                  />
                  {i < contas.length - 1 && <div className="border-b border-slate-800 pt-2" />}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-4 bg-slate-900 border-slate-800 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                ATIVIDADE RECENTE DO SISTEMA
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-6">
                {loading ? (
                  <p className="text-muted-foreground text-sm">Carregando...</p>
                ) : auditLog.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Nenhuma atividade registrada</p>
                ) : auditLog.slice(0, 6).map((log, i) => {
                  const hora = log.criado_em
                    ? new Date(log.criado_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                    : '—';
                  const cor = log.tipo === 'automation' ? 'text-blue-500' : 'text-green-500';
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-[10px] font-mono text-muted-foreground mt-0.5">{hora}</span>
                      <Circle size={8} className={`mt-1.5 fill-current ${cor}`} />
                      <div>
                        <p className="text-xs text-slate-300 leading-relaxed">{log.descricao}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{log.executado_por}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* COLUMN PICKER DIALOG */}
        <Dialog open={columnPickerOpen} onOpenChange={setColumnPickerOpen}>
          <DialogContent className="max-w-[680px] bg-slate-900 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Personalizar colunas</DialogTitle>
            </DialogHeader>

            <div className="flex gap-4 h-[420px]">

              {/* LEFT PANEL — column browser */}
              <div className="flex-1 flex flex-col gap-3 min-w-0">
                <Input
                  placeholder="Pesquisar métricas..."
                  value={pickerSearch}
                  onChange={e => setPickerSearch(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <div className="flex gap-1 flex-wrap">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setPickerTab(tab)}
                      className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                        pickerTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-muted-foreground hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="overflow-y-auto space-y-1 flex-1">
                  {filteredColumns.map(col => {
                    const isChecked = draftColumns.includes(col.id);
                    const isFixed   = !col.removable;
                    return (
                      <label
                        key={col.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors select-none ${
                          isFixed
                            ? 'opacity-60 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-slate-800'
                        }`}
                        onClick={isFixed ? undefined : () => toggleDraftColumn(col.id)}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked ? 'bg-blue-600 border-blue-600' : 'bg-transparent border-slate-600'
                        }`}>
                          {isChecked && <Check size={10} className="text-white" />}
                        </div>
                        <span className="text-sm text-slate-200 flex-1">{col.label}</span>
                        {isFixed && <span className="text-[10px] text-slate-500">fixo</span>}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="w-px bg-slate-700 flex-shrink-0" />

              {/* RIGHT PANEL — drag to reorder */}
              <div className="w-[220px] flex flex-col gap-2 flex-shrink-0">
                <p className="text-xs text-muted-foreground">{draftColumns.length} colunas selecionadas</p>
                <div className="overflow-y-auto flex-1 space-y-1.5">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={draftColumns} strategy={verticalListSortingStrategy}>
                      {draftColumns.map(colId => {
                        const colDef = ALL_COLUMNS.find(c => c.id === colId);
                        if (!colDef) return null;
                        return (
                          <SortableColumnItem
                            key={colId}
                            id={colId}
                            label={colDef.label}
                            removable={colDef.removable}
                            onRemove={() => removeDraftColumn(colId)}
                          />
                        );
                      })}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="ghost"
                onClick={handleRestoreDefault}
                className="text-muted-foreground hover:text-white mr-auto"
              >
                Restaurar padrão
              </Button>
              <Button
                variant="ghost"
                onClick={() => setColumnPickerOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Aplicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
};

export default Index;
