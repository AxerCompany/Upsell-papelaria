/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle,
  CheckCircle2,
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
  ArrowUpRight,
  X,
  Zap,
  Flame,
  Clock
} from 'lucide-react';
import VslPlayer from './components/VslPlayer';
import { WiapyUpsellButton } from './components/WiapyUpsellButton';
import confetti from 'canvas-confetti';

import CheckoutModal from './components/CheckoutModal';
import { STUDENT_TESTIMONIALS } from './data/catalogData';
import shopeePlanMockup from './assets/images/shopee_plan_mockup_1785848274615.jpg';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [businessName, setBusinessName] = useState('Meu Ateliê de Cestas');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  
  const [licencasRestantes, setLicencasRestantes] = useState(7);

  // VSL Delayed unlock: libera o restante da página aos 45s de vídeo rodando
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Pop-up 1: Cliente #1111 (Preço R$ 27,00) - disparado perto do botão de comprar
  const [showCustomer1111Modal, setShowCustomer1111Modal] = useState(false);
  const [hasSpecialDiscount, setHasSpecialDiscount] = useState(false);

  // Pop-up 2: Oferta Relâmpago R$ 19,90 - disparado se recusar o pop-up de 27,00
  const [showOffer1990Modal, setShowOffer1990Modal] = useState(false);
  const [countdown1990, setCountdown1990] = useState(299); // 4m 59s

  // Mensagem/Pop-up 3: Compra principal já entregue - disparado se recusar a oferta de 19,90
  const [showDeliveredMessageModal, setShowDeliveredMessageModal] = useState(false);

  const buySectionRef = useRef<HTMLElement>(null);
  const hasTriggeredModalRef = useRef(false);

  // Confete que dura exatamente ~5 segundos na tela e desaparece suavemente
  const trigger5sConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    // Disparo inicial expansivo e vibrante
    confetti({
      particleCount: 80,
      spread: 110,
      origin: { y: 0.6 },
      colors: ['#EC4899', '#5B2A86', '#00d769', '#F472B6', '#FFD700', '#7B3DB8'],
      zIndex: 99999,
      ticks: 120,
    });

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 35 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 28,
        spread: 360,
        ticks: 100,
        zIndex: 99999,
        origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.3 + 0.1 },
        colors: ['#EC4899', '#5B2A86', '#00d769', '#F472B6', '#FFD700', '#7B3DB8']
      });
      confetti({
        particleCount,
        startVelocity: 28,
        spread: 360,
        ticks: 100,
        zIndex: 99999,
        origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.3 + 0.1 },
        colors: ['#EC4899', '#5B2A86', '#00d769', '#F472B6', '#FFD700', '#7B3DB8']
      });
    }, 280);
  };

  // O confete SÓ deve aparecer no momento em que o primeiro popup é exibido
  useEffect(() => {
    if (showCustomer1111Modal) {
      trigger5sConfetti();
    }
  }, [showCustomer1111Modal]);

  // Countdown timer para o popup de R$ 19,90
  useEffect(() => {
    if (!showOffer1990Modal) return;
    const timer = setInterval(() => {
      setCountdown1990((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showOffer1990Modal]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  // Dispara o pop-up de parabéns assim que o visitante chega perto do botão de comprar / final da página
  useEffect(() => {
    if (!isUnlocked) return;

    const currentSection = buySectionRef.current || document.getElementById('pricing-block');
    let observer: IntersectionObserver | null = null;

    if (currentSection && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredModalRef.current) {
              hasTriggeredModalRef.current = true;
              setShowCustomer1111Modal(true);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(currentSection);
    }

    // Scroll listener de alta precisão para garantir disparo assim que chegar perto do botão de comprar
    const handleScroll = () => {
      if (hasTriggeredModalRef.current) return;
      const section = buySectionRef.current || document.getElementById('pricing-block');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
          hasTriggeredModalRef.current = true;
          setShowCustomer1111Modal(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (observer && currentSection) observer.unobserve(currentSection);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isUnlocked]);

  // CONFIGURAÇÕES DE REDIRECIONAMENTO — Links oficiais Wiapy
  const CHECKOUT_URL = 'https://pay.wiapy.com/checkout/6a7273ff1b13df5c3c597b87'; // Link oficial do checkout da oferta
  const CHECKOUT_1990_URL = 'https://pay.wiapy.com/m_zJp2qnr8F-'; // Checkout oficial da oferta relâmpago de R$ 19,90
  const PRODUTO_PRINCIPAL_URL = 'https://wiapy.com/login'; // Link oficial para onde o cliente vai quando recusar a oferta

  // Handlers para o fluxo sequencial de popups e recusas
  const handleRefuseCustomer1111 = () => {
    setShowCustomer1111Modal(false);
    setShowOffer1990Modal(true);
  };

  const handleRefuseOffer1990 = () => {
    setShowOffer1990Modal(false);
    setShowDeliveredMessageModal(true);
  };

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

  // Botão de recusa no site notifica diretamente a oferta de R$ 19,90
  const handleRecusaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOffer1990Modal(true);
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

        <VslPlayer onUnlock={() => setIsUnlocked(true)} />

      </section>

      {/* Conteúdo da Oferta liberado aos 45 segundos após o vídeo estar rodando */}
      {isUnlocked && (
        <>
          {/* Metodo de Vendas de 4 Passos e Botao CTA Principal */}
          <section className="px-4 pb-16 max-w-6xl mx-auto">
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

      {/* 8. DETAILED PRICING CALLOUT BLOCK - UNIFICADO E COERENTE */}
      <section 
        id="pricing-block" 
        ref={buySectionRef} 
        className="py-16 sm:py-24 bg-[#1E0E2E] text-stone-100 px-4 relative overflow-hidden"
      >
        
        {/* Abstract graphic bg glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#5B2A86]/35 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-xl mx-auto relative z-10">
          
          {/* Card Unificado e Coerente */}
          <div className="bg-[#2D1248]/90 rounded-3xl p-6 sm:p-10 border-2 border-[#EC4899]/30 shadow-2xl backdrop-blur-sm text-center relative overflow-hidden">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#5B2A86] via-[#EC4899] to-[#00d769]" />

            {/* Banner de Parabéns / Sorteada */}
            <div className="inline-flex items-center gap-1.5 bg-[#EC4899]/15 text-[#F472B6] border border-[#EC4899]/35 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 animate-bounce shadow-sm">
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
              <span>PARABÉNS! VOCÊ FOI SORTEADA: CLIENTE #1.111</span>
              <Sparkles className="w-4 h-4 text-[#EC4899]" />
            </div>

            {/* Título & Subtítulo */}
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                Plano Shopee para Papelaria Personalizada
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm font-medium max-w-md mx-auto leading-relaxed">
                Você foi contemplada com o nosso desconto especial de comemoração! Aprenda a criar sua loja, escrever títulos magnéticos e vender seus personalizados sem depender de indicações.
              </p>
            </div>

            {/* Caixa de Preço Coerente: Preços cortados e R$ 27 grande e chamativo */}
            <div className="bg-[#1E0E2E]/85 rounded-2xl p-5 sm:p-6 mb-6 border border-purple-500/25 shadow-xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full inline-block border border-pink-500/30 mb-2">
                ⚡ DESCONTO EXCLUSIVO LIBERADO: R$ 70,00 OFF
              </span>
              
              {/* Preços cortados */}
              <div className="flex items-center justify-center gap-2.5 text-stone-400 text-xs sm:text-sm font-mono my-1">
                <span className="line-through text-stone-400 font-semibold">De R$ 97,00</span>
                <span className="text-stone-500">•</span>
                <span className="line-through text-stone-300 font-semibold">De R$ 37,00</span>
              </div>

              {/* R$ 27 GRANDE E CHAMATIVO */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 my-2">
                <span className="text-stone-300 text-sm sm:text-base font-bold">Por apenas</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-[#00d769] font-mono">R$</span>
                  <strong className="text-5xl sm:text-6xl md:text-7xl font-black text-[#00d769] font-mono tracking-tight drop-shadow-[0_4px_24px_rgba(0,215,105,0.45)]">
                    27,00
                  </strong>
                </div>
              </div>

              <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 px-3.5 py-1 rounded-full border border-emerald-500/30">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Economia inédita de R$ 70,00 exclusiva nesta página!</span>
              </div>
            </div>

            {/* Benefícios Inclusos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs text-stone-200 mb-6 max-w-md mx-auto">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00d769] shrink-0" />
                <span>Passo a passo para abrir sua loja</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00d769] shrink-0" />
                <span>Modelos prontos de títulos e descrições</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00d769] shrink-0" />
                <span>Checklist do anúncio de alta conversão</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#00d769] shrink-0" />
                <span>Garantia incondicional blindada de 7 dias</span>
              </div>
            </div>

            {/* Wiapy Upsell Button e Recusa integrada */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md mx-auto shadow-2xl border border-white/20 text-stone-900">
              <WiapyUpsellButton onRefusalClick={() => setShowOffer1990Modal(true)} />
              <p className="text-[11px] text-stone-500 font-medium mt-3">
                🔒 Pagamento seguro via Wiapy • Acesso imediato
              </p>
              <a
                href="https://wiapy.com/login"
                onClick={(e) => {
                  e.preventDefault();
                  setShowOffer1990Modal(true);
                }}
                className="inline-block text-stone-400 hover:text-stone-700 text-xs mt-3 underline font-medium cursor-pointer"
              >
                Recusar está oferta
              </a>
            </div>

            <p className="text-[11px] text-stone-400 mt-4 font-medium">
              Pagamento único. Acesso imediato. Esta condição especial encerra ao sair da página.
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
            LIBERAR ACESSO AGORA — POR APENAS R$ 27,00
          </button>
          <a
            href="https://wiapy.com/login"
            onClick={(e) => {
              e.preventDefault();
              setShowOffer1990Modal(true);
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
            setShowOffer1990Modal(true);
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

      {/* MODAL 0: POP-UP DE PARABÉNS CLIENTE #1111 (DESCONTO DE R$ 37 POR R$ 27) */}
      {showCustomer1111Modal && (
        <div 
          id="cliente-1111-modal" 
          className="fixed inset-0 z-50 bg-[#1E0E2E]/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleRefuseCustomer1111();
            }
          }}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl border-2 border-[#EC4899]/30 text-center relative overflow-hidden animate-scale-up my-auto">
            
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5B2A86] via-[#EC4899] to-[#00d769]" />
            
            {/* Botão de Fechar X */}
            <button
              type="button"
              onClick={handleRefuseCustomer1111}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Badge de Destaque */}
            <div className="inline-flex items-center gap-1 bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>PARABÉNS! VOCÊ FOI SELECIONADA</span>
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            </div>

            {/* Ícone de Celebração */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5B2A86] to-[#EC4899] text-white rounded-xl flex items-center justify-center text-xl sm:text-2xl mx-auto shadow-md shadow-purple-900/20 mb-2">
              🎉
            </div>

            <div className="space-y-1 mb-3">
              <h3 className="text-base sm:text-lg font-black text-[#5B2A86] tracking-tight leading-snug">
                Você é a nossa cliente de número <span className="text-[#EC4899]">#1.111</span>!
              </h3>
              <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed max-w-xs mx-auto">
                Para celebrar este marco especial, você acabou de desbloquear um <strong className="text-stone-900">desconto exclusivo de comemoração</strong>:
              </p>
            </div>

            {/* Box de Preço Promocional Exclusivo: 97 cortado -> 37 cortado -> 27 preço novo */}
            <div className="bg-gradient-to-br from-[#2D1248] to-[#1E0E2E] text-white rounded-xl p-3 sm:p-4 mb-3.5 shadow-lg border border-purple-500/20 relative">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-2.5 py-0.5 rounded-full inline-block border border-pink-500/30 mb-1.5">
                ⚡ DESCONTO EXCLUSIVO CLIENTE #1.111
              </span>
              
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-2">
                <span className="text-stone-400 text-[11px] sm:text-xs line-through font-semibold">
                  De R$ 97,00
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400 text-[11px] sm:text-xs line-through font-semibold">
                  De R$ 37,00
                </span>
                <span className="text-pink-400 font-bold text-xs">➔</span>
                <div className="flex items-baseline gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/25">
                  <span className="text-[10px] sm:text-xs text-stone-300 font-medium">Novo Preço:</span>
                  <strong className="text-2xl sm:text-3xl font-black text-[#00d769] font-mono">
                    R$ 27,00
                  </strong>
                </div>
              </div>

              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Economia de R$ 70,00 exclusiva para você agora!</span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setHasSpecialDiscount(true);
                  setShowCustomer1111Modal(false);
                  handleOpenCheckout();
                }}
                style={{ backgroundColor: '#00d769' }}
                className="w-full py-3 sm:py-3.5 px-4 hover:bg-[#00b85a] text-white rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-emerald-500/30 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🔥 QUERO MEU DESCONTO: PAGAR R$ 27,00 AGORA</span>
              </button>

              <button
                type="button"
                onClick={handleRefuseCustomer1111}
                className="text-[10px] sm:text-[11px] text-stone-400 hover:text-stone-600 underline font-medium cursor-pointer block mx-auto pt-0.5"
              >
                Recusar desconto de R$ 27,00
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: OFERTA RELÂMPAGO IMPERDÍVEL R$ 19,90 (PADRONIZADO IGUAL AO DE R$ 27,00) */}
      {showOffer1990Modal && (
        <div 
          id="oferta-1990-modal" 
          className="fixed inset-0 z-50 bg-[#1E0E2E]/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleRefuseOffer1990();
            }
          }}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl border-2 border-[#EC4899]/30 text-center relative overflow-hidden animate-scale-up my-auto">
            
            {/* Top decorative gradient glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5B2A86] via-[#EC4899] to-[#00d769]" />
            
            {/* Close button X */}
            <button
              type="button"
              onClick={handleRefuseOffer1990}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Badge de Destaque */}
            <div className="inline-flex items-center gap-1 bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2 animate-bounce">
              <Flame className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>ÚLTIMA CHANCE: OFERTA RELÂMPAGO</span>
              <Flame className="w-3.5 h-3.5 text-[#EC4899]" />
            </div>

            {/* Ícone de Celebração / Alerta */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5B2A86] to-[#EC4899] text-white rounded-xl flex items-center justify-center text-xl sm:text-2xl mx-auto shadow-md shadow-purple-900/20 mb-2">
              ⚡
            </div>

            <div className="space-y-1 mb-3">
              <h3 className="text-base sm:text-lg font-black text-[#5B2A86] tracking-tight leading-snug">
                Não saia sem o Plano Shopee por causa de <span className="text-[#EC4899]">R$ 7</span>!
              </h3>
              <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed max-w-xs mx-auto">
                Eu não quero que você fique sem vender. Por isso, liberei o <strong className="text-stone-900">Plano Shopee Completo a preço de custo</strong> para você começar hoje:
              </p>
            </div>

            {/* Box de Preço Promocional Padronizado: 97 cortado -> 37 cortado -> 27 cortado -> 19,90 preço novo */}
            <div className="bg-gradient-to-br from-[#2D1248] to-[#1E0E2E] text-white rounded-xl p-3 sm:p-4 mb-3.5 shadow-lg border border-purple-500/20 relative">
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full inline-block border border-pink-500/30">
                  ⚡ DESCONTO RELÂMPAGO EXCLUSIVO
                </span>
                <span className="text-[10px] font-mono text-stone-300 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
                  <Clock className="w-3 h-3 text-pink-300" /> {formatCountdown(countdown1990)}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 my-2">
                <span className="text-stone-400 text-[10px] sm:text-[11px] line-through font-semibold">
                  De R$ 97,00
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400 text-[10px] sm:text-[11px] line-through font-semibold">
                  De R$ 37,00
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-400 text-[10px] sm:text-[11px] line-through font-semibold">
                  De R$ 27,00
                </span>
                <span className="text-pink-400 font-bold text-xs">➔</span>
                <div className="flex items-baseline gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/25">
                  <span className="text-[10px] sm:text-xs text-stone-300 font-medium">Novo:</span>
                  <strong className="text-2xl sm:text-3xl font-black text-[#00d769] font-mono">
                    R$ 19,90
                  </strong>
                </div>
              </div>

              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Economia recorde de R$ 77,10 com garantia mantida!</span>
              </div>
            </div>

            {/* Botões de Ação Padronizados */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  redirectWithParams(CHECKOUT_1990_URL);
                }}
                style={{ backgroundColor: '#00d769' }}
                className="w-full py-3 sm:py-3.5 px-4 hover:bg-[#00b85a] text-white rounded-xl text-xs sm:text-sm font-black tracking-wider uppercase transition-all shadow-md hover:shadow-emerald-500/30 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🔥 QUERO MEU DESCONTO: PAGAR R$ 19,90 AGORA</span>
              </button>

              <button
                type="button"
                onClick={handleRefuseOffer1990}
                className="text-[10px] sm:text-[11px] text-stone-400 hover:text-stone-600 underline font-medium cursor-pointer block mx-auto pt-0.5"
              >
                Recusar oferta de R$ 19,90
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: MENSAGEM DE COMPRA ENTREGUE (SE RECUSAR A OFERTA DE 19,90) */}
      {showDeliveredMessageModal && (
        <div 
          id="compra-entregue-modal" 
          className="fixed inset-0 z-50 bg-[#1E0E2E]/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeliveredMessageModal(false);
            }
          }}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 max-w-xs sm:max-w-sm w-full shadow-2xl border border-emerald-100 text-center relative overflow-hidden animate-scale-up space-y-3.5 my-auto">
            
            {/* Top decorative green bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600" />
            
            {/* Botão de Fechar X */}
            <button
              type="button"
              onClick={() => setShowDeliveredMessageModal(false)}
              className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Ícone de Sucesso */}
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mx-auto shadow-sm border border-emerald-100 mt-1">
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            </div>

            <div className="space-y-1">
              <div className="inline-block bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                PEDIDO CONFIRMADO E LIBERADO
              </div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                Sua compra principal já foi entregue!
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed">
                Fique tranquila! Os seus dados de acesso ao <strong>Papelaria Descomplicada</strong> já foram enviados para o seu e-mail cadastrado.
              </p>
            </div>

            {/* Card com Detalhes da Entrega */}
            <div className="bg-stone-50 rounded-xl p-3 text-left border border-stone-200/70 text-[11px] space-y-1.5">
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500">Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Liberado e Enviado
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Onde acessar:</span>
                <span className="font-semibold text-[#5B2A86]">Caixa de Entrada do E-mail</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200/70 rounded-lg p-2.5 text-[10px] text-amber-800 leading-relaxed">
              💡 <strong>Dica importante:</strong> Se não localizar em até 3 minutos na Caixa de Entrada, verifique também <strong>Spam</strong> ou <strong>Promoções</strong>.
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
