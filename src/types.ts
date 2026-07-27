/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Basket {
  id: string;
  name: string;
  originalPrice: number;
  description: string;
  image: string;
  category: 'breakfast' | 'romantic' | 'chocolate' | 'maternity';
  details: string[];
}

export interface SalesCaption {
  id: string;
  title: string;
  category: string;
  text: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'seller';
  text: string;
  timestamp: string;
}

export interface WhatsAppScenario {
  id: string;
  title: string;
  description: string;
  messages: ChatMessage[];
  sellerTip: string;
}
