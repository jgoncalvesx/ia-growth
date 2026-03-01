"use client";

import React from 'react';
import Sidebar from './Sidebar';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import NotificationDropdown from './NotificationDropdown';
import { Button } from './ui/button';
import CommandPalette from './CommandPalette';
import { useClient } from '../context/ClientContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { selectedClient } = useClient();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar />
        <button 
          className="absolute top-4 right-4 text-white lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30 h-16">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </Button>
            
            {/* Breadcrumb / Active Dimension */}
            <div className="flex items-center text-sm font-medium">
              <span className="text-slate-400">Growth Midia IA</span>
              <ChevronRight size={14} className="mx-2 text-slate-300" />
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                {selectedClient.name}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div 
              className="relative w-48 hidden md:flex cursor-pointer group mr-4"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={16} />
              <div className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs flex justify-between items-center w-full group-hover:bg-white group-hover:border-blue-200 transition-all">
                <span>Busca (⌘K)</span>
              </div>
            </div>
            
            <NotificationDropdown />
            <div className="flex items-center space-x-3 pl-2 md:pl-4 border-l border-slate-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;