/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Star,
  Users,
  ShieldAlert,
  Frown,
  Coins,
  Check,
  Heart,
  Smile,
  Smartphone,
  Share2,
  Calculator,
  ArrowUpRight
} from 'lucide-react';
import VslPlayer from './components/VslPlayer';
import { WiapyUpsellButton } from './components/WiapyUpsellButton';

import CheckoutModal from './components/CheckoutModal';
import { STUDENT_TESTIMONIALS } from './data/catalogData';
import shopeePlanMockup from './assets/images/shopee_plan_mockup_1785848274615.jpg';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [businessName, setBusinessName] = useState('Meu Ateliê de Cestas');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  
  // Exit popup/recusa warnings state
  const [showRecusaModal, setShowRecusaModal] = useState(false);
  const [licencasRestantes, setLicencasRestantes] = useState(7);

  // VSL Delayed unlock state (locked by default; unlocks after 30s of video playback)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('desbloquear') || search.includes('unlock') || search.includes('debug')) {
        return true;
      }
      return localStorage.getItem('vsl_unlocked') === 'true';
    }
    return false;
  });

  const handleUnlock = React.useCallback(() => {
    setIsUnlocked(true);
    try {
      localStorage.setItem('vsl_unlocked', 'true');
    } catch {
      // ignore
    }
    // Suave scroll automático para a seção da oferta liberada
    setTimeout(() => {
      const el = document.getElementById('oferta-liberada');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  }, []);

  // Simulating slow countdown of seats
  useEffect(() => {
    const interval = setInterval(() => {
      setLicencasRestantes(prev => {
        if (prev <= 3) return prev; // Hold at 3
        return prev - 1;
      });
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // CONFIGURAÇÕES DE REDIRECIONAMENTO — Links oficiais Wiapy
  const CHECKOUT_URL = 'https://pay.wiapy.com/checkout/6a7273ff1b13df5c3c597b87'; // Link oficial do checkout da oferta
  const PRODUTO_PRINCIPAL_URL = 'https://wiapy.com/login'; // Link oficial para onde o cliente vai quando recusar a oferta

  // Função utilitária para redirecionar de forma robusta preservando os parâmetros da URL (UTMs, Pixel, etc.)
  const redirectWithParams = (targetUrl: string) => {
    if (!targetUrl) return;
    const search = window.location.search;
    if (!search) {
      window.location.href = targetUrl;
      return;
    }
    const separator = targetUrl.includes('?') ? '&' : '?';
    const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
    window.location.href = `${targetUrl}${separator}${cleanSearch}`;
  };

  const handleOpenCheckout = () => {
    if (CHECKOUT_URL) {
      redirectWithParams(CHECKOUT_URL);
    } else {
      setIsCheckoutOpen(true);
    }
  };

  const handleScrollToPricing = () => {
    const element = document.getElementById('pricing-block');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRecusaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRecusaModal(true);
  };

  return (
    <div className="font-sans antialiased text-stone-800 bg-[#F8F8F8] min-h-screen relative selection:bg-[#EC4899]/20 selection:text-[#5B2A86]">
      
      {/* 1. TOP PROGRESS BAR */}
      <div id="top-progress-bar" className="sticky top-0 z-40 bg-white shadow-xs">
        <div className="bg-gradient-to-r from-[#5B2A86] via-[#7B3DB8] to-[#EC4899] h-1.5 w-full"></div>
        <div className="bg-[#5B2A86]/5 backdrop-blur-md border-b border-[#5B2A86]/10 py-3 text-center px-4">
          <p className="text-xs sm:text-sm font-bold text-[#5B2A86] tracking-wide flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-ping"></span>
            <span>Etapa 2 de 2 — Sua oferta especial ainda está reservada</span>
          </p>
        </div>
      </div>

      {/* 2. HEADER SECTION (Headline & Subhead) */}
      <header className="py-8 sm:py-12 px-4 max-w-4xl mx-auto text-center">
        
        {/* Audience Pill / SELO */}
        <span className="inline-flex items-center gap-1.5 bg-[#5B2A86]/10 text-[#5B2A86] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#5B2A86]/20 uppercase tracking-wider mb-5 leading-none shadow-xs">
          🎁 OFERTA EXCLUSIVA PARA ALUNAS DO PAPELARIA DESCOMPLICADA
        </span>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E0E2E] leading-tight font-display">
          ⚠️ Você já garantiu os moldes. Agora aprenda como colocar seus personalizados na Shopee.
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-stone-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Com o Plano Shopee para Papelaria Personalizada, você vai aprender como criar sua loja, escolher o que vender primeiro, escrever títulos, montar descrições e publicar seus primeiros anúncios sem depender apenas de WhatsApp, status ou indicação.
        </p>

      </header>

      {/* 3. AVISO ACIMA DO VÍDEO & VSL CONTAINER */}
      <section className="px-4 pb-16 max-w-4xl mx-auto">
        
        {/* Aviso Acima do Vídeo */}
        <div className="bg-[#7B3DB8]/10 border border-[#7B3DB8]/20 rounded-xl p-3 sm:p-4 mb-5 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-[#5B2A86] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 leading-snug">
            🚨 Essa condição especial está disponível somente nesta página.
          </p>
        </div>

        <VslPlayer onUnlock={handleUnlock} isUnlocked={isUnlocked} />

      </section>

      {/* Conteúdo da Oferta liberado após o delay da VSL */}
      {isUnlocked && (
        <>
          {/* Metodo de Vendas de 4 Passos e Botao CTA Principal */}
          <section id="oferta-liberada" className="px-4 pb-16 max-w-6xl mx-auto scroll-mt-6 transition-all duration-700">
            {/* Título Centralizado com subtítulo e linha de destaque */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-[#5B2A86] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                Venda seus personalizados na Shopee com esses 4 passos simples
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-2.5 leading-relaxed">
                Aprenda como transformar seus produtos de papelaria personalizada em anúncios mais claros, organizados e prontos para vender.
              </p>
              <div className="w-12 h-[3.5px] bg-[#EC4899] mx-auto mt-3.5 rounded-full" />
            </div>

            {/* Passos do Método em Formato de Cards Elegantes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              
              {/* Card 1 */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#5B2A86]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(91,42,134,0.08)] relative">
                <span className="bg-[#5B2A86]/10 text-[#5B2A86] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-[#5B2A86]/20">
                  PASSO 01
                </span>
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                  <Smartphone className="w-5 h-5 text-[#7B3DB8]" />
                </div>
                <h3 className="font-extrabold text-[13px] sm:text-sm tracking-wide uppercase text-[#5B2A86] mb-2.5">
                  CRIE SUA LOJA DO JEITO CERTO
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Veja como configurar sua loja na Shopee de forma simples, mesmo começando do zero.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#5B2A86]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(91,42,134,0.08)] relative">
                <span className="bg-[#5B2A86]/10 text-[#5B2A86] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-[#5B2A86]/20">
                  PASSO 02
                </span>
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                  <ShoppingBag className="w-5 h-5 text-[#7B3DB8]" />
                </div>
                <h3 className="font-extrabold text-[13px] sm:text-sm tracking-wide uppercase text-[#5B2A86] mb-2.5">
                  ESCOLHA O QUE ANUNCIAR PRIMEIRO
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Entenda quais personalizados fazem mais sentido para começar sem ficar perdida.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#5B2A86]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(91,42,134,0.08)] relative">
                <span className="bg-[#5B2A86]/10 text-[#5B2A86] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-[#5B2A86]/20">
                  PASSO 03
                </span>
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                  <CheckCircle className="w-5 h-5 text-[#7B3DB8]" />
                </div>
                <h3 className="font-extrabold text-[13px] sm:text-sm tracking-wide uppercase text-[#5B2A86] mb-2.5">
                  MONTE ANÚNCIOS QUE CHAMAM ATENÇÃO
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Aprenda como criar títulos, descrições e apresentações que deixam seu produto mais claro para quem está procurando.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#5B2A86]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-all hover:scale-[1.01] hover:shadow-[0_8px_32px_rgba(91,42,134,0.08)] relative">
                <span className="bg-[#5B2A86]/10 text-[#5B2A86] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-[#5B2A86]/20">
                  PASSO 04
                </span>
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 border border-purple-100">
                  <Coins className="w-5 h-5 text-[#7B3DB8]" />
                </div>
                <h3 className="font-extrabold text-[13px] sm:text-sm tracking-wide uppercase text-[#5B2A86] mb-2.5">
                  PUBLIQUE E COMECE A VENDER
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Coloque seus kits pegue e monte no ar e comece a vender seus personalizados na Shopee de forma simples, prática e organizada.
                </p>
              </div>

            </div>

            <div className="text-center max-w-xl mx-auto">
              <div className="bg-[#EC4899]/10 border border-[#EC4899]/20 p-4 rounded-xl text-[#5B2A86] text-xs sm:text-sm font-semibold leading-relaxed">
                Hoje você pode adicionar esse guia prático por uma condição especial, disponível somente nesta página.
              </div>
              <p className="text-xs text-stone-500 font-medium mt-3">
                Acesso imediato + garantia de 7 dias
              </p>
            </div>
          </section>

          {/* 4. SEÇÃO VISUAL */}
          <section className="py-16 sm:py-20 bg-white border-y border-[#5B2A86]/10 px-4">
            <div className="max-w-4xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-[#5B2A86] bg-[#5B2A86]/10 px-3 py-1.5 rounded-full border border-[#5B2A86]/20 inline-block mb-3">
                  GUIA PRÁTICO PARA VENDER NA SHOPEE
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#5B2A86] tracking-tight">
                  O que você desbloqueia ao acessar o Plano Shopee hoje:
                </h2>
                <div className="w-12 h-[3.5px] bg-[#EC4899] mx-auto mt-3.5 rounded-full" />
              </div>

              {/* Mockup Display Image */}
              <div className="mb-10 max-w-2xl mx-auto px-2">
                <img
                  src={shopeePlanMockup}
                  alt="Plano Shopee para Papelaria Personalizada"
                  className="w-full h-auto rounded-2xl shadow-xl border border-[#5B2A86]/10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 max-w-3xl mx-auto">
                
                {/* Card 01 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Passo a passo para criar sua loja
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Veja como começar sua estrutura na Shopee sem complicação e sem termos difíceis.
                    </p>
                  </div>
                </div>

                {/* Card 02 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Produtos certos para anunciar primeiro
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Entenda quais personalizados colocar na vitrine para não começar no escuro.
                    </p>
                  </div>
                </div>

                {/* Card 03 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Títulos prontos para adaptar
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Use modelos de títulos pensados para papelaria personalizada e produtos de festa.
                    </p>
                  </div>
                </div>

                {/* Card 04 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Descrições que facilitam a venda
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Tenha exemplos de descrições para explicar melhor seus produtos e evitar dúvidas das clientes.
                    </p>
                  </div>
                </div>

                {/* Card 05 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Checklist do anúncio perfeito
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Antes de publicar, confira se seu anúncio tem tudo que precisa para parecer mais confiável.
                    </p>
                  </div>
                </div>

                {/* Card 06 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Plano simples dos primeiros 7 dias
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Saiba o que fazer em cada dia para criar sua loja, subir produtos e começar com mais direção.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </section>

      {/* 6. BLOCO DE ESCASSEZ */}
      <section className="py-16 bg-[#2D1248] text-stone-100 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#EC4899]/15 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center">
          
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight">
            ⚠️ ESSA OFERTA NÃO VAI APARECER DE NOVO DEPOIS QUE VOCÊ SAIR DESTA PÁGINA
          </h2>

          <div className="space-y-3 max-w-2xl mx-auto text-stone-300 text-xs sm:text-sm leading-relaxed">
            <p>Este Plano Shopee foi liberado apenas para quem acabou de garantir o Papelaria Descomplicada.</p>
            <p>Ele mostra como transformar seus moldes em anúncios de kits pegue e monte para vender na Shopee, sem depender apenas de WhatsApp, Instagram ou indicação.</p>
            <p>Se você fechar agora, talvez precise comprar separadamente depois por um valor maior.</p>
          </div>

        </div>
      </section>

      {/* 8. DETAILED PRICING CALLOUT BLOCK */}
      <section id="pricing-block" className="py-20 sm:py-24 bg-[#1E0E2E] text-stone-100 px-4 relative overflow-hidden">
        
        {/* Abstract graphic bg glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5B2A86]/30 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
          
          <span className="text-[11px] sm:text-xs font-bold text-[#F472B6] bg-[#EC4899]/20 px-3.5 py-1.5 rounded-full border border-[#EC4899]/30 uppercase tracking-wider leading-none inline-block">
            SUA OFERTA ESPECIAL — DISPONÍVEL SOMENTE NESTA PÁGINA
          </span>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Plano Shopee para Papelaria Personalizada
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-md mx-auto leading-relaxed pt-1">
              Aprenda como criar sua loja, montar seus primeiros anúncios, escrever títulos, preparar descrições e colocar seus personalizados em uma vitrine online.
            </p>
          </div>

          {/* Pricing figures */}
          <div className="bg-[#2D1248]/80 rounded-2xl p-6 sm:p-8 max-w-sm mx-auto border border-white/10 shadow-2xl">
            <span className="text-xs text-stone-400 block line-through">De R$97,00</span>
            <div className="flex items-baseline justify-center gap-1.5 mt-2">
              <span className="text-stone-300 text-sm font-bold">Por apenas</span>
              <strong className="text-4xl sm:text-5.5xl font-black text-[#EC4899] font-mono">R$37,00</strong>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full mt-3 inline-block border border-emerald-500/20">
              Aproveite R$60,00 de desconto nesta página.
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-semibold max-w-sm mx-auto leading-relaxed">
            Pagamento único. Acesso imediato. Esta oferta some quando você fechar esta página.
          </p>

          {/* Big CTA button & Refusal - Wiapy 1-Click Upsell */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md mx-auto shadow-2xl border border-white/20 text-stone-900">
            <WiapyUpsellButton />
            <p className="text-[11px] text-stone-500 font-medium mt-3">
              🔒 Pagamento seguro via Wiapy • Acesso imediato
            </p>
          </div>

        </div>
      </section>

      {/* CONFIRMAÇÃO DO PRODUTO PRINCIPAL ACIMA DA GARANTIA */}
      <section className="py-12 bg-white px-4 border-t border-stone-200/60 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest mb-2 leading-none">
            ✅ PEDIDO CONFIRMADO
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#5B2A86]">
            Tudo pronto com o seu acesso principal!
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Os dados de acesso ao Papelaria Descomplicada foram enviados agora mesmo para o seu e-mail. Caso não encontre em alguns minutos, verifique suas pastas de spam e promoções.
          </p>
        </div>
      </section>

      {/* 9. WARRANTY AND INSURANCE SEAL SECTION */}
      <section id="warranty-block" className="py-20 bg-[#F8F8F8] border-t border-[#5B2A86]/10 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Custom Certificate Seal visual requested by Warranty */}
          <div className="relative w-28 h-28 mx-auto hover:rotate-3 transition-transform">
            <div className="absolute inset-2 rounded-full border-4 border-dashed border-[#5B2A86]/30"></div>
            <div className="w-full h-full bg-gradient-to-br from-[#5B2A86] to-[#7B3DB8] rounded-full shadow-lg flex flex-col justify-center items-center text-stone-100">
              <span className="text-2xl leading-none">🎖️</span>
              <span className="text-[10px] font-black uppercase tracking-wider mt-1 text-[#F472B6]">7 DIAS</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white leading-none">🛡️ GARANTIA</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase">
            🛡️ TESTE SEM RISCO POR 7 DIAS
          </h3>

          <div className="space-y-2 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            <p>Leia o guia.</p>
            <p>Crie sua loja.</p>
            <p>Monte seus primeiros anúncios.</p>
            <p>Coloque em prática no seu ritmo.</p>
            <p className="font-semibold text-stone-950">E se você sentir que o guia não ajudou você a estruturar suas vendas na Shopee com mais clareza, pode pedir reembolso em até 7 dias.</p>
            <p>Sem perguntas.</p>
            <p>Sem burocracia.</p>
            <p className="font-bold text-[#5B2A86]">O risco é todo meu.</p>
          </div>

          {/* Secure seals logo list */}
          <div className="flex justify-center items-center gap-6 text-stone-500 text-xs font-semibold pt-4">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#EC4899]" /> Compra garantida</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#EC4899]" /> Acesso imediato</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#EC4899]" /> Suporte VIP</span>
          </div>

        </div>
      </section>

      {/* 10. CTA FINAL & SECONDARY BOTÃO */}
      <section className="py-20 bg-white border-t border-[#5B2A86]/10 px-4 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight uppercase tracking-tight">
            VOCÊ JÁ GARANTIU OS MOLDES NO APLICATIVO.
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-medium pt-1">
            Agora adicione o guia prático para colocar seus produtos na Shopee com mais direção.
          </p>
          <p className="text-stone-500 text-xs font-medium pt-1">
            Depois que essa página fechar, essa condição pode não ficar disponível novamente.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenCheckout}
            style={{ backgroundColor: '#00d769' }}
            className="w-full sm:w-auto px-10 py-5 hover:bg-[#00b85a] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-transform uppercase tracking-wider hover:scale-104 cursor-pointer"
          >
            🔥 SIM, EU ACEITO ESSA OFERTA
          </button>
          <a
            href="https://wiapy.com/login"
            onClick={(e) => {
              e.preventDefault();
              redirectWithParams(PRODUTO_PRINCIPAL_URL);
            }}
            className="block text-center mx-auto text-stone-600 hover:text-stone-950 text-xs sm:text-sm mt-4 select-none transition-all duration-200 underline decoration-stone-300 hover:decoration-[#EC4899] cursor-pointer bg-transparent border-0 outline-none opacity-90 hover:opacity-100 font-medium"
          >
            Recusar está oferta
          </a>
          <p className="text-[11px] text-stone-400 mt-3 font-semibold uppercase tracking-wider">
            Acesso liberado imediatamente após a confirmação do pagamento.
          </p>
        </div>
      </section>

      {/* 11. REJECTION DISCRET_LINK */}
      <footer className="py-12 bg-[#F8F8F8] text-center px-4">
        <a 
          href="https://wiapy.com/login"
          onClick={(e) => {
            e.preventDefault();
            redirectWithParams(PRODUTO_PRINCIPAL_URL);
          }} 
          className="text-stone-500 hover:text-stone-900 text-xs sm:text-sm font-semibold transition underline decoration-dotted underline-offset-4 cursor-pointer"
        >
          Recusar está oferta
        </a>
        <p className="text-[10px] text-stone-400 mt-6 max-w-sm mx-auto leading-relaxed">
          Página de vendas de oferta exclusiva. Este guia pode não voltar a ser oferecido por este valor promocional.
        </p>
      </footer>
        </>
      )}

      {/* MODAL 1: RECUSA ATIVA DE OFERTA EXECUTOR (CULPA SAUDÁVEL) */}
      {showRecusaModal && (
        <div id="recusa-modal" className="fixed inset-0 z-50 bg-[#1E0E2E]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-purple-100 text-center space-y-5 animate-scale-up">
            <div className="w-14 h-14 bg-purple-50 text-[#5B2A86] rounded-full flex items-center justify-center text-3xl mx-auto">
              🤔
            </div>
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                Você tem certeza que quer continuar sem o Plano Shopee?
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Vender na Shopee sem um passo a passo guiado pode fazer você perder tempo e ficar sem visitas ou vendas nos seus produtos.
              </p>
              <p className="text-xs text-[#5B2A86] bg-[#5B2A86]/10 p-3 rounded-xl font-medium leading-relaxed">
                Por apenas <strong>R$ 37,00</strong> você garante o guia prático para criar sua loja e publicar seus anúncios com total segurança!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRecusaModal(false);
                  handleOpenCheckout();
                }}
                style={{ backgroundColor: '#00d769' }}
                className="w-full py-3 px-4 hover:bg-[#00b85a] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Mudei de ideia, quero adicionar o Plano Shopee!
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRecusaModal(false);
                  redirectWithParams(PRODUTO_PRINCIPAL_URL);
                }}
                className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-600 underline font-medium cursor-pointer"
              >
                Sim, prefiro correr o risco e tentar vender na Shopee sozinha.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: FULL CHECKOUT SIMULATED FORM SCREEN */}
      <CheckoutModal 
         isOpen={isCheckoutOpen} 
         onClose={() => setIsCheckoutOpen(false)} 
         businessName={businessName}
         whatsapp={whatsapp}
      />

    </div>
  );
}
