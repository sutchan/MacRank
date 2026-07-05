'use client';

// app/components/ErrorBoundary.tsx v0.7.8
import React, { Component, useContext } from 'react';
import { AlertTriangle } from 'lucide-react';
import { LanguageContext, LanguageContextType } from '../locales/translations';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const ErrorFallback: React.FC<{ onRetry: () => void }> = ({ onRetry }) => {
  const { t } = useContext(LanguageContext) as LanguageContextType;
  return (
    <div id="error-boundary-fallback" className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('error_title')}</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">{t('error_desc')}</p>
      <Button onClick={onRetry}>{t('retry')}</Button>
    </div>
  );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
