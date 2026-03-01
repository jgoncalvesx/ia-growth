"use client";

import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Brain, Send, MessageSquare, Loader2, User, AlertCircle, TrendingUp } from 'lucide-react';
import { enviarMensagemChat } from '../services/api.service';
import { useClient } from '../context/ClientContext';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
  error?: boolean;
}

const Chat = () => {
  const { selectedClient } = useClient();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Olá! Tenho acesso ao contexto completo das contas de ${selectedClient.name}. O que você quer analisar hoje?` 
    }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const n8nConnected = !!import.meta.env.VITE_N8N_URL;

  const suggestions = [
    "Quais anúncios tiveram CPL acima da meta nos últimos 7 dias?",
    "Compare qualidade de leads entre Google e Meta este mês",
    "Quais criativos estão com frequência acima de 4?",
    "Resumo de performance desta semana"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await enviarMensagemChat(userMessage, selectedClient.id);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.analise,
        confidence: response.confianca ? response.confianca * 100 : undefined
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Desculpe, tive um problema ao processar sua análise. Verifique a conexão com o servidor n8n.",
        error: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-120px)] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center">
              <MessageSquare className="mr-2 text-blue-600" size={24} /> Chat de Análise
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Perguntas em linguagem natural · Claude analisa seus dados
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1">
            <TrendingUp size={12} className="mr-1.5" /> {selectedClient.name}
          </Badge>
        </div>

        {/* ÁREA DE MENSAGENS */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-8 max-w-4xl mx-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  {msg.role === 'user' ? "VOCÊ" : "MIDIAOS · ANÁLISE"}
                </span>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm",
                  msg.role === 'user' 
                    ? "bg-blue-950 text-white border border-blue-800 rounded-tr-none" 
                    : cn("bg-slate-100 text-slate-700 border border-slate-200 rounded-tl-none", 
                         msg.error && "border-red-300 bg-red-50 text-red-900")
                )}>
                  {msg.content}
                  
                  {msg.confidence !== undefined && (
                    <div className="mt-4 pt-3 border-t border-slate-200/50">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-slate-500">CONFIANÇA DA ANÁLISE</span>
                        <span className="text-[10px] font-black text-blue-600">{msg.confidence.toFixed(0)}%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-1000" 
                          style={{ width: `${msg.confidence}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  MIDIAOS · ANÁLISE
                </span>
                <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl rounded-tl-none flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* SUGESTÕES E INPUT */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/30">
          {messages.length === 1 && !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6 max-w-4xl mx-auto">
              {suggestions.map((suggestion, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="justify-start text-left h-auto py-3 px-4 text-xs bg-white hover:bg-blue-50 hover:border-blue-200 text-slate-600 border-slate-200 transition-all"
                  onClick={() => handleSend(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-3">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pergunte sobre performance, criativos, qualidade de lead..."
                rows={Math.min(input.split('\n').length || 1, 4)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none shadow-sm transition-all"
              />
              <Button 
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="absolute right-2 bottom-2 bg-blue-600 hover:bg-blue-700 h-9 w-9 p-0 rounded-lg shadow-lg shadow-blue-200"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Send size={18} />}
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className={cn("w-1.5 h-1.5 rounded-full", n8nConnected ? "bg-green-500" : "bg-orange-500")} />
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                {n8nConnected ? "N8N conectado e pronto" : "⚠ Configure VITE_N8N_URL no .env para ativar"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;