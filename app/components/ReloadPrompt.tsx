import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

const ReloadPrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needUpdate: [needUpdate, setNeedUpdate],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedUpdate(false);
  };

  if (!offlineReady && !needUpdate) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white dark:bg-apple-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 min-w-[280px] backdrop-blur-xl bg-opacity-90">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <RefreshCw size={18} className={needUpdate ? 'animate-spin-slow' : ''} />
            <span className="font-semibold text-sm">
              {offlineReady ? '已准备好离线使用' : '发现新版本'}
            </span>
          </div>
          <button onClick={close} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          {offlineReady 
            ? '应用已缓存，现在可以在没有网络的情况下访问 MacRank。' 
            : '点击更新以获取最新的 Mac 性能数据和 AI 顾问功能。'}
        </p>

        {needUpdate && (
          <button
            onClick={() => updateServiceWorker(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-xl transition-colors shadow-sm"
          >
            立即更新
          </button>
        )}
      </div>
    </div>
  );
};

export default ReloadPrompt;
