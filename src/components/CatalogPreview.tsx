/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Smartphone, 
  Printer, 
  Share2, 
  Edit3, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Copy, 
  PhoneCall, 
  ArrowRight,
  Info 
} from 'lucide-react';
import { INITIAL_BASKETS } from '../data/catalogData';
import { Basket } from '../types';

interface CatalogPreviewProps {
  onOpenCheckout: () => void;
}

export default function CatalogPreview({ onOpenCheckout }: CatalogPreviewProps) {
  // Personalization settings
  const [businessName, setBusinessName] = useState('Meu Ateliê de Cestas');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  const [markup, setMarkup] = useState<number>(1.5); // Default selling markup
  
  // Custom prices override per basket
  const [customPrices, setCustomPrices] = useState<{ [key: string]: number }>({
    '1': Math.round(197 * 1.5),
    '2': Math.round(247 * 1.5),
    '3': Math.round(159 * 1.5),
  });

  // Active view tab in the catalog mockup
  const [activeTab, setActiveTab] = useState<'mobile' | 'instagram' | 'print'>('mobile');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Automatically recalculate custom prices when markup changes
  const handleMarkupChange = (newMarkup: number) => {
    setMarkup(newMarkup);
    const updated = {
      '1': Math.round(197 * newMarkup),
      '2': Math.round(247 * newMarkup),
      '3': Math.round(159 * newMarkup),
    };
    setCustomPrices(updated);
    showToast(`💰 Margem atualizada para ${newMarkup}x! Todos os preços foram recalculados.`);
  };

  const handlePriceEdit = (id: string, val: string) => {
    const num = parseFloat(val) || 0;
    setCustomPrices(prev => ({
      ...prev,
      [id]: num
    }));
  };

  const copyWhatsAppLink = (basketName: string, price: number) => {
    const cleanNumber = whatsapp.replace(/\D/g, '');
    const text = `Olá! Gostaria de encomendar a Cesta de Presente *${basketName}* no valor de R$ ${price},00 que vi no seu Catálogo Profissional!`;
    const encodedText = encodeURIComponent(text);
    const mockLink = `https://wa.me/${cleanNumber || '5511999999999'}?text=${encodedText}`;
    
    // Copy link
    navigator.clipboard.writeText(mockLink).then(() => {
      showToast(`🔗 Link de WhatsApp criado e copiado com sucesso para a cesta: ${basketName}!`);
    }).catch(() => {
      showToast(`Cesta: ${basketName} - Compartilhamento simulado!`);
    });
  };

  return (
    <div id="catalog-section" className="bg-gradient-to-b from-stone-50 to-amber-50/35 border-y border-stone-200/60 py-16 px-4 md:px-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 border border-stone-800 text-stone-100 px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in transition-all">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Experimente Grátis Agora
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-bold text-stone-900 tracking-tight mt-3 mb-4">
            Simulador de Catálogo em Tempo Real
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Veja como o seu catálogo vai ficar maravilhoso. Digite o nome do seu negócio, coloque seu WhatsApp e defina seus preços para testar ao vivo!
          </p>
        </div>

        {/* Customizer + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Creator Dashboard Settings (5 Columns) */}
          <div id="catalog-controls" className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-100">
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-700/10 flex items-center justify-center text-amber-700">
                <Edit3 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Personalize Seus Dados</h3>
            </div>

            <div className="space-y-5">
              
              {/* Business Name Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Nome do seu Ateliê / Negócio
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Sua Marca de Presentes/Cestas"
                    className="w-full pl-3 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 font-sans text-stone-800 text-sm font-medium transition-all"
                  />
                  <div className="absolute right-3 top-3.5 flex items-center justify-center text-stone-400">
                    <Check className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* WhatsApp Phone Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  WhatsApp para Vendas (Receba Pedidos Direto)
                </label>
                <input 
                  type="text" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(00) 90000-0000"
                  className="w-full px-3 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-700 font-sans text-stone-800 text-sm font-medium transition-all"
                />
              </div>

              {/* Pricing markup / Profit margin slider */}
              <div className="flex flex-col gap-1.5 border-t border-stone-100 pt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Sua Margem de Venda Recomendada
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    {markup.toFixed(1)}x sugerido
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1.3, 1.5, 1.8, 2.0].map((mVal) => (
                    <button
                      key={mVal}
                      type="button"
                      onClick={() => handleMarkupChange(mVal)}
                      className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        markup === mVal 
                          ? 'border-amber-700 bg-amber-700 text-white shadow-md' 
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {mVal}x lucro
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-stone-500 mt-1 flex items-start gap-1">
                  <Info className="w-3_5 h-3_5 flex-shrink-0 text-amber-700" />
                  Calcula automaticamente seu preço de venda final baseado no custo médio sugerido das cestas!
                </span>
              </div>

              {/* Individual Price Overrides */}
              <div className="flex flex-col gap-3 pt-3 border-t border-stone-100">
                <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Preço do Catálogo (Você tem controle total):
                </span>
                
                <div className="space-y-2.5">
                  {INITIAL_BASKETS.map(b => (
                    <div key={b.id} className="flex justify-between items-center bg-stone-50 p-2.5 rounded-xl border border-stone-100 gap-2">
                      <div className="flex items-center gap-2 max-w-[60%]">
                        <span className="text-lg">{b.id === '1' ? '🌅' : b.id === '2' ? '🌹' : '🍫'}</span>
                        <span className="text-xs font-medium text-stone-800 truncate">{b.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-2.5 py-1 rounded-lg w-28">
                        <span className="text-xs font-semibold text-stone-500">R$</span>
                        <input 
                          type="number"
                          value={customPrices[b.id] ?? ''}
                          onChange={(e) => handlePriceEdit(b.id, e.target.value)}
                          className="w-full text-xs font-bold text-stone-900 border-none p-0 focus:outline-none focus:ring-0 text-right font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure unlock callout */}
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3 mt-6">
                <span className="text-xl">📥</span>
                <div>
                  <h4 className="text-xs font-bold text-rose-900 uppercase">Exportar em PDF e Imagem</h4>
                  <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                    Com o **Catálogo Pronto**, você poderá baixar todas as fotos em alta resolução, arquivos prontos de impressão e postar os templates customizados na sua marca de grife de forma imediata!
                  </p>
                </div>
              </div>

              {/* Unlock Catalog Button CTA */}
              <button
                type="button"
                onClick={onOpenCheckout}
                className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg hover:shadow-rose-600/20 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Baixar Esse Catálogo Customizado</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

          {/* RIGHT: Live Visual Catalog Mockup (7 Columns) */}
          <div id="catalog-preview-screen" className="lg:col-span-7 bg-stone-900 rounded-[36px] p-4 sm:p-6 shadow-2xl border-4 border-stone-800/80">
            
            {/* Phone/Canvas Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4 mb-5">
              
              {/* Virtual mockup indicators */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block leading-none">PREVIEW REAL</span>
                  <span className="text-xs text-stone-100 font-bold">{businessName || 'Ateliê Desconhecido'}</span>
                </div>
              </div>

              {/* Mode Views Tabs */}
              <div className="flex bg-stone-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'mobile' 
                      ? 'bg-amber-700 text-stone-100 shadow-md' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>WhatsApp Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('print')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === 'print' 
                      ? 'bg-amber-700 text-stone-100 shadow-md' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Para Imprimir</span>
                </button>
              </div>

            </div>

            {/* Inner dynamic content container simulating smartphone or page render */}
            <div 
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                activeTab === 'mobile' 
                  ? 'max-w-md mx-auto bg-stone-50 border border-stone-200 text-stone-800 p-4 sm:p-5' 
                  : 'bg-white text-stone-800 p-6 sm:p-8 min-h-[500px]'
              }`}
            >
              
              {/* MOCKUP TAB: Mobile Interactive Smartphone Show Catalog */}
              {activeTab === 'mobile' && (
                <div className="space-y-4">
                  {/* Digital Catalog Header Card */}
                  <div className="bg-gradient-to-br from-amber-800 to-amber-950 text-white rounded-xl p-4 text-center shadow-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent"></div>
                    <span className="inline-block bg-amber-500/30 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border border-amber-400/20 uppercase tracking-widest">
                      Catálogo Oficial de Cestas
                    </span>
                    <h4 className="text-base sm:text-lg font-bold tracking-tight">{businessName || 'Meu Ateliê'}</h4>
                    <p className="text-[11px] text-amber-200/90 font-mono mt-1">Contato WhatsApp: {whatsapp || 'Não definido'}</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-[10px] font-semibold text-amber-100">
                      <span>Clique para pedir por direct ou WhatsApp</span>
                    </div>
                  </div>

                  {/* List of custom baskets displaying interactive custom prices */}
                  <div className="space-y-4">
                    {INITIAL_BASKETS.map(b => {
                      const displayedPrice = customPrices[b.id] ?? Math.round(b.originalPrice * markup);
                      return (
                        <div key={b.id} className="bg-white rounded-xl border border-stone-200/80 p-3 flex gap-3 shadow-sm hover:border-amber-700/55 transition-all">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 relative border border-stone-100">
                            <img 
                              src={b.image} 
                              alt={b.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-1 right-1 bg-amber-800 text-white text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">
                              ⭐ POPULAR
                            </span>
                          </div>
                          <div className="flex-grow flex flex-col justify-between min-w-0">
                            <div>
                              <h5 className="text-xs sm:text-sm font-bold text-stone-900 truncate">{b.name}</h5>
                              <p className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 line-clamp-2 leading-relaxed">
                                {b.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between gap-1.5 mt-2">
                              <span className="text-sm sm:text-base font-extrabold text-amber-800 font-mono">
                                R$ {displayedPrice},00
                              </span>
                              
                              <button
                                type="button"
                                onClick={() => copyWhatsAppLink(b.name, displayedPrice)}
                                className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all hover:scale-104 cursor-pointer"
                              >
                                <PhoneCall className="w-3 h-3" />
                                <span>Encomendar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Trust Footer */}
                  <div className="text-center bg-stone-100 rounded-lg p-2.5 text-[9px] text-stone-500 border border-stone-200">
                    🔒 Pedido criptografado direto para o WhatsApp do vendedor.
                  </div>
                </div>
              )}

              {/* MOCKUP TAB: High-quality Printable Layout preview */}
              {activeTab === 'print' && (
                <div className="max-w-xl mx-auto space-y-6">
                  <div className="text-center border-b-2 border-stone-100 pb-4">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded">
                      Folheto Físico Ilustrativo para Impressão
                    </span>
                    <h4 className="text-xl font-bold text-stone-800 mt-2">{businessName || 'Ateliê Cestas'}</h4>
                    <p className="text-xs text-stone-500">Encomendas abertas pelo WhatsApp: <strong className="font-semibold text-stone-800">{whatsapp}</strong></p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INITIAL_BASKETS.map(b => {
                      const displayedPrice = customPrices[b.id] ?? Math.round(b.originalPrice * markup);
                      return (
                        <div key={b.id} className="border border-stone-200 p-3 rounded-xl flex flex-col justify-between">
                          <div>
                            <div className="aspect-video w-full rounded-lg overflow-hidden bg-stone-50 border mb-2">
                              <img 
                                src={b.image} 
                                alt={b.name} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <h5 className="text-xs font-bold text-stone-800 line-clamp-1">{b.name}</h5>
                            <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5 leading-snug">
                              {b.description}
                            </p>
                          </div>
                          
                          <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-[10px] text-stone-400 font-mono">Preço sugerido:</span>
                            <span className="text-sm font-black text-rose-600 font-mono">R$ {displayedPrice},00</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-center pt-4 border-t-2 border-dashed border-stone-200 font-sans text-[10px] text-stone-500">
                    ✦ Entregamos com total segurança e respeito sanitário na sua casa ✦
                  </div>
                </div>
              )}

            </div>

            {/* Customization Success Notice */}
            <p className="text-center text-xs text-stone-400/80 mt-4 leading-relaxed max-w-md mx-auto">
              Simulação de visualização automática. Altere os campos da esquerda e sinta em primeira mão a facilidade extrema de vender cestas prontas no seu bairro!
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
