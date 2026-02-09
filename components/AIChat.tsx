import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, ArrowUp, X, Bot, Sparkles } from 'lucide-react';
import { ChatMessage, MacModel } from '../lib/types';
import { getMacAdvice } from '../services/geminiService';
import { LanguageContext } from '../App';

interface AIChatProps {
  macData: MacModel[];
}

const AIChat: React.FC<AIChatProps> = ({ macData }) => {
  const { t, language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', text: t('chatWelcome') }]);
  }, [language]);

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

  return (
    <>
      {/* Floating Button - Apple Gradient */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl transition-all duration-500 hover:scale-105 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <Sparkles size={24} strokeWidth={1.5} />
      </button>

      {/* Chat Window - Glassmorphism */}
      <div 
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[380px] h-[75vh] sm:h-[600px] max-h-[85vh] bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(30,30,30,0.95)] backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 flex flex-col transition-all duration-500 transform origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 pointer-events-none translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center bg-white/50 dark:bg-black/20">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 dark:text-white text-base">{t('chatTitle')}</h3>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">{t('genai_assistant')}</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label={t('close')}
            className="w-8 h-8 rounded-full bg-gray-200/50 dark:bg-gray-700/50 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/30 dark:bg-black/10">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-gray-700'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                 <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white/50 dark:bg-black/20 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 px-1 py-1 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ask_placeholder')}
              className="flex-1 bg-transparent pl-4 pr-2 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-gray-400 transition-all hover:bg-blue-600"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AIChat;