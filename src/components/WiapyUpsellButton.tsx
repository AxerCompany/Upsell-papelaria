import React, { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    initWiapyUpsell?: (config: {
      elementId?: string;
      linkUrl: string;
      linkText: string;
      styles?: {
        backgroundColor?: string;
        hoverBackgroundColor?: string;
        fontSize?: string;
        borderRadius?: string;
        color?: string;
        fontWeight?: string;
        padding?: string;
        transition?: string;
        border?: string;
        cursor?: string;
        fontFamily?: string;
        hoverTransform?: string;
      };
      refusalLinkUrl?: string;
      refusalLinkText?: string;
      refusalLinkColor?: string;
    }) => void;
  }
}

interface WiapyUpsellButtonProps {
  className?: string;
}

export const WiapyUpsellButton: React.FC<WiapyUpsellButtonProps> = ({ className = '' }) => {
  const [isWiapyActive, setIsWiapyActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // URLs oficiais fornecidas
  const CHECKOUT_URL = 'https://pay.wiapy.com/checkout/6a7273ff1b13df5c3c597b87';
  const REFUSAL_URL = 'https://wiapy.com/login';

  // Preserva parâmetros da URL (UTMs, wiapy_sell, etc.) no fallback
  const getUrlWithCurrentParams = (url: string) => {
    if (typeof window === 'undefined' || !window.location.search) return url;
    const search = window.location.search.replace(/^\?/, '');
    if (!search) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${search}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let attempts = 0;
    const maxAttempts = 30; // 3 segundos

    const tryInitWiapy = () => {
      if (initializedRef.current) return true;
      const el = containerRef.current || document.getElementById('wiapy_upsell');
      
      if (el && typeof window.initWiapyUpsell === 'function') {
        try {
          window.initWiapyUpsell({
            elementId: 'wiapy_upsell',
            linkUrl: CHECKOUT_URL,
            linkText: 'LIBERAR ACESSO AGORA',
            styles: {
              backgroundColor: '#00d769',
              hoverBackgroundColor: '#00b85a',
              fontSize: '17px',
              borderRadius: '10px',
            },
            refusalLinkUrl: REFUSAL_URL,
            refusalLinkText: 'Recusar está oferta',
            refusalLinkColor: '#000000',
          });
          initializedRef.current = true;
          
          // Verifica se o script injetou os elementos no container
          if (el.children.length > 0 || el.innerHTML.trim() !== '') {
            setIsWiapyActive(true);
          } else {
            // Em alguns casos o script Wiapy injeta após o microtask
            setTimeout(() => {
              if (el.children.length > 0 || el.innerHTML.trim() !== '') {
                setIsWiapyActive(true);
              }
            }, 100);
          }
          return true;
        } catch (err) {
          console.warn('[WiapyUpsell] Init catch:', err);
          return false;
        }
      }
      return false;
    };

    if (!tryInitWiapy()) {
      interval = setInterval(() => {
        attempts += 1;
        if (tryInitWiapy() || attempts >= maxAttempts) {
          if (interval) clearInterval(interval);
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className={`w-full max-w-[400px] mx-auto text-center ${className}`}>
      {/* 
        Container oficial reservado para a Wiapy.
        IMPORTANTE: O React JAMAIS deve renderizar filhos diretos aqui dentro, 
        pois a biblioteca da Wiapy manipula esse container via innerHTML.
        Isso previne conflitos de reconciliação DOM (removeChild) e tela branca no React.
      */}
      <div 
        id="wiapy_upsell" 
        ref={containerRef}
        className="w-full"
        style={{ display: isWiapyActive ? 'block' : 'none' }}
      />

      {/* 
        Fallback oficial imediato:
        Renderizado fora do container #wiapy_upsell para evitar conflitos de DOM.
        Garante que o botão verde de compra e o link de recusa estejam 100% visíveis e funcionais
        desde o milissegundo 0 até o script carregar.
      */}
      {!isWiapyActive && (
        <div id="wiapy_fallback_container" className="w-full">
          <a
            id="wiapy-fallback-checkout-btn"
            href={getUrlWithCurrentParams(CHECKOUT_URL)}
            target="_self"
            style={{
              backgroundColor: '#00d769',
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: '600',
              padding: '14px 28px',
              borderRadius: '10px',
              display: 'block',
              width: '100%',
              textAlign: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(0, 215, 105, 0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#00b85a';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00d769';
              e.currentTarget.style.transform = 'none';
            }}
            className="active:scale-98"
          >
            LIBERAR ACESSO AGORA
          </a>
          <a
            id="wiapy-fallback-refusal-link"
            href={getUrlWithCurrentParams(REFUSAL_URL)}
            target="_self"
            style={{
              display: 'block',
              marginTop: '12px',
              fontSize: '14px',
              color: '#000000',
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            className="hover:underline opacity-80 hover:opacity-100"
          >
            Recusar está oferta
          </a>
        </div>
      )}
    </div>
  );
};
