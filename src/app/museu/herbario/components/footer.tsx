import Link from "next/link";
import { Leaf, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="relative mt-8 bg-gradient-to-br from-green-800 via-emerald-700 to-green-800 text-white">
      {/* Decorative top line */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50" />

      {/* Subtle pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] opacity-20 [background-size:20px_20px]" />

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-300" />
                <h3 className="text-lg font-bold">Herbário FC</h3>
              </div>
              <p className="text-sm leading-relaxed text-green-100">
                Preservando a biodiversidade amazônica através da catalogação e
                estudo científico da flora regional.
              </p>
              <div className="mt-4 inline-block rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm">
                <p className="text-xs font-medium text-green-200">
                  Universidade Federal Rural da Amazônia
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/museu/herbario"
                    className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-green-400 transition-all group-hover:w-2" />
                    Acervo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/museu/herbario/sobre"
                    className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-green-400 transition-all group-hover:w-2" />
                    Sobre o Herbário
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-green-400 transition-all group-hover:w-2" />
                    Área Administrativa
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Contato</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-green-100">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" />
                  <span>Campus Belém, Pará - Brasil</span>
                </li>
                <li className="flex items-center gap-2 text-green-100">
                  <Mail className="h-4 w-4 flex-shrink-0 text-green-300" />
                  <a
                    href="mailto:herbario@ufra.edu.br"
                    className="transition-colors hover:text-white hover:underline"
                  >
                    herbario@ufra.edu.br
                  </a>
                </li>
                <li className="flex items-center gap-2 text-green-100">
                  <Phone className="h-4 w-4 flex-shrink-0 text-green-300" />
                  <span>(91) 0000-0000</span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 text-lg font-bold">Recursos</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://www.ufra.edu.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                  >
                    Site da UFRA
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
                <li>
                  <div className="mt-2 space-y-2 rounded-lg bg-white/5 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-green-300">
                      Repositórios GitHub
                    </p>
                    <a
                      href="https://github.com/dunseen/museum-app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                    >
                      <Image
                        src="/icons/github.svg"
                        alt="GitHub Logo"
                        width={14}
                        height={14}
                        className="opacity-80 brightness-0 invert group-hover:opacity-100"
                      />
                      <span className="text-xs">Frontend (Next.js)</span>
                    </a>
                    <a
                      href="https://github.com/dunseen/museum-api/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-green-100 transition-colors hover:text-white"
                    >
                      <Image
                        src="/icons/github.svg"
                        alt="GitHub Logo"
                        width={14}
                        height={14}
                        className="opacity-80 brightness-0 invert group-hover:opacity-100"
                      />
                      <span className="text-xs">Backend (NestJS)</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 py-4">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-green-200 md:flex-row">
              <p>
                &copy; {new Date().getFullYear()} Herbário Virtual FC - UFRA.
                Todos os direitos reservados.
              </p>
              <p className="flex items-center gap-1">
                Desenvolvido com <Leaf className="h-3 w-3 text-green-400" />{" "}
                para a Amazônia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
