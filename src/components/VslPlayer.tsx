/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play, CheckCircle, ArrowDown } from 'lucide-react';
import vslStartFrame from '../assets/images/vsl_start_frame_1786132742083.jpg';

interface VslPlayerProps {
  onUnlock: () => void;
  isUnlocked?: boolean;
}

export default function VslPlayer({ onUnlock, isUnlocked = false }: VslPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onUnlockRef = useRef(onUnlock);
  const hasUnlockedRef = useRef(isUnlocked);

  // Mantém a referência de onUnlock atualizada sem resetar efeitos
  useEffect(() => {
    onUnlockRef.current = onUnlock;
  }, [onUnlock]);

  useEffect(() => {
    if (isUnlocked) {
      hasUnlockedRef.current = true;
    }
  }, [isUnlocked]);

  const triggerUnlock = () => {
    if (!hasUnlockedRef.current) {
      hasUnlockedRef.current = true;
      onUnlockRef.current();
    }
  };

  const startVideo = () => {
    setIsPlaying(true);
  };

  // 1. Ouvinte nativo de postMessage do Vimeo (funciona mesmo sem SDK ou se o SDK falhar)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        let payload: any = event.data;
        if (typeof payload === 'string') {
          try {
            payload = JSON.parse(payload);
          } catch {
            return;
          }
        }
        if (!payload) return;

        // Eventos padrão do Vimeo: timeupdate
        if (payload.event === 'timeupdate' && payload.data) {
          const sec = Number(payload.data.seconds || 0);
          if (sec >= 30) {
            triggerUnlock();
          }
        }

        // Eventos de finalização do vídeo (ended/finish)
        if (payload.event === 'finish' || payload.event === 'ended') {
          triggerUnlock();
        }
      } catch (err) {
        // Ignora mensagens de outras extensões/scripts
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 2. Integração com o SDK oficial Vimeo.Player (se disponível)
  useEffect(() => {
    if (!isPlaying) return;

    let playerInstance: any = null;
    const Vimeo = (window as any).Vimeo;

    if (Vimeo?.Player && iframeRef.current) {
      try {
        playerInstance = new Vimeo.Player(iframeRef.current);

        playerInstance.on('timeupdate', (data: { seconds: number }) => {
          if (data && data.seconds >= 30) {
            triggerUnlock();
          }
        });

        playerInstance.on('ended', () => {
          triggerUnlock();
        });
      } catch (e) {
        console.warn('Vimeo SDK initialization fallback:', e);
      }
    }

    return () => {
      if (playerInstance) {
        try {
          playerInstance.off('timeupdate');
          playerInstance.off('ended');
        } catch {
          // ignore
        }
      }
    };
  }, [isPlaying]);

  // 3. Cronômetro de reprodução resiliente (conta 30s de reprodução contínua como garantia absoluta)
  useEffect(() => {
    if (!isPlaying || hasUnlockedRef.current) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      if (elapsedSeconds >= 30) {
        triggerUnlock();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const scrollToOffer = () => {
    const el = document.getElementById('oferta-liberada');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      
      {/* SELO ACIMA DO VÍDEO */}
      <div className="flex items-center gap-2 bg-[#5B2A86]/10 border border-[#5B2A86]/20 text-[#5B2A86] text-xs sm:text-sm font-extrabold px-4 py-2 rounded-full uppercase tracking-wider animate-pulse shadow-xs">
        🎥 ASSISTA AO VÍDEO RÁPIDO ABAIXO
      </div>

      {/* SUBTEXTO DO VÍDEO (Exibido com destaque acima/ao lado do player) */}
      <p className="text-stone-700 text-sm sm:text-base font-medium max-w-xl text-center leading-relaxed px-2">
        Veja como transformar seus personalizados em anúncios prontos para vender na Shopee, mesmo começando do zero.
      </p>

      {/* Phone Frame - TikTok Format Wrapper (9:16 Aspect Ratio) */}
      <div 
        id="tiktok-vsl-frame" 
        className="w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-stone-950 rounded-[36px] overflow-hidden border-[12px] border-stone-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative"
      >
        {/* Dynamic Mobile Phone Notch Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-900 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
          <div className="w-8 h-1 rounded-full bg-stone-800"></div>
        </div>

        {/* Video Embed Container */}
        <div className="w-full h-full relative z-10">
          {!isPlaying ? (
            /* Attention-Grabbing Alert Thumbnail Overlay with Shopee Mockup Image Cover */
            <div 
              onClick={startVideo}
              className="absolute inset-0 w-full h-full flex flex-col justify-between p-6 cursor-pointer select-none group relative overflow-hidden bg-stone-950"
            >
              {/* VSL Cover Background Thumbnail Image */}
              <img 
                src={vslStartFrame} 
                alt="VSL Cover Start Frame"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/50 to-stone-950/90 pointer-events-none" />

              {/* Alert Top Bar & TEXTO DENTRO DO CELULAR/VÍDEO */}
              <div className="relative z-10 pt-6 space-y-2 text-center">
                <span className="inline-flex items-center gap-1 bg-[#EC4899] text-[10px] text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-bounce shadow-md">
                  🎥 AULA EXCLUSIVA
                </span>
                <h3 className="text-white font-extrabold text-sm sm:text-base leading-snug mt-2 px-1 drop-shadow-md">
                  Como vender papelaria personalizada na Shopee mesmo começando do zero
                </h3>
                <p className="text-stone-200 text-[11px] leading-snug mt-2 font-medium opacity-95 drop-shadow-sm">
                  Veja como transformar seus personalizados em anúncios prontos para vender na Shopee, mesmo começando do zero.
                </p>
              </div>

              {/* Glowing Interactive Big Play Button */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-3 my-auto">
                <div className="relative">
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-full bg-[#EC4899]/40 animate-ping"></div>
                  <div className="absolute -inset-4 rounded-full bg-[#7B3DB8]/30 animate-pulse"></div>
                  
                  <div className="relative w-20 h-20 rounded-full bg-[#5B2A86] hover:bg-[#7B3DB8] flex items-center justify-center shadow-[0_0_30px_rgba(91,42,134,0.9)] transition-all group-hover:scale-110 active:scale-95 duration-300">
                    <Play className="w-10 h-10 text-white fill-white ml-1.5" />
                  </div>
                </div>
                <span className="text-[#F472B6] font-extrabold text-[11px] animate-pulse uppercase tracking-wider pt-2 drop-shadow-md">
                  Toque para Assistir
                </span>
              </div>
            </div>
          ) : (
            /* Actual Video Embed with parameters to enable API and auto-playback */
            <iframe
              id="vsl_iframe"
              ref={iframeRef}
              src="https://player.vimeo.com/video/1215615630?api=1&player_id=vsl_iframe&badge=0&autopause=0&title=0&byline=0&portrait=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; text-share-sheet"
              className="absolute top-0 left-0 w-full h-full"
              style={{ width: '100%', height: '100%' }}
              title="Mini VSL TikTok format"
              referrerPolicy="no-referrer"
            ></iframe>
          )}
        </div>

        {/* TikTok Interactive Decorative Dots / Overlays */}
        <div className="absolute bottom-16 right-3.5 z-20 flex flex-col gap-5 items-center pointer-events-none opacity-80">
          {/* Heart/Like */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-lg">
              ❤️
            </div>
            <span className="text-[10px] text-white font-extrabold font-sans mt-1 shadow-sm">1.8K</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-lg">
              ➡️
            </div>
            <span className="text-[10px] text-white font-extrabold font-sans mt-1 shadow-sm font-medium font-mono">108</span>
          </div>
        </div>

        {/* Bottom indicator line on smartphones */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/45 rounded-full z-20"></div>

      </div>

      {/* AVISO / BOTÃO DINÂMICO APÓS O TEMPO LIMITE */}
      {isUnlocked ? (
        <div className="w-full max-w-sm mx-auto bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-500/30 rounded-2xl p-4 text-center shadow-lg animate-bounce">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 text-xs sm:text-sm font-extrabold uppercase tracking-wide">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            OFERTA DESBLOQUEADA COM SUCESSO!
          </div>
          <button
            type="button"
            onClick={scrollToOffer}
            className="mt-2.5 w-full bg-[#00d769] hover:bg-[#00b85a] text-white text-xs sm:text-sm font-extrabold py-3 px-4 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            <span>Ver a Oferta Liberada Abaixo</span>
            <ArrowDown className="w-4 h-4 animate-pulse" />
          </button>
        </div>
      ) : (
        <p className="text-stone-500 text-xs sm:text-sm font-semibold flex items-center gap-2 pt-1 text-center">
          <span>▶ Assista ao vídeo para liberar sua oferta especial exclusiva</span>
        </p>
      )}

    </div>
  );
}
