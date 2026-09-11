import React, { useState, useEffect } from "react";
import usePWAInstall from "../../hooks/usePWAInstall";
import { Download, Share, PlusSquare, X, Smartphone, Check } from "lucide-react";

export function InstallPWAButton({ className = "" }) {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = () => {
    if (isInstallable) {
      promptInstall();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95 dark:bg-emerald-600 dark:hover:bg-emerald-500 ${className}`}
        title="Install RSWA Application"
      >
        <Download className="h-3.5 w-3.5" />
        <span>Install App</span>
      </button>

      {showIOSModal && (
        <IOSInstallModal onClose={() => setShowIOSModal(false)} />
      )}
    </>
  );
}

export function IOSInstallModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-slate-900/60 p-6 shadow-2xl transition-all dark:bg-slate-900 dark:text-slate-100 dark:border dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white dark:text-white">
              Install RSWA App on iOS
            </h3>
            <p className="text-xs text-slate500 dark: text-slate-300">
              Add to Home Screen for fast access
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-[10px] text-white">
              1
            </span>
            <p>
              Tap the <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1"><Share className="h-3.5 w-3.5 text-blue-500 inline" /> Share</span> button at the bottom of Safari browser.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-[10px] text-white">
              2
            </span>
            <p>
              Scroll down the menu and select <span className="font-semibold text-slate-900 dark:text-white inline-flex items-center gap-1"><PlusSquare className="h-3.5 w-3.5 text-emerald-500 inline" /> Add to Home Screen</span>.
            </p>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-[10px] text-white">
              3
            </span>
            <p>
              Tap <span className="font-semibold text-slate-900 dark:text-white">Add</span> in top right corner. The RSWA app icon will now appear on your home screen!
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-98"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

export function InstallPWABanner() {
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("rswa_pwa_banner_dismissed");
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  if (isInstalled || dismissed) {
    return null;
  }

  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("rswa_pwa_banner_dismissed", "true");
  };

  const handleInstall = () => {
    if (isInstallable) {
      promptInstall();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[9990] max-w-sm rounded-2xl border border-emerald-500/30 bg-slate-900/95 p-4 text-slate-100 shadow-2xl backdrop-blur-md dark:bg-slate-900/95 dark:border-emerald-500/40 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-extrabold text-sm shadow-md">
            RSWA
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-xs font-bold text-white">Install RSWA App</h4>
            <p className="mt-0.5 text-[11px] text-slate-300">
              Install RSWA on your device for instant offline access & quick navigation.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:bg-emerald-500 active:scale-95"
              >
                <Download className="h-3 w-3" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              >
                Not Now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showIOSModal && (
        <IOSInstallModal onClose={() => setShowIOSModal(false)} />
      )}
    </>
  );
}

export default InstallPWAButton;
