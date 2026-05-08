"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth-store";

export default function SignupPage() {
  const router = useRouter();
  const hydrated = useAuthStore((state) => state.hydrated);
  const token = useAuthStore((state) => state.token);
  const signupMutation = useSignupMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hostelName: "",
    wing: "",
  });

  useEffect(() => {
    if (hydrated && token) {
      router.replace("/dashboard");
    }
  }, [hydrated, router, token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signupMutation.mutateAsync(form);
    router.push("/dashboard");
  }

  return (
    <AuthShell
      title="Create your IIT Delhi account"
      description="Join the utility network for campus errands, borrowables, and hostel-to-hostel help."
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Full name"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
        />
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
          placeholder="Create a password"
          value={form.password}
          onChange={(event) =>
            setForm((current) => ({ ...current, password: event.target.value }))
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Hostel name"
            value={form.hostelName}
            onChange={(event) =>
              setForm((current) => ({ ...current, hostelName: event.target.value }))
            }
          />
          <Input
            placeholder="Wing"
            value={form.wing}
            onChange={(event) =>
              setForm((current) => ({ ...current, wing: event.target.value }))
            }
          />
        </div>
        {signupMutation.error ? (
          <p className="text-sm text-rose-300">{signupMutation.error.message}</p>
        ) : null}
        <Button type="submit" className="w-full" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? "Creating account..." : "Create account"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already onboarded?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
