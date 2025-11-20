"use client";

import React from "react";
import { Share, X } from "lucide-react";

const DISMISS_STORAGE_KEY = "herbarium-ios-install-dismissed-at";
const DISMISS_COOLDOWN_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function isIosSafari() {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as typeof navigator & { standalone?: boolean }).standalone;

  return isIOS && !isStandalone;
}

export function IosInstallPrompt() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isIosSafari()) return;

    const lastDismiss = localStorage.getItem(DISMISS_STORAGE_KEY);
    if (lastDismiss && Date.now() - Number(lastDismiss) < DISMISS_COOLDOWN_MS) {
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const handleDismiss = React.useCallback(() => {
    localStorage.setItem(DISMISS_STORAGE_KEY, Date.now().toString());
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <Share className="h-5 w-5" aria-hidden />
        </div>
        <div className="flex-1 text-sm text-slate-800">
          <p className="font-semibold text-slate-900">Instale no seu iPhone ou iPad</p>
          <p className="mt-1 leading-relaxed text-slate-700">
            Toque em <span className="font-semibold">Compartilhar</span> e depois em
            <span className="font-semibold"> "Adicionar à Tela de Início"</span> para usar o
            Herbário Virtual em modo aplicativo.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Fechar aviso de instalação"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
