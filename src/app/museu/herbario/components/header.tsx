import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav-list";

export default async function Header() {
  return (
    <header className="bg-[#006633] p-4 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
        <Link href="/museu/herbario" className="flex items-center space-x-2">
          <Image
            src="/ufra-logo.png"
            alt="UFRA Logo"
            width={100}
            height={100}
            className="h-14 w-14 md:h-auto md:w-auto"
          />
          <div>
            <h1 className="text-lg font-bold md:text-3xl">UFRA</h1>
            <span className="text-sm font-medium">
              Universidade Federal Rural da Amazônia
            </span>
          </div>
        </Link>
        <NavList />
      </div>
    </header>
  );
}
