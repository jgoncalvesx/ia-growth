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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const CreateCampaignModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Campanha criada com sucesso!');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Nova Campanha
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Campanha</Label>
            <Input id="name" placeholder="Ex: Promoção de Inverno" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="platform">Plataforma</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meta">Meta (FB/IG)</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="tiktok">TikTok Ads</SelectItem>
                <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Orçamento Total (R$)</Label>
            <Input id="budget" type="number" placeholder="0.00" required />
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar Campanha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;