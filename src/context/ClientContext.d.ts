import React from 'react';
interface Client {
    id: string;
    name: string;
}
interface ClientContextType {
    selectedClient: Client;
    setSelectedClient: (client: Client) => void;
    allClients: Client[];
}
export declare const ClientProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useClient: () => ClientContextType;
export {};
//# sourceMappingURL=ClientContext.d.ts.map