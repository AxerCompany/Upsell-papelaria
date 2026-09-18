/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Check, 
  Download, 
  Mail, 
  ArrowRight, 
  Sparkles,
  Heart,
  Smile,
  FileText
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  whatsapp: string;
}

export default function CheckoutModal({ isOpen, onClose, businessName, whatsapp }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [emailInput, setEmailInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  // Card form States
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      alert('Por favor, insira o seu e-mail para receber os dados de acesso!');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment loading state
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
    }, 2000);
  };

  const downloadCatalogPackage = () => {
    alert(`🎉 Baixando o arquivo compactado do "Catálogo Pronto para Vender" com o Nome: "${businessName}" e WhatsApp: "${whatsapp}"!\n\nEste arquivo contém:\n• PDF do Catálogo de Vendas\n• Imagens em alta definição\n• Folheto A4 pronto para impressão\n• 30 Legendas Doces\n• Sripts de Atendimento em PDF.`);
  };

  return (
    <div id="checkout-root-modal" className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Outer Box */}
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 transform scale-100 transition-all duration-300">
        
        {/* Header bar */}
        <div className="bg-stone-50 border-b border-stone-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#5B2A86] animate-pulse" />
            <span className="text-xs font-bold text-stone-700 tracking-wider uppercase font-sans">
              Checkout 100% Seguro & Protegido
            </span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Inner Body */}
        {!isPurchased ? (
          <div className="p-6 sm:p-8">
            
            {/* Order Review Header */}
            <div className="bg-gradient-to-tr from-[#5B2A86]/10 to-[#F472B6]/15 border border-[#7B3DB8]/20 rounded-2xl p-4 mb-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] bg-[#5B2A86] text-white px-2.5 py-0.5 rounded-full font-bold">OFERTA ÚNICA (OTU)</span>
                <h4 className="text-sm font-bold text-stone-900 mt-1.5">Curso para Começar na Papelaria do Zero</h4>
                <p className="text-[10px] text-stone-500">Liberação imediata no e-mail</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 font-mono line-through block">De R$ 97,00</span>
                <strong className="text-xl font-black text-[#EC4899] font-mono">R$ 47,00</strong>
              </div>
            </div>

            {/* Customizer details display */}
            <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100 mb-6 flex justify-between">
              <span>Seu Acesso Atribuído: <strong>{businessName}</strong></span>
              <span>WhatsApp Cadastrado: <strong>{whatsapp}</strong></span>
            </div>

            {/* Simulated Form */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              
              {/* Delivery Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
                  E-mail para Receber o Curso (Uso Real)
                </label>
                <input 
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full px-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#5B2A86] font-sans text-stone-800 text-sm font-medium transition-all"
                />
                <span className="text-[9px] text-stone-400">Verifique se está correto para evitar falhas no envio.</span>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#5B2A86] bg-[#5B2A86]/10 text-[#5B2A86] shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cartão de Crédito</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`py-3 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-[#5B2A86] bg-[#5B2A86]/10 text-[#5B2A86] shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pix (Cópia e Cola ou Qr)</span>
                </button>
              </div>

              {/* Tab Case 1: Credit Card Simulator */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col gap-1">
                    <input 
                      type="text" 
                      required
                      placeholder="Número do Cartão de Crédito"
                      value={cardNumber}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 16) v = v.substring(0, 16);
                        setCardNumber(v.replace(/(\d{4})(?=\d)/g, '$1 '));
                      }}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#5B2A86] font-sans text-stone-800 text-xs font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <input 
                      type="text" 
                      required
                      placeholder="Nome Impresso no Cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#5B2A86] font-sans text-stone-800 text-xs font-semibold uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      required
                      placeholder="Validade (MM/AA)"
                      value={expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 4) v = v.substring(0, 4);
                        if (v.length >= 2) {
                          setExpiry(v.substring(0,2) + '/' + v.substring(2));
                        } else {
                          setExpiry(v);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#5B2A86] font-sans text-stone-800 text-xs font-semibold"
                    />
                    <input 
                      type="password" 
                      required
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '');
                        setCvv(v.substring(0, 4));
                      }}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#5B2A86] font-sans text-stone-800 text-xs font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* Tab Case 2: Pix Details */}
              {paymentMethod === 'pix' && (
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-150 text-center space-y-2.5">
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Aprovação Imediata em 5 segundos
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                    Basta preencher seu e-mail acima e clicar para processar! Na próxima etapa mostramos seu Pix personalizado para desbloqueio imediato do curso.
                  </p>
                </div>
              )}

              {/* Total checkout safety indicators */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra Protegida por criptografia SSL.</span>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#5B2A86] hover:bg-[#7B3DB8] text-white rounded-xl py-4 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-[#5B2A86]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    <span>Processando Pagamento...</span>
                  </>
                ) : (
                  <>
                    <span>APROVAR PAGAMENTO SIMULADO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* SUCCESS VIEW: Download the fully unlocked custom deliverables */
          <div className="p-6 sm:p-8 text-center space-y-6">
            
            {/* Icon circle of validation */}
            <div className="w-16 h-16 bg-[#5B2A86]/10 rounded-full flex items-center justify-center mx-auto text-[#5B2A86] animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <div className="inline-block bg-[#EC4899]/10 text-[#5B2A86] text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest border border-[#EC4899]/20">
                Parabéns! Pedido Aprovado!
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Seu Curso Completo está Desbloqueado!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto">
                Enviamos as credenciais de acesso para o seu e-mail: <strong className="text-stone-800">{emailInput || 'membro@curso.com'}</strong>.
              </p>
            </div>

            {/* Visual unlocked downloads panel */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-left space-y-3">
              
              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎥</span>
                  <div>
                    <h5 className="text-[11px] font-bold text-stone-900">Acesso às Aulas do Curso</h5>
                    <p className="text-[9px] text-stone-400">Assista direto pelo computador ou celular</p>
                  </div>
                </div>
                <button 
                  onClick={downloadCatalogPackage}
                  className="bg-[#5B2A86] hover:bg-[#7B3DB8] text-white p-1.5 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">📝</span>
                  <div>
                    <h5 className="text-[11px] font-bold text-stone-900">Guia dos Primeiros Passos</h5>
                    <p className="text-[9px] text-stone-400">PDF com checklist para começar do zero</p>
                  </div>
                </div>
                <button 
                  onClick={downloadCatalogPackage}
                  className="bg-[#5B2A86] hover:bg-[#7B3DB8] text-white p-1.5 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Encouraging closer card */}
            <div className="bg-purple-50 text-stone-700 rounded-xl p-4 border border-purple-100 flex items-start gap-2.5 text-left text-[11px] leading-relaxed">
              <Smile className="w-5 h-5 text-[#7B3DB8] shrink-0" />
              <span>
                <strong>Sua jornada lucrativa inicia hoje!</strong> Assista às aulas, coloque em prática e comece na papelaria com total segurança. Sucesso!
              </span>
            </div>

            {/* Back button to sales page with UTM preserving redirection */}
            <button
              onClick={() => {
                const PRODUTO_PRINCIPAL_URL = 'https://fabricadecestas.com.br/acesso';
                const search = window.location.search;
                if (!search) {
                  window.location.href = PRODUTO_PRINCIPAL_URL;
                  return;
                }
                const separator = PRODUTO_PRINCIPAL_URL.includes('?') ? '&' : '?';
                const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
                window.location.href = `${PRODUTO_PRINCIPAL_URL}${separator}${cleanSearch}`;
              }}
              className="w-full bg-[#5B2A86] hover:bg-[#7B3DB8] text-white rounded-xl py-3 text-xs font-bold uppercase transition cursor-pointer"
            >
              Acessar Meu Aplicativo Principal agora
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
