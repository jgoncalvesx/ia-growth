"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
const clients = [
    { id: '1', name: 'Cliente Alpha' },
    { id: '2', name: 'Cliente Beta' },
    { id: '3', name: 'Cliente Gamma' },
];
const ClientContext = createContext(undefined);
export const ClientProvider = ({ children }) => {
    const [selectedClient, setSelectedClient] = useState(() => {
        const saved = localStorage.getItem('active_client_id');
        return clients.find(c => c.id === saved) || clients[0];
    });
    useEffect(() => {
        localStorage.setItem('active_client_id', selectedClient.id);
    }, [selectedClient]);
    return (_jsx(ClientContext.Provider, { value: { selectedClient, setSelectedClient, allClients: clients }, children: children }));
};
export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context)
        throw new Error('useClient deve ser usado dentro de um ClientProvider');
    return context;
};
//# sourceMappingURL=ClientContext.js.map