"use client";

import React from 'react';
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  iconColor: string;
}

const StatCard = ({ title, value, change, isPositive, icon: Icon, iconColor }: StatCardProps) => {
  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${iconColor} bg-opacity-10`}>
            <Icon className={iconColor.replace('bg-', 'text-')} size={24} />
          </div>
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </span>
        </div>
        <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;