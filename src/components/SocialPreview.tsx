"use client";

import React from 'react';
import { Instagram, Facebook, Chrome, MoreHorizontal, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface SocialPreviewProps {
  content: string;
  platform: string;
  brandName?: string;
}

const SocialPreview = ({ content, platform, brandName = "Sua Marca" }: SocialPreviewProps) => {
  const renderInstagram = () => (
    <div className="max-w-[350px] mx-auto bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-3 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-slate-200"></div>
            </div>
          </div>
          <span className="text-xs font-bold">{brandName.toLowerCase().replace(/\s/g, '_')}</span>
        </div>
        <MoreHorizontal size={16} className="text-slate-400" />
      </div>
      <div className="aspect-square bg-slate-100 flex items-center justify-center text-slate-400">
        <span className="text-xs font-medium">Imagem do Criativo</span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart size={22} />
            <MessageCircle size={22} />
            <Send size={22} />
          </div>
          <Bookmark size={22} />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold">1.240 curtidas</p>
          <p className="text-xs leading-relaxed">
            <span className="font-bold mr-2">{brandName.toLowerCase().replace(/\s/g, '_')}</span>
            {content}
          </p>
          <p className="text-[10px] text-slate-400 uppercase mt-2">Há 2 horas</p>
        </div>
      </div>
    </div>
  );

  const renderFacebook = () => (
    <div className="max-w-[400px] mx-auto bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div>
            <p className="text-sm font-bold text-blue-600">{brandName}</p>
            <p className="text-[10px] text-slate-500">Patrocinado • 🌐</p>
          </div>
        </div>
        <p className="text-sm mb-3 whitespace-pre-wrap">{content}</p>
      </div>
      <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400 border-y border-slate-100">
        <span className="text-xs font-medium">Imagem/Vídeo do Anúncio</span>
      </div>
      <div className="p-3 bg-slate-50 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-slate-500 uppercase">WWW.SUAMARCA.COM</p>
          <p className="text-sm font-bold">Título do Anúncio</p>
        </div>
        <button className="px-4 py-1.5 bg-slate-200 rounded text-xs font-bold">Saiba Mais</button>
      </div>
    </div>
  );

  const renderGoogle = () => (
    <div className="max-w-[500px] mx-auto bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-1">
        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">Ad</div>
        <span className="text-xs text-slate-600">https://www.suamarca.com</span>
      </div>
      <h3 className="text-blue-700 text-lg font-medium hover:underline cursor-pointer mb-1">
        {content.split('\n')[0].substring(0, 60)}...
      </h3>
      <p className="text-sm text-slate-600 line-clamp-2">
        {content.length > 60 ? content.substring(60) : content}
      </p>
    </div>
  );

  return (
    <div className="p-8 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center min-h-[500px]">
      {platform === 'instagram' && renderInstagram()}
      {platform === 'facebook' && renderFacebook()}
      {platform === 'google' && renderGoogle()}
      {platform !== 'instagram' && platform !== 'facebook' && platform !== 'google' && (
        <div className="text-center text-slate-400">
          <p className="text-sm">Preview não disponível para esta plataforma.</p>
        </div>
      )}
    </div>
  );
};

export default SocialPreview;