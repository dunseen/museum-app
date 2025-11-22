"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Home, Info, Lock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "~/components/ui/sheet";

const links = [
  {
    href: "/museu/herbario",
    label: "Início",
    icon: Home,
    active: false,
  },
  {
    href: "/museu/herbario/sobre",
    label: "Sobre",
    icon: Info,
    active: false,
  },
  {
    href: "/login",
    label: "Gerenciar",
    icon: Lock,
    active: false,
  },
];

export function NavList() {
  const pathname = usePathname();

  return (
    <nav>
      {/* Desktop Menu */}
      <ul className="hidden space-x-1 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <Link
                className={`group relative inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
                href={link.href}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Menu Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="rounded-lg border border-green-200 bg-green-50 p-2 text-green-700 transition-colors duration-200 hover:bg-green-100 md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] bg-gradient-to-br from-green-50 to-emerald-50"
        >
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-green-700">
              Menu de Navegação
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8">
            <ul className="flex flex-col space-y-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <SheetClose asChild>
                      <Link
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-lg transition-all duration-200 ${
                          isActive
                            ? "bg-green-600 font-bold text-white shadow-md"
                            : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                        }`}
                        href={link.href}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
