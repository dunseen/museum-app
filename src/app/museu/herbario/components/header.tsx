import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav-list";
import { Leaf } from "lucide-react";

type HeaderProps = {
  showNavMenu?: boolean;
};
export default function Header({ showNavMenu }: Readonly<HeaderProps>) {
  return (
    <header className="sticky top-0 z-[500] border-b border-green-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/museu/herbario"
            className="group flex items-center space-x-3 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="rounded-lg border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-2 transition-all duration-200 group-hover:border-green-300 group-hover:shadow-md">
              <Image
                src="/ufra-logo.png"
                alt="UFRA Logo"
                width={45}
                height={45}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-bold text-green-800 md:text-xl">
                  UFRA
                </h1>
                <Leaf className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 md:text-sm">
                Herbário Virtual FC
              </span>
            </div>
          </Link>

          {showNavMenu && <NavList />}
        </div>
      </div>
    </header>
  );
}
