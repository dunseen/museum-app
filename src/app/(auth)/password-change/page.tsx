import type React from "react";
import { Suspense } from "react";
import { PasswordChangeForm } from "./components/password-change-form";

export default function Page() {
  return (
    <Suspense>
      <PasswordChangeForm />
    </Suspense>
  );
}
