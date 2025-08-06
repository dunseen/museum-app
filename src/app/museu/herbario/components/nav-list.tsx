"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
    active: false,
  },
  {
    href: "/museu/herbario/sobre",
    label: "Sobre",
    active: false,
  },
  {
    href: "/museu/herbario/contatos",
    label: "Contato",
    active: false,
  },
  {
    href: "/login",
    label: "Gerenciar",
    active: false,
  },
];

export function NavList() {
  const pathname = usePathname();

  return (
    <nav>
      {/* Desktop Menu */}
      <ul className="hidden space-x-4 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.label}>
              <Link
                className={isActive ? "font-bold underline" : ""}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile Menu Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden" aria-label="Toggle menu">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-white">
          <SheetHeader>
            <SheetTitle className="text-[#006633]">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6">
            <ul className="flex flex-col space-y-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.label}>
                    <SheetClose asChild>
                      <Link
                        className={`block py-2 text-lg ${
                          isActive
                            ? "font-bold text-[#006633] underline"
                            : "text-gray-700 hover:text-[#006633]"
                        }`}
                        href={link.href}
                      >
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
