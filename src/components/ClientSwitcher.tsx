"use client";

import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Briefcase } from 'lucide-react';

const clients = [
  { id: '1', name: 'Cliente Alpha' },
  { id: '2', name: 'Cliente Beta' },
  { id: '3', name: 'Cliente Gamma' },
];

const ClientSwitcher = () => {
  const [selectedClient, setSelectedClient] = React.useState('1');

  const handleClientChange = (value: string) => {
    setSelectedClient(value);
    const client = clients.find(c => c.id === value);
    // Em um app real, isso dispararia uma mudança no estado global ou URL
    console.log(`Cambiando para o cliente: ${client?.name}`);
  };

  return (
    <div className="flex items-center space-x-3 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700/50">
      <div className="p-1.5 bg-blue-600 rounded-md">
        <Briefcase size={16} className="text-white" />
      </div>
      <Select value={selectedClient} onValueChange={handleClientChange}>
        <SelectTrigger className="w-[180px] bg-transparent border-none text-white focus:ring-0 h-8">
          <SelectValue placeholder="Selecionar Cliente" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700 text-white">
          {clients.map(client => (
            <SelectItem key={client.id} value={client.id} className="focus:bg-slate-700 focus:text-white">
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClientSwitcher;