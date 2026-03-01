"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Client {
  id: string;
  name: string;
}

const clients: Client[] = [
  { id: '1', name: 'Cliente Alpha' },
  { id: '2', name: 'Cliente Beta' },
  { id: '3', name: 'Cliente Gamma' },
];

interface ClientContextType {
  selectedClient: Client;
  setSelectedClient: (client: Client) => void;
  allClients: Client[];
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedClient, setSelectedClient] = useState<Client>(() => {
    const saved = localStorage.getItem('active_client_id');
    return clients.find(c => c.id === saved) || clients[0];
  });

  useEffect(() => {
    localStorage.setItem('active_client_id', selectedClient.id);
  }, [selectedClient]);

  return (
    <ClientContext.Provider value={{ selectedClient, setSelectedClient, allClients: clients }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error('useClient deve ser usado dentro de um ClientProvider');
  return context;
};