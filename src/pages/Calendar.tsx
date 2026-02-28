"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Instagram, Facebook, Music2 } from 'lucide-react';

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const calendarData = [
  { day: 15, items: [{ type: 'ig', title: 'Post Coleção Verão', status: 'Agendado' }] },
  { day: 16, items: [] },
  { day: 17, items: [{ type: 'tk', title: 'Trend Dance App', status: 'Pendente' }] },
  { day: 18, items: [{ type: 'fb', title: 'Anúncio Black Friday', status: 'Agendado' }] },
  { day: 19, items: [] },
  { day: 20, items: [{ type: 'ig', title: 'Reels Lifestyle', status: 'Publicado' }] },
  { day: 21, items: [] },
];

const Calendar = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendário de Conteúdo</h2>
          <p className="text-slate-500">Planeje e visualize suas postagens em todas as redes.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Agendar Post
        </Button>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-lg font-bold">Maio 2024</CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft size={16} /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight size={16} /></Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-white">Mês</Badge>
            <Badge variant="ghost">Semana</Badge>
            <Badge variant="ghost">Dia</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {days.map(day => (
              <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-100 last:border-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[120px]">
            {Array.from({ length: 31 }).map((_, i) => {
              const dayNum = i + 1;
              const dayData = calendarData.find(d => d.day === dayNum);
              
              return (
                <div key={i} className="p-2 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors group relative">
                  <span className="text-sm font-medium text-slate-400 group-hover:text-slate-900">{dayNum}</span>
                  <div className="mt-1 space-y-1">
                    {dayData?.items.map((item, idx) => (
                      <div key={idx} className={`text-[10px] p-1 rounded border flex items-center space-x-1 ${
                        item.type === 'ig' ? 'bg-pink-50 border-pink-100 text-pink-700' :
                        item.type === 'tk' ? 'bg-slate-900 border-slate-800 text-white' :
                        'bg-blue-50 border-blue-100 text-blue-700'
                      }`}>
                        {item.type === 'ig' && <Instagram size={10} />}
                        {item.type === 'tk' && <Music2 size={10} />}
                        {item.type === 'fb' && <Facebook size={10} />}
                        <span className="truncate font-medium">{item.title}</span>
                      </div>
                    ))}
                  </div>
                  <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">
                    <Plus size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Calendar;