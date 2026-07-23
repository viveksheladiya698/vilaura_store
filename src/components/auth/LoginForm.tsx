"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { validateLoginForm, type LoginFormValues, type LoginFormErrors } from "@/lib/validation/auth";

export function LoginForm() {
  const router = useRouter();

  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof LoginFormValues>(key: K, value: LoginFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message ?? "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh(); // re-run server components (Header) so it picks up the new session
    } catch {
      setServerError("Unable to connect. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        value={values.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        value={values.password}
        onChange={(e) => updateField("password", e.target.value)}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={values.rememberMe}
            onChange={(e) => updateField("rememberMe", e.target.checked)}
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-sm text-accent-dark font-medium hover:underline">
          Forgot password?
        </Link>
      </div>

      {serverError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </Button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-accent-dark font-medium hover:underline">
          Register
        </Link>
      </p>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-border" />
        or continue with
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream transition-colors"
        >
          <GoogleIcon className="h-4 w-4" />
          Continue with Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream transition-colors"
        >
          <AppleIcon className="h-4 w-4" />
          Continue with Apple
        </button>
      </div>
    </form>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.4-.2-2.1H12v4h5.9c-.1 1-.8 2.6-2.4 3.6l3.6 2.8c2.1-2 3.4-4.9 3.4-8.3z" />
      <path fill="#34A853" d="M12 23c3.2 0 5.9-1.1 7.9-2.9l-3.6-2.8c-1 .7-2.4 1.2-4.3 1.2-3.3 0-6.1-2.2-7.1-5.2l-3.7 2.9C3.2 20.5 7.2 23 12 23z" />
      <path fill="#FBBC05" d="M4.9 13.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.2 6c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.7-2.7z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.1.8 3.8 1.4l2.8-2.7C16.9 1.7 14.2.5 12 .5 7.2.5 3.2 3 1.2 6.5l3.7 2.9c1-3 3.8-4.6 7.1-4.6z" />
    </svg>
  );
}

function AppleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.7 12.7c0-2.6 2.1-3.9 2.2-4-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.3 2.6 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.4 0 2.3-1.3 3.2-2.5.9-1.4 1.3-2.8 1.3-2.8-.1 0-2.5-1-2.5-3.9zM14.2 4.9c.7-.9 1.2-2.1 1.1-3.4-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.5-.6 3.2-1.4z" />
    </svg>
  );
}