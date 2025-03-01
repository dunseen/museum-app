import { auth } from "~/server/auth";
import System from "./components/system";
import { defineAbilityFor } from "~/lib/casl";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  const ability = defineAbilityFor(session?.user);

  if (ability.cannot("manage", "System")) {
    redirect("/dashboard");
  }

  return <System />;
}
