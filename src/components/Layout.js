"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Sidebar from './Sidebar';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import NotificationDropdown from './NotificationDropdown';
import { Button } from './ui/button';
import CommandPalette from './CommandPalette';
import { useClient } from '../context/ClientContext';
const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { selectedClient } = useClient();
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
    return (_jsxs("div", { className: "flex h-screen bg-slate-50 overflow-hidden", children: [_jsx(CommandPalette, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }), _jsx("div", { className: "hidden lg:block", children: _jsx(Sidebar, {}) }), isSidebarOpen && (_jsx("div", { className: "fixed inset-0 bg-slate-900/50 z-40 lg:hidden", onClick: () => setIsSidebarOpen(false) })), _jsxs("div", { className: `
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `, children: [_jsx(Sidebar, {}), _jsx("button", { className: "absolute top-4 right-4 text-white lg:hidden", onClick: () => setIsSidebarOpen(false), children: _jsx(X, { size: 24 }) })] }), _jsxs("main", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [_jsxs("header", { className: "bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30 h-16", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", onClick: () => setIsSidebarOpen(true), children: _jsx(Menu, { size: 24 }) }), _jsxs("div", { className: "flex items-center text-sm font-medium", children: [_jsx("span", { className: "text-slate-400", children: "Growth Midia IA" }), _jsx(ChevronRight, { size: 14, className: "mx-2 text-slate-300" }), _jsx("span", { className: "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100", children: selectedClient.name })] })] }), _jsxs("div", { className: "flex items-center space-x-2 md:space-x-4", children: [_jsxs("div", { className: "relative w-48 hidden md:flex cursor-pointer group mr-4", onClick: () => setIsSearchOpen(true), children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors", size: 16 }), _jsx("div", { className: "pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs flex justify-between items-center w-full group-hover:bg-white group-hover:border-blue-200 transition-all", children: _jsx("span", { children: "Busca (\u2318K)" }) })] }), _jsx(NotificationDropdown, {}), _jsx("div", { className: "flex items-center space-x-3 pl-2 md:pl-4 border-l border-slate-200", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: "https://github.com/shadcn.png" }), _jsx(AvatarFallback, { children: "AD" })] }) })] })] }), _jsx("div", { className: "flex-1 overflow-y-auto p-4 lg:p-8", children: _jsx("div", { className: "max-w-7xl mx-auto", children: children }) })] })] }));
};
export default Layout;
//# sourceMappingURL=Layout.js.map