"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const token = useAuthStore((state) => state.token);
  const loginMutation = useLoginMutation();
  const [form, setForm] = useState({
    email: "aarav@iitd.ac.in",
    password: "password123",
  });

  useEffect(() => {
    if (hydrated && token) {
      const redirectTarget =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;

      router.replace(redirectTarget ?? "/dashboard");
    }
  }, [hydrated, router, token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginMutation.mutateAsync(form);

    const redirectTarget =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("redirect")
        : null;

    router.push(redirectTarget ?? "/dashboard");
  }

  return (
    <AuthShell
      title="Sign in to HandToHand"
      description="Use your IIT Delhi email to access campus delivery, trip matching, and borrowables."
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-200">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4" />
            IIT Delhi email verification ready
          </div>
          <p className="mt-2 text-emerald-100/80">
            Demo seed login is prefilled so you can jump straight into the product flow.
          </p>
        </div>
        <Input
          type="email"
          placeholder="you@iitd.ac.in"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
        />
        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) =>
            setForm((current) => ({ ...current, password: event.target.value }))
          }
        />
        {loginMutation.error ? (
          <p className="text-sm text-rose-300">{loginMutation.error.message}</p>
        ) : null}
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          New to the network?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
