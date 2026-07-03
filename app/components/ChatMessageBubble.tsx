'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';

interface ChatMessageBubbleProps {
  msg: ChatMessage;
  index: number;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ msg, index }) => {
  return (
    <div
      id={`message-row-${index}`}
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
  );
};

export default React.memo(ChatMessageBubble);
