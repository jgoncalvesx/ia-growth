"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Zap, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const CreateWorkflowModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Automação ativada com sucesso!');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Zap className="mr-2 h-4 w-4" /> Nova Automação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Configurar Fluxo de Automação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Automação</Label>
            <Input id="name" placeholder="Ex: Boas-vindas Instagram" required />
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-slate-500">Gatilho (Trigger)</Label>
              <Select required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Quando acontecer..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new-lead">Novo Lead Cadastrado</SelectItem>
                  <SelectItem value="campaign-start">Campanha Iniciada</SelectItem>
                  <SelectItem value="budget-alert">Alerta de Orçamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <ArrowRight className="text-slate-300" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-slate-500">Ação (Action)</Label>
              <Select required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Então faça isso..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="send-email">Enviar E-mail</SelectItem>
                  <SelectItem value="notify-slack">Notificar no Slack</SelectItem>
                  <SelectItem value="change-status">Mudar Status do Lead</SelectItem>
                  <SelectItem value="add-tag">Adicionar Tag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Salvar e Ativar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowModal;