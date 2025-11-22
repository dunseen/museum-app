import { type ReactNode } from "react";

type BotanicalLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function BotanicalLayout({
  children,
  className = "",
}: BotanicalLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-teal-50/30">
      <div className="relative">
        {/* Subtle dot pattern overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#10b98133_1px,transparent_1px)] opacity-40 [background-size:16px_16px]" />

        <div className={`relative ${className}`}>{children}</div>
      </div>
    </div>
  );
}
