"use client";

import React from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { Brain, Sparkles, Copy, RefreshCw, Send, Wand2, CheckCircle2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';
import SocialPreview from '../components/SocialPreview';

const AIGenerator = () => {
  const [loading, setLoading] = React.useState(false);
  const [platform, setPlatform] = React.useState('instagram');
  const [result, setResult] = React.useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setResult(
        "🚀 Transforme seu verão com a nova Coleção Breeze! \n\n" +
        "Descubra o equilíbrio perfeito entre estilo e conforto. Peças exclusivas desenhadas para quem não abre mão da elegância nos dias mais quentes. \n\n" +
        "✨ Destaques:\n" +
        "- Tecidos leves e respiráveis\n" +
        "- Design contemporâneo\n" +
        "- Edição limitada\n\n" +
        "🔗 Clique no link da bio e garanta a sua com 15% OFF na primeira compra! #ModaVerão #EstiloBreeze #Lançamento"
      );
      setLoading(false);
      toast.success('Conteúdo gerado com sucesso!');
    }, 2000);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success('Copiado para a área de transferência!');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerador de IA</h2>
          <p className="text-slate-500">Crie copies e legendas de alta conversão em segundos.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <CheckCircle2 size={14} className="mr-1" /> Brand Kit Ativo
          </div>
          <Badge className="bg-purple-100 text-purple-700 border-none px-3 py-1">
            <Sparkles size={14} className="mr-2" /> IA Ativa
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-4">
          <Card className="bg-white border-slate-200 shadow-sm sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <Wand2 className="mr-2 text-purple-600" size={20} /> Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform">Plataforma</Label>
                  <Select onValueChange={setPlatform} defaultValue={platform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram (Legenda)</SelectItem>
                      <SelectItem value="facebook">Facebook Ads</SelectItem>
                      <SelectItem value="google">Google Search Ads</SelectItem>
                      <SelectItem value="tiktok">TikTok Script</SelectItem>
                      <SelectItem value="email">E-mail Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tom de Voz</Label>
                  <Select defaultValue="persuasive">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="persuasive">Persuasivo</SelectItem>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="friendly">Amigável / Casual</SelectItem>
                      <SelectItem value="urgent">Urgente / Escassez</SelectItem>
                      <SelectItem value="funny">Divertido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product">Sobre o que vamos escrever?</Label>
                  <Textarea 
                    id="product" 
                    placeholder="Ex: Nova coleção de roupas de verão com tecidos leves e 15% de desconto..." 
                    className="h-32 resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Gerando...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" /> Gerar Conteúdo
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Result & Preview Column */}
        <div className="lg:col-span-8 space-y-8">
          {result ? (
            <>
              <Card className="bg-white border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
                  <CardTitle className="text-lg font-semibold">Resultado Gerado</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy size={14} className="mr-2" /> Copiar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleGenerate}>
                      <RefreshCw size={14} className="mr-2" /> Recriar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Textarea 
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="min-h-[200px] bg-slate-50 p-6 rounded-xl border border-slate-100 whitespace-pre-wrap text-slate-700 leading-relaxed resize-none focus:ring-0 focus:border-slate-200"
                  />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Eye className="mr-2 text-blue-600" size={20} /> Preview Visual
                </h3>
                <SocialPreview content={result} platform={platform} />
              </div>
            </>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                <Brain size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sua IA Criativa está pronta</h3>
              <p className="text-slate-500 max-w-md">
                Preencha as informações ao lado e veja a mágica acontecer com previews em tempo real para suas redes sociais.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AIGenerator;