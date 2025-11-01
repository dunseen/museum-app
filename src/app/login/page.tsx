import { Suspense } from "react";
import { LoginForm } from "./components/login-form";

export default function Page() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
