import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav-list";

type HeaderProps = {
  showNavMenu?: boolean;
};
export default function Header({ showNavMenu  }: Readonly<HeaderProps>) {
  return (
    <header className="bg-[#006633] p-2 text-white md:p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
        <Link href="/museu/herbario" className="flex items-center space-x-2">
          <Image
            src="/ufra-logo.png"
            alt="UFRA Logo"
            width={50}
            height={50}
            className="h-10 w-10 md:h-auto md:w-auto"
          />
          <div>
            <h1 className="text-lg font-bold md:text-2xl">UFRA</h1>
            <span className="text-sm font-medium">
              Universidade Federal Rural da Amazônia
            </span>
          </div>
        </Link>

        {showNavMenu && <NavList />}
      </div>
    </header>
  );
}
