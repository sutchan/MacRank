'use client';

import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from '../types';

// 安全配置: 禁止渲染原始 HTML，仅允许 Markdown 语法
// react-markdown v9 默认不允许 HTML，此处显式说明安全策略 (REACT-MARKUP-001)
const ALLOWED_MARKDOWN_ELEMENTS = [
  'p', 'br', 'strong', 'em', 'code', 'pre', 'blockquote',
  'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr',
];

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
          {/* 安全: allowedTypes 限制仅渲染安全的 Markdown 元素，禁止 HTML 标签 (REACT-MARKUP-001) */}
          <Markdown
            remarkPlugins={[remarkGfm]}
            allowedElements={ALLOWED_MARKDOWN_ELEMENTS}
            unwrapDisallowed
          >{msg.text}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatMessageBubble);
