/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Copy, 
  Check, 
  MessageSquare, 
  Instagram, 
  BookOpen, 
  Sparkles, 
  Send,
  User,
  Heart,
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { SALES_CAPTIONS, WHATSAPP_SCENARIOS } from '../data/catalogData';

export default function BonusShowcase() {
  // Bonus 1 States (Instagram Captions)
  const [selectedCaption, setSelectedCaption] = useState(SALES_CAPTIONS[0].id);
  const [copiedCaptionId, setCopiedCaptionId] = useState<string | null>(null);

  // Bonus 2 States (WhatsApp Simulator)
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [visibleMsgCount, setVisibleMsgCount] = useState(1);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const activeScenario = WHATSAPP_SCENARIOS[activeScenarioIdx];

  const handleCopyCaption = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCaptionId(id);
      setTimeout(() => setCopiedCaptionId(null), 3000);
    });
  };

  const handleCopyMessageText = (id: string, text: string) => {
    // Replace placeholder with something natural
    const processedText = text.replace('[PREÇO_ATUAL]', 'R$ 295,00');
    navigator.clipboard.writeText(processedText).then(() => {
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 3500);
    });
  };

  const handleNextMessage = () => {
    if (visibleMsgCount < activeScenario.messages.length) {
      setVisibleMsgCount(p => p + 1);
    }
  };

  const handleResetScenario = (idx: number) => {
    setActiveScenarioIdx(idx);
    setVisibleMsgCount(1);
  };

  return (
    <div className="bg-stone-50 py-16 px-4 md:px-8 border-t border-stone-200/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold bg-amber-200 text-amber-900 px-3 py-1 rounded-full uppercase tracking-widest">
            Bônus Exclusivos de Rápida Implementação
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-3 mb-4">
            E você ainda recebe 2 Bônus Exclusivos Grátis se garantir hoje:
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Feito sob medida para donas de casa e mães eliminarem qualquer medo de vender ou negociar. Tudo mastigado para você copiar e colar.
          </p>
        </div>

        {/* Content Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* BONUS 1: 30 Legendas para Copiar e Colar (Instagram) */}
          <div id="bonus-caption-card" className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-100 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Bônus 1 • Acesso Pro
                </span>
                <span className="text-xs text-stone-400 font-semibold line-through">Valor Original: R$ 47,00</span>
              </div>

              {/* Title detailing */}
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">30 Legendas Prontas para Redes Sociais</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Textos persuasivos focados em despertar o desejo e lotar o Direct de cotações de cesta.
                  </p>
                </div>
              </div>

              {/* Category Quick Filter */}
              <div className="flex flex-wrap gap-1.5 mb-5 border-b border-stone-100 pb-4">
                {SALES_CAPTIONS.map(cap => (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setSelectedCaption(cap.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold select-none transition-all cursor-pointer ${
                      selectedCaption === cap.id
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {cap.title}
                  </button>
                ))}
              </div>

              {/* Selected Caption Viewer with Live Copy */}
              {SALES_CAPTIONS.map(cap => {
                if (cap.id !== selectedCaption) return null;
                return (
                  <div key={cap.id} className="relative bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200">
                    <pre className="font-sans text-xs sm:text-sm text-stone-700 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                      {cap.text}
                    </pre>

                    {/* Copy layer action */}
                    <div className="absolute right-3 bottom-3">
                      <button
                        type="button"
                        onClick={() => handleCopyCaption(cap.id, cap.text)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:scale-103 ${
                          copiedCaptionId === cap.id 
                            ? 'bg-green-600 text-white shadow-md' 
                            : 'bg-stone-900 hover:bg-black text-stone-100 shadow-md'
                        }`}
                      >
                        {copiedCaptionId === cap.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copia Legenda</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-pink-50 rounded-2xl p-3 border border-pink-100 flex items-center gap-2 mt-6">
              <span className="text-xl">✍️</span>
              <p className="text-[11px] text-pink-900 leading-normal">
                <strong>Sem bloqueios mentais!</strong> É simplesmente copiar, colar, ajustar o nome do seu negócio e fechar vendas com textos impecáveis.
              </p>
            </div>
          </div>

          {/* BONUS 2: Script de Conversão no WhatsApp (Simulator) */}
          <div id="bonus-script-card" className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-100 flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Bônus 2 • Alta Conversão
                </span>
                <span className="text-xs text-stone-400 font-semibold line-through">Valor Original: R$ 67,00</span>
              </div>

              {/* Title detailing */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">Script de Atendimento no WhatsApp</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Não tenha medo de clientes que somem! Use nosso simulador para aprender e copiar os fechamentos assertivos de venda.
                  </p>
                </div>
              </div>

              {/* Scenario selector tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {WHATSAPP_SCENARIOS.map((scen, idx) => (
                  <button
                    key={scen.id}
                    type="button"
                    onClick={() => handleResetScenario(idx)}
                    className={`py-2 px-2.5 text-xs font-bold leading-tight rounded-xl border text-center transition-all cursor-pointer ${
                      activeScenarioIdx === idx
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {scen.title}
                  </button>
                ))}
              </div>

              {/* Simulated chat container */}
              <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-2xl p-4 min-h-[300px] flex flex-col justify-between">
                
                {/* Chat window viewport */}
                <div className="space-y-3.5 mb-4">
                  <div className="text-center">
                    <span className="text-[9px] bg-stone-200/70 text-stone-700 px-2.5 py-0.5 rounded-full inline-block font-medium">
                      Simulando Chat de Atendimento ({activeScenario.title})
                    </span>
                  </div>

                  {activeScenario.messages.slice(0, visibleMsgCount).map(msg => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col max-w-[85%] ${
                        msg.sender === 'seller' ? 'ml-auto items-end animate-slice-up' : 'mr-auto items-start animate-slice-up'
                      }`}
                    >
                      <div 
                        className={`p-3 rounded-2xl shadow-sm border text-xs leading-relaxed group relative ${
                          msg.sender === 'seller' 
                            ? 'bg-emerald-600 border-emerald-500 text-white rounded-tr-none' 
                            : 'bg-white border-stone-200 text-stone-800 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text.replace('[PREÇO_ATUAL]', 'R$ 295,00')}</p>

                        {/* Copy small button overlay for seller scripts */}
                        {msg.sender === 'seller' && (
                          <button
                            type="button"
                            onClick={() => handleCopyMessageText(msg.id, msg.text)}
                            className="absolute top-1.5 right-1.5 opacity-10 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 hover:bg-black/80 text-white p-1 rounded cursor-pointer"
                            title="Copiar esse trecho do script"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-2.5 h-2.5 text-green-300" />
                            ) : (
                              <Copy className="w-2.5 h-2.5" />
                            )}
                          </button>
                        )}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-1 font-mono">{msg.timestamp}</span>
                    </div>
                  ))}
                </div>

                {/* Simulated action area inside chat */}
                <div className="border-t border-stone-200/55 pt-3 flex items-center justify-between gap-2 bg-white/70 backdrop-blur-xs p-2.5 rounded-xl">
                  {visibleMsgCount < activeScenario.messages.length ? (
                    <button
                      type="button"
                      onClick={handleNextMessage}
                      className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
                    >
                      <span>Ver Próxima Resposta do Script</span>
                      <Send className="w-3.5 h-3.5 animate-pulse" />
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-emerald-800">✅ Conversa Fechada com Sucesso!</span>
                      <button 
                        onClick={() => setVisibleMsgCount(1)}
                        className="text-amber-800 hover:underline cursor-pointer font-bold uppercase text-[10px]"
                      >
                        Reiniciar Script
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Admin recommendation guidance for women */}
              <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl text-[10px] text-stone-600 mt-3">
                💡 <strong>Dica Especial do Fechamento:</strong> {activeScenario.sellerTip}
              </div>

            </div>

            <div className="flex items-center gap-1.5 mt-4 text-[10px] text-stone-400">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>Garante mais de 82% de retenção de clientes no direct e WhatsApp de mães.</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
