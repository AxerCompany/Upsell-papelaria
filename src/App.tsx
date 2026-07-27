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

import CheckoutModal from './components/CheckoutModal';
import { STUDENT_TESTIMONIALS } from './data/catalogData';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [businessName, setBusinessName] = useState('Meu Ateliê de Cestas');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  
  // Exit popup/recusa warnings state
  const [showRecusaModal, setShowRecusaModal] = useState(false);
  const [licencasRestantes, setLicencasRestantes] = useState(7);

  // VSL Delayed unlock state
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Decorative live sales alert state to generate high visual social proof
  const [liveAlert, setLiveAlert] = useState<{ name: string; city: string; action: string } | null>(null);

  // Simulating live alerts for sales page energy
  useEffect(() => {
    const alerts = [
      { name: 'Sandra M.', city: 'Limeira - SP', action: 'acabou de garantir o catálogo!' },
      { name: 'Cláudia R.', city: 'Belo Horizonte - MG', action: 'fechou uma encomenda de R$ 250!' },
      { name: 'Patrícia S.', city: 'Rio de Janeiro - RJ', action: 'gerou 3 links de WhatsApp agora!' },
      { name: 'Jéssica F.', city: 'Salto - SP', action: 'acabou de garantir o catálogo!' },
    ];

    const showRandomAlert = () => {
      const idx = Math.floor(Math.random() * alerts.length);
      setLiveAlert(alerts[idx]);
      setTimeout(() => {
        setLiveAlert(null);
      }, 4500);
    };

    // First trigger
    const initialTimeout = setTimeout(showRandomAlert, 5000);
    
    // Interval
    const interval = setInterval(showRandomAlert, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
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

  // CONFIGURAÇÕES DE REDIRECIONAMENTO — Altere as URLs abaixo para os seus links reais
  const CHECKOUT_URL = 'https://pay.wiapy.com/6a1614895de875c51b8d3604'; // Coloque seu link de checkout externo aqui se quiser encaminhar os CTAs de compra direto para lá
  const PRODUTO_PRINCIPAL_URL = 'https://fabricadecestas.com.br/acesso'; // Link para onde o cliente vai quando recusar o Upsell

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

      {/* LIVE SALES POPUP BANNER */}
      {isUnlocked && liveAlert && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#2D1248]/95 backdrop-blur-md shadow-2xl border border-[#7B3DB8]/40 px-4 py-3.5 rounded-2xl max-w-sm flex items-center gap-3 animate-slide-up">
          <div className="w-9 h-9 rounded-full bg-[#EC4899]/10 text-[#EC4899] flex items-center justify-center text-lg shrink-0">
            🔔
          </div>
          <div>
            <h5 className="text-[11px] font-bold text-stone-200">{liveAlert.name} ({liveAlert.city})</h5>
            <p className="text-[10px] text-stone-400 mt-0.5">{liveAlert.action}</p>
          </div>
        </div>
      )}

      {/* 2. HEADER SECTION (Headline & Subhead) */}
      <header className="py-8 sm:py-12 px-4 max-w-4xl mx-auto text-center">
        
        {/* Audience Pill / SELO */}
        <span className="inline-flex items-center gap-1.5 bg-[#5B2A86]/10 text-[#5B2A86] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#5B2A86]/20 uppercase tracking-wider mb-5 leading-none shadow-xs">
          🎁 OPORTUNIDADE EXCLUSIVA
        </span>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1E0E2E] leading-tight font-display">
          ⚠️ A maioria das iniciantes tem os moldes na mão, mas trava na hora de montar...
        </h1>

      </header>

      {/* 3. AVISO ACIMA DO VÍDEO & VSL CONTAINER */}
      <section className="px-4 pb-16 max-w-4xl mx-auto">
        
        {/* Aviso Acima do Vídeo */}
        <div className="bg-[#7B3DB8]/10 border border-[#7B3DB8]/20 rounded-xl p-3 sm:p-4 mb-5 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-[#5B2A86] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 leading-snug">
            🚨 Oferta disponível somente nesta página. Se você sair ou atualizar, pode não conseguir acessar novamente.
          </p>
        </div>

        <VslPlayer onUnlock={() => setIsUnlocked(true)} />

      </section>

      {/* Conditionally visible content starting from the button downward */}
      {isUnlocked && (
        <>
          {/* Metodo de Vendas de 4 Passos e Botao CTA Principal */}
          <section className="px-4 pb-16 max-w-6xl mx-auto">
            {/* Título Centralizado com subtítulo e linha de destaque */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-[#5B2A86] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                Monte seus primeiros personalizados com esses 4 passos simples
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-2.5 leading-relaxed">
                Aprenda em vídeo como transformar os moldes do app em peças prontas, bonitas e bem montadas.
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
                  ESCOLHA O MOLDE NO APP
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Abra o aplicativo, escolha o molde que deseja usar e separe os materiais básicos.
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
                  ASSISTA A MONTAGEM
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Veja em vídeo como cortar, dobrar e preparar cada parte do personalizado.
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
                  MONTE COM MAIS SEGURANÇA
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Siga a ordem certa para evitar erro, desperdício e acabamento torto.
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
                  VENDA PERSONALIZADOS PERFEITOS
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed">
                  Comece a divulgar e vender seus personalizados como uma profissional experiente faz e conquiste muitos clientes.
                </p>
              </div>

            </div>

            <div className="text-center max-w-xl mx-auto">
              <button
                type="button"
                onClick={handleScrollToPricing}
                className="w-full sm:w-auto px-10 py-5 bg-[#5B2A86] hover:bg-[#7B3DB8] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-[#5B2A86]/35 transition-all uppercase tracking-wider animate-pulse hover:scale-103 cursor-pointer"
              >
                QUERO ADICIONAR O CURSO AGORA
              </button>
              <div className="mt-4 bg-[#EC4899]/10 border border-[#EC4899]/20 p-4 rounded-xl text-[#5B2A86] text-xs sm:text-sm font-semibold leading-relaxed">
                Hoje você pode adicionar esse curso de montagem em vídeo por uma condição especial, disponível somente nesta página.
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
                  MONTAGEM PRÁTICA EM VÍDEO
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#5B2A86] tracking-tight">
                  O que você desbloqueia ao adicionar o curso hoje:
                </h2>
                <div className="w-12 h-[3.5px] bg-[#EC4899] mx-auto mt-3.5 rounded-full" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 max-w-3xl mx-auto">
                
                {/* Card 01 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Veja a montagem na prática
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Acompanhe em vídeo como transformar os moldes em personalizados prontos.
                    </p>
                  </div>
                </div>

                {/* Card 02 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Corte, dobra e cola sem travar
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Entenda a ordem certa para montar suas peças com mais segurança.
                    </p>
                  </div>
                </div>

                {/* Card 03 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Evite errar e desperdiçar material
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Aprenda detalhes simples para não perder impressão, papel ou tempo.
                    </p>
                  </div>
                </div>

                {/* Card 04 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Acabamento mais bonito
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Veja cuidados que ajudam seus personalizados a ficarem mais caprichados.
                    </p>
                  </div>
                </div>

                {/* Card 05 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Ideal para quem tem medo de montar errado
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Perfeito para quem comprou os moldes, mas quer ver alguém fazendo antes de começar.
                    </p>
                  </div>
                </div>

                {/* Card 06 */}
                <div className="bg-[#F8F8F8] p-5 rounded-2xl border border-[#5B2A86]/10 shadow-xs flex items-start gap-3 hover:shadow-md transition-shadow">
                  <span className="text-[#EC4899] shrink-0 text-base mt-0.5">✅</span>
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                      Seja uma profissional completa
                    </h3>
                    <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      Ideal para quem quer ser uma profissional completa e passar impressão de experiente para os clientes.
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
          
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
            ⚠️ Essa oferta não vai aparecer de novo depois que você sair desta página
          </h2>

          <div className="space-y-3 max-w-2xl mx-auto text-stone-300 text-xs sm:text-sm leading-relaxed">
            <p>Este curso de montagem em vídeo não está disponível publicamente nessa condição.</p>
            <p className="font-semibold text-[#F472B6]">Ele foi liberado apenas para quem acabou de garantir o Papelaria Descomplicada.</p>
            <p>Se você fechar agora, talvez precise comprar separadamente depois — por um valor muito maior.</p>
          </div>

        </div>
      </section>

      {/* 8. DETAILED PRICING CALLOUT BLOCK */}
      <section id="pricing-block" className="py-20 sm:py-24 bg-[#1E0E2E] text-stone-100 px-4 relative overflow-hidden">
        
        {/* Abstract graphic bg glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#5B2A86]/30 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
          
          <span className="text-[11px] sm:text-xs font-bold text-[#F472B6] bg-[#EC4899]/20 px-3.5 py-1.5 rounded-full border border-[#EC4899]/30 uppercase tracking-wider leading-none inline-block">
            SUA OFERTA ESPECIAL — SÓ DISPONÍVEL AGORA NESTA PÁGINA
          </span>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
              Curso de Montagem de Moldes na Prática
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-md mx-auto leading-relaxed pt-1">
              Aprenda em vídeo como cortar, dobrar, colar e finalizar seus personalizados usando os moldes do aplicativo.
            </p>
          </div>

          {/* Pricing figures */}
          <div className="bg-[#2D1248]/80 rounded-2xl p-6 sm:p-8 max-w-sm mx-auto border border-white/10 shadow-2xl">
            <span className="text-xs text-stone-400 block line-through">De R$ 97,00</span>
            <div className="flex items-baseline justify-center gap-1.5 mt-2">
              <span className="text-stone-300 text-sm font-bold">Por apenas</span>
              <strong className="text-4xl sm:text-5.5xl font-black text-[#EC4899] font-mono">R$ 67,00</strong>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full mt-3 inline-block border border-emerald-500/20">
              Aproveite R$ 30,00 de desconto nesta página
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 font-semibold max-w-sm mx-auto leading-relaxed">
            Pagamento único. Acesso imediato. Esta oferta some quando você fechar esta página.
          </p>

          {/* Big CTA button & Refusal */}
          <div className="pt-2 max-w-sm mx-auto">
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="w-full bg-[#5B2A86] hover:bg-[#7B3DB8] text-white font-extrabold text-sm sm:text-base py-5 px-6 rounded-2xl shadow-xl shadow-[#5B2A86]/40 active:scale-97 hover:scale-103 transition-transform uppercase tracking-wider cursor-pointer font-sans"
            >
              QUERO ADICIONAR O CURSO AGORA
            </button>
            <button
              type="button"
              onClick={handleRecusaClick}
              className="block text-center mx-auto text-stone-400 hover:text-white text-xs sm:text-sm mt-4 select-none transition-all duration-200 underline decoration-stone-600 hover:decoration-[#EC4899] cursor-pointer bg-transparent border-0 outline-none opacity-90 hover:opacity-100 font-medium"
            >
              Não, prefiro continuar sem o passo a passo de montagem.
            </button>
            
            <p className="text-xs text-[#F472B6] font-semibold mt-3">
              Apenas 1 clique para adicionar essa oferta ao seu pedido.
            </p>
          </div>

        </div>
      </section>

      {/* CONFIRMAÇÃO DO PRODUTO PRINCIPAL ACIMA DA GARANTIA */}
      <section className="py-12 bg-white px-4 border-t border-stone-200/60 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest mb-2 leading-none">
            ✅ Pedido Confirmado
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#5B2A86]">
            Tudo pronto com o seu acesso principal!
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
            Os dados de acesso para o <strong>Papelaria Descomplicada</strong> foram enviados agora mesmo para o seu e-mail. Caso não os encontre em alguns minutos, lembre-se de verificar suas pastas de spam e promoções.
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

          <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            🛡️ Teste sem risco por 7 dias
          </h3>

          <div className="space-y-2 text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            <p>Assista às aulas.</p>
            <p>Veja as montagens.</p>
            <p>Coloque em prática no seu ritmo.</p>
            <p className="font-semibold text-stone-950">E se você sentir que o curso não ajudou você a montar seus moldes com mais clareza, pode pedir reembolso em até 7 dias.</p>
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
          <h2 className="text-xl sm:text-2xl font-black text-stone-950 leading-tight">
            Você já garantiu os moldes no aplicativo. <span className="block text-[#5B2A86] mt-1">Agora adicione o passo a passo em vídeo para montar tudo com mais segurança.</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-medium pt-1">
            Depois que essa página fechar, essa condição pode não ficar disponível novamente.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={handleOpenCheckout}
            className="w-full sm:w-auto px-10 py-5 bg-[#5B2A86] hover:bg-[#7B3DB8] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-transform uppercase tracking-wider hover:scale-104 cursor-pointer"
          >
            🔥 SIM, QUERO ADICIONAR O CURSO AGORA
          </button>
          <button
            type="button"
            onClick={handleRecusaClick}
            className="block text-center mx-auto text-stone-600 hover:text-stone-950 text-xs sm:text-sm mt-4 select-none transition-all duration-200 underline decoration-stone-300 hover:decoration-[#EC4899] cursor-pointer bg-transparent border-0 outline-none opacity-90 hover:opacity-100 font-medium"
          >
            Não, obrigada. Prefiro continuar apenas com os moldes do aplicativo.
          </button>
          <p className="text-[11px] text-stone-400 mt-3 font-semibold uppercase tracking-wider">
            Acesso liberado imediatamente após a confirmação do pagamento.
          </p>
        </div>
      </section>

      {/* 11. REJECTION DISCRET_LINK */}
      <footer className="py-12 bg-[#F8F8F8] text-center px-4">
        <a 
          href="#recusa"
          onClick={handleRecusaClick} 
          className="text-stone-400 hover:text-[#5B2A86] text-xs sm:text-sm font-semibold transition underline decoration-dotted underline-offset-4 cursor-pointer"
        >
          Não, obrigada. Prefiro perder essa oferta e continuar sem o curso.
        </a>
        <p className="text-[10px] text-stone-400 mt-6 max-w-sm mx-auto leading-relaxed">
          Página de vendas de Upsell exclusivo de oferta única. Este curso não voltará a ser oferecido por este valor promocional.
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
                Você tem certeza que quer continuar sem o curso de montagem?
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Tentar montar os moldes do aplicativo sem ver o passo a passo em vídeo pode fazer você errar o corte, a dobra ou desperdiçar papel.
              </p>
              <p className="text-xs text-[#5B2A86] bg-[#5B2A86]/10 p-3 rounded-xl font-medium leading-relaxed">
                Por apenas <strong>R$ 67,00</strong> você garante o curso em vídeo para cortar, dobrar, colar e finalizar com total segurança!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRecusaModal(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 px-4 bg-[#5B2A86] hover:bg-[#7B3DB8] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Mudei de ideia, quero adicionar o curso!
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRecusaModal(false);
                  redirectWithParams(PRODUTO_PRINCIPAL_URL);
                }}
                className="w-full py-2.5 text-xs text-stone-400 hover:text-stone-600 underline font-medium cursor-pointer"
              >
                Sim, prefiro correr o risco e passar por essa trava sozinha.
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
