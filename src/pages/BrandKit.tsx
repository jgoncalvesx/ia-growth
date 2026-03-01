"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Palette, Type, MessageSquare, Users, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const BrandKit = () => {
  const handleSave = () => {
    toast.success('Diretrizes da marca atualizadas com sucesso!');
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Brand Kit</h2>
          <p className="text-slate-500">Defina a identidade da sua marca para personalizar a IA e os criativos.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visual Identity */}
        <div className="space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Palette className="mr-2 text-blue-600" size={20} /> Identidade Visual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Cores da Marca</Label>
                <div className="flex space-x-4">
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'].map((color, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-12 h-12 rounded-lg border border-slate-200 cursor-pointer hover:scale-105 transition-transform" 
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="text-[10px] font-mono text-slate-500">{color}</span>
                    </div>
                  ))}
                  <button className="w-12 h-12 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Logotipo Principal</Label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <Upload className="text-slate-400 mb-2" size={24} />
                  <p className="text-xs text-slate-500">Upload PNG ou SVG (Fundo transparente)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Type className="mr-2 text-blue-600" size={20} /> Tipografia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fonte Títulos</Label>
                  <Input defaultValue="Inter Bold" />
                </div>
                <div className="space-y-2">
                  <Label>Fonte Corpo</Label>
                  <Input defaultValue="Inter Regular" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brand Voice & Audience */}
        <div className="space-y-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <MessageSquare className="mr-2 text-purple-600" size={20} /> Tom de Voz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Descrição do Tom</Label>
                <Textarea 
                  placeholder="Ex: Nossa marca é jovem, energética e usa uma linguagem direta, mas sempre respeitosa..." 
                  className="h-32 resize-none"
                  defaultValue="Inovadora, tecnológica e focada em resultados. Evitamos jargões complexos e buscamos ser inspiradores."
                />
              </div>
              <div className="space-y-2">
                <Label>Palavras-Chave (Keywords)</Label>
                <Input placeholder="Ex: Eficiência, Liberdade, Estilo" defaultValue="Performance, Agilidade, Inteligência" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="mr-2 text-orange-500" size={20} /> Público-Alvo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Perfil do Cliente Ideal</Label>
                <Textarea 
                  placeholder="Descreva quem é seu cliente..." 
                  className="h-32 resize-none"
                  defaultValue="Gestores de marketing e donos de e-commerce entre 25-45 anos que buscam automatizar processos e escalar vendas."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BrandKit;