"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <ul className="flex space-x-4">
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
    </nav>
  );
}
