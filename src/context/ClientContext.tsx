"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchClientes } from '../services/api.service';

interface Client {
  id: string;
  name: string;
  slug?: string;
  cor_primaria?: string;
  logo_url?: string;
}

interface ClientContextType {
  selectedClient: Client;
  setSelectedClient: (client: Client) => void;
  allClients: Client[];
  loadingClients: boolean;
}

const PLACEHOLDER: Client = { id: '', name: 'Carregando...' };

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClientState] = useState<Client>(PLACEHOLDER);
  const [loadingClients, setLoadingClients] = useState(true);

  useEffect(() => {
    fetchClientes()
      .then((data: any[]) => {
        const mapped: Client[] = data.map(c => ({
          id: c.id,
          name: c.nome,
          slug: c.slug,
          cor_primaria: c.cor_primaria,
          logo_url: c.logo_url,
        }));
        setAllClients(mapped);

        const savedId = localStorage.getItem('active_client_id');
        const found = mapped.find(c => c.id === savedId) ?? mapped[0];
        if (found) setSelectedClientState(found);
      })
      .catch(err => {
        console.error('[ClientContext] erro ao buscar clientes:', err);
      })
      .finally(() => setLoadingClients(false));
  }, []);

  const setSelectedClient = (client: Client) => {
    localStorage.setItem('active_client_id', client.id);
    setSelectedClientState(client);
  };

  return (
    <ClientContext.Provider value={{ selectedClient, setSelectedClient, allClients, loadingClients }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) throw new Error('useClient deve ser usado dentro de um ClientProvider');
  return context;
};
