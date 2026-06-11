'use client';

import React, { useState, useRef, useEffect, useContext } from 'react';
import { ArrowUp, X, Sparkles, WifiOff, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage, MacModel } from '../types';
import { getMacAdvice } from '../services/geminiService';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AIChatProps {
  macData: MacModel[];
}

const AIChat: React.FC<AIChatProps> = ({ macData }) => {
  const { t, language } = useContext(LanguageContext) as LanguageContextType;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'model', text: t('chatWelcome') }]);
    }
  }, [language, messages, t]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowSuggestion(false);
    } else {
        const timer = setTimeout(() => setShowSuggestion(true), 3000);
        return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await getMacAdvice(userMsg, macData, language);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleClearChat = () => {
    if (confirm(t('clear_chat_confirm'))) {
      setMessages([{ role: 'model', text: t('chatWelcome') }]);
    }
  };

  return (
    <div id="ai-chat-component-root">
       <div 
         id="ai-suggestion-bubble"
         className={`fixed bottom-24 right-6 z-40 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all duration-500 transform origin-bottom-right ${
            showSuggestion && !isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4 pointer-events-none'
         }`}
       >
         <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700 transform rotate-45"></div>
         {t('ai_suggestion')}
       </div>

      <Button
        id="ai-chat-trigger-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-500 hover:scale-105 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <Sparkles size={24} strokeWidth={1.5} />
      </Button>

      <div 
        id="ai-chat-window-container"
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[380px] h-[75vh] sm:h-[600px] max-h-[85vh] bg-frost-light-chat dark:bg-frost-dark-chat backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col transition-all duration-500 transform origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-10'
        }`}
      >
        <div id="ai-chat-header-container" className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center bg-white/50 dark:bg-black/20">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base">{t('chatTitle')}</h3>
            <div className="flex items-center gap-1.5">
               <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-orange-500'}`}></span>
               <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium tracking-wide uppercase">
                 {isOnline ? t('genai_assistant') : t('status_offline')}
               </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleClearChat}
              variant="ghost"
              size="icon-xs"
              className="hover:bg-red-500/10 text-gray-400 hover:text-red-500"
              title={t('clear_chat')}
            >
              <Trash2 size={16} />
            </Button>
            <Button 
              id="ai-chat-close-btn"
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="icon-xs"
              className="bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label={t('close')}
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        <div id="ai-chat-messages-scroll-container" className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/30 dark:bg-black/10 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              id={`message-row-${idx}`}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700'
                }`}
              >
                <div className="markdown-body">
                  <Markdown>{msg.text}</Markdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div id="ai-chat-loading-indicator" className="flex justify-start">
               <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form id="ai-chat-input-form-element" onSubmit={handleSubmit} className="p-4 bg-white/50 dark:bg-black/20 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 px-1 py-1 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-sm">
            <Input
              id="ai-chat-input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ask_placeholder')}
              className="flex-1 bg-transparent pl-4 pr-2 py-2 text-sm rounded-full border-none"
            />
            <Button 
              id="ai-chat-send-btn"
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon-xs"
              className={`w-8 h-8 rounded-full text-white disabled:opacity-50 disabled:bg-gray-400 transition-all ${
                isOnline ? 'bg-blue-500 hover:bg-blue-600' : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              {isOnline ? <ArrowUp size={16} strokeWidth={2.5} /> : <WifiOff size={14} />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;