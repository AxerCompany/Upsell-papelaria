import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends (Component as any) {
  state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4 border border-purple-100">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              ⚠️
            </div>
            <h2 className="text-lg font-bold text-stone-900">
              Carregando oferta...
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              Clique abaixo para recarregar a página de oferta.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-[#00d769] hover:bg-[#00b85a] text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
