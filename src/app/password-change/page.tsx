import Image from "next/image";
import type React from "react";
import Footer from "../museu/herbario/components/footer";
import { Suspense } from "react";
import { PasswordChangeForm } from "./components/password-change-form";

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col justify-between">
      <header className="bg-[#006633] p-4 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </header>

      <Suspense>
        <PasswordChangeForm />
      </Suspense>

      <Footer />
    </main>
  );
}
