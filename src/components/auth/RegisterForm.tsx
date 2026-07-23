"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { validateRegisterForm, type RegisterFormValues, type RegisterFormErrors } from "@/lib/validation/auth";

export function RegisterForm() {
  const router = useRouter();

  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // clear that field's error the moment the user starts fixing it
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validateRegisterForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // block submit — user must fill every field correctly first
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setServerError(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/login");
    } catch {
      setServerError("Unable to connect. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input
        id="name"
        label="Full Name"
        placeholder="Enter your full name"
        icon={<User size={16} />}
        value={values.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
      />

      <Input
        id="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email address"
        icon={<Mail size={16} />}
        value={values.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Create a password"
        value={values.password}
        onChange={(e) => updateField("password", e.target.value)}
        error={errors.password}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={values.confirmPassword}
        onChange={(e) => updateField("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
      />

      <div>
        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={values.agreeToTerms}
            onChange={(e) => updateField("agreeToTerms", e.target.checked)}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-accent-dark font-medium hover:underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="text-accent-dark font-medium hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && <span className="text-xs text-red-500 mt-1 block">{errors.agreeToTerms}</span>}
      </div>

      {serverError && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-600">
          {serverError}
        </div>
      )}

      <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-border" />
        or
        <div className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-ink hover:bg-cream transition-colors"
      >
        <GoogleIcon className="h-4 w-4" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-dark font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M22.5 12.2c0-.8-.1-1.4-.2-2.1H12v4h5.9c-.1 1-.8 2.6-2.4 3.6l3.6 2.8c2.1-2 3.4-4.9 3.4-8.3z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.2 0 5.9-1.1 7.9-2.9l-3.6-2.8c-1 .7-2.4 1.2-4.3 1.2-3.3 0-6.1-2.2-7.1-5.2l-3.7 2.9C3.2 20.5 7.2 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M4.9 13.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.2 6c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.7-2.7z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.1.8 3.8 1.4l2.8-2.7C16.9 1.7 14.2.5 12 .5 7.2.5 3.2 3 1.2 6.5l3.7 2.9c1-3 3.8-4.6 7.1-4.6z"
      />
    </svg>
  );
}