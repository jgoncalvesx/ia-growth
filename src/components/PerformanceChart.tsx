"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Seg', reach: 4000, engagement: 2400 },
  { name: 'Ter', reach: 3000, engagement: 1398 },
  { name: 'Qua', reach: 2000, engagement: 9800 },
  { name: 'Qui', reach: 2780, engagement: 3908 },
  { name: 'Sex', reach: 1890, engagement: 4800 },
  { name: 'Sáb', reach: 2390, engagement: 3800 },
  { name: 'Dom', reach: 3490, engagement: 4300 },
];

const PerformanceChart = () => {
  return (
    <Card className="col-span-2 bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Visão Geral de Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Area 
                type="monotone" 
                dataKey="reach" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorReach)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;