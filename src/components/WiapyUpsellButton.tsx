import React, { useEffect, useState } from 'react';

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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

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
    let timer: NodeJS.Timeout | null = null;
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos de verificação periódica

    const init = () => {
      const container = document.getElementById('wiapy_upsell');
      if (typeof window.initWiapyUpsell === 'function' && container) {
        window.initWiapyUpsell({
          elementId: 'wiapy_upsell',
          linkUrl: CHECKOUT_URL,
          linkText: 'SIM, EU ACEITO ESSA OFERTA',
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
        setIsScriptLoaded(true);
        return true;
      }
      return false;
    };

    // Tenta inicializar de imediato
    if (!init()) {
      timer = setInterval(() => {
        attempts += 1;
        if (init() || attempts >= maxAttempts) {
          if (timer) clearInterval(timer);
        }
      }, 100);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className={`w-full max-w-[400px] mx-auto text-center ${className}`}>
      {/* 
        Container obrigatório da Wiapy.
        Quando o script carrega e o initWiapyUpsell é executado, ele substitui o conteúdo interno.
        Caso o script ainda não tenha carregado, o fallback abaixo garante clique imediato e total funcionalidade.
      */}
      <div id="wiapy_upsell" className="w-full">
        {!isScriptLoaded && (
          <div className="w-full">
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
              SIM, EU ACEITO ESSA OFERTA
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
    </div>
  );
};
