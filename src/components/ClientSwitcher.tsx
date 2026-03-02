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
import { useClient } from '../context/ClientContext';

const ClientSwitcher = () => {
  const { selectedClient, setSelectedClient, allClients } = useClient();

  const handleClientChange = (value: string) => {
    const client = allClients.find(c => c.id === value);
    if (client) {
      setSelectedClient(client);
    }
  };

  return (
    <div className="flex items-center space-x-3 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700/50">
      <div className="p-1.5 bg-blue-600 rounded-md">
        <Briefcase size={16} className="text-white" />
      </div>
      <Select value={selectedClient.id || undefined} onValueChange={handleClientChange}>
        <SelectTrigger className="w-full bg-transparent border-none text-white focus:ring-0 h-8 text-sm font-medium">
          <SelectValue placeholder="Selecionar Cliente" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700 text-white">
          {allClients.map(client => (
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