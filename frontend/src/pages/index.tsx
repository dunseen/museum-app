import Head from "next/head";
import { SignIn } from "~/modules";

export default function Home() {
  return (
    <>
      <Head>
        <title>Herbário App</title>
        <meta name="description" content="herbário virtual" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-[100vh] items-center justify-center">
        <SignIn.Page />
      </main>
    </>
  );
}
