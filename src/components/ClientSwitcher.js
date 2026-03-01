"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Briefcase } from 'lucide-react';
import { useClient } from '../context/ClientContext';
const ClientSwitcher = () => {
    const { selectedClient, setSelectedClient, allClients } = useClient();
    const handleClientChange = (value) => {
        const client = allClients.find(c => c.id === value);
        if (client) {
            setSelectedClient(client);
        }
    };
    return (_jsxs("div", { className: "flex items-center space-x-3 bg-slate-900/50 p-1.5 rounded-lg border border-slate-700/50", children: [_jsx("div", { className: "p-1.5 bg-blue-600 rounded-md", children: _jsx(Briefcase, { size: 16, className: "text-white" }) }), _jsxs(Select, { value: selectedClient.id, onValueChange: handleClientChange, children: [_jsx(SelectTrigger, { className: "w-full bg-transparent border-none text-white focus:ring-0 h-8 text-sm font-medium", children: _jsx(SelectValue, { placeholder: "Selecionar Cliente" }) }), _jsx(SelectContent, { className: "bg-slate-800 border-slate-700 text-white", children: allClients.map(client => (_jsx(SelectItem, { value: client.id, className: "focus:bg-slate-700 focus:text-white", children: client.name }, client.id))) })] })] }));
};
export default ClientSwitcher;
//# sourceMappingURL=ClientSwitcher.js.map